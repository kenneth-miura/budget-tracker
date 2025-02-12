'use server'

import {connectToDatabase} from "@/app/lib/db";
import ExpenseCategory from "@/app/models/ExpenseCategory";
import * as fs from "node:fs";
import {Readable} from "node:stream";
import {parse} from "csv-parse";


export interface State {
    error?: {
        message: string;
    }
}

export async function createExpenseCategory(prevState: State, formData: FormData): Promise<State>{
    await connectToDatabase();
    const title = formData.get('title');
    if ( title && typeof title === "string"){
        const result = new ExpenseCategory({title});
        try {
            await result.save()
            return {};
        }
        catch (e){
            return {
                error:{
                    message: 'Database Error: Failed to create ExpenseCategory - full error:' + e
                }
            }
        }
    }
    else {
        return {
            error: {
                message: 'Invalid title field'

            }
        }
    }
}

interface CategorizedExpenses {
    expensesByCategory: Record<string, string>;
    uncategorizedExpenseNames: string[];
}

interface ExpenseState extends State {
    expenses: CategorizedExpenses | null;
}



export async function categorizeExpenses(prevState: ExpenseState, formData: FormData): Promise<ExpenseState>{
    const file = formData.get('expensesFile');
    if(file instanceof File){
        const [csv, categoryMappings] = await Promise.all([parseCSV(file), getCategoryMappings()]);
        // TODO: set up helper function that takes the CSV data + the category mapping
        const expenses = categorizeExpensesByCategory(csv, categoryMappings);

        return {
            expenses
        }


    }
    return {
        expenses: null,
        error: {
            message: "Invalid file uploaded"
        }
    };
}

async function getCategoryMappings(): Promise<Map<string, string>>{

    return new Promise((resolve, reject) => {
        // TODO: fill this in - also can I type it?
        const categoryMapping: Map<string, string> = new Map();
        resolve(categoryMapping);
    });
}

function categorizeExpensesByCategory(expenses: Record<string, string>[], categoryMapping: Map<string, string>): CategorizedExpenses{
    // add each expense into a category
    // only consider chequeing and credit card expenses
    // also get all the deposits together and output as a category
    // also return the items that don't fit into any specific category

}

async function parseCSV(file: File): Promise<Record<string, string>[]>{
    const buffer = await file.arrayBuffer();
    const stream = Readable.from(Buffer.from(buffer));

    return new Promise((resolve, reject) => {
        const parser= parse({columns: true, trim: true});
        const records: Record<string, string>[] = [];
        parser.on("readable", () => {
            let record;
            while ((record = parser.read()) !== null) {
                records.push(record);
            }
        });
        parser.on("end", () => resolve(records));
        parser.on("error", reject);

        stream.pipe(parser);
    })
}
