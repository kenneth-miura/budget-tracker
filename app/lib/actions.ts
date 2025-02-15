'use server'

import {connectToDatabase} from "@/app/lib/db";
import ExpenseCategory from "@/app/models/ExpenseCategory";
import {Readable} from "node:stream";
import {parse} from "csv-parse";
import ExpenseMappingsSingleton from "@/app/models/ExpenseMappingsSingleton";
import {CategorizedExpenses, categorizeExpensesByCategory} from "@/app/lib/categorizeExpensesByCategory";
import {parseCSVCreditTransactions} from "@/app/lib/parseCSVCreditTransactions";


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


interface ExpenseState extends State {
    expenses: CategorizedExpenses | null;
}



export async function categorizeExpenses(prevState: ExpenseState, formData: FormData): Promise<ExpenseState>{
    const file = formData.get('expensesFile');
    if(file instanceof File){
        const expenses = await parseCSVCreditTransactions(file);
        console.log(JSON.stringify(expenses));
        // const [expenses, categoryMappings] = await Promise.all([parseCSV(file), getCategoryMappings()]);
        // TODO: set up helper function that takes the CSV data + the category mapping

        // const expensesByCategory = categorizeExpensesByCategory(expenses, categoryMappings);

        return {
           expenses: null
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

    let expenseMappings = await ExpenseMappingsSingleton.findOne({});

    if(expenseMappings === null){
        expenseMappings = new ExpenseMappingsSingleton();
        await expenseMappings.save();
    }

    const categoryMapping: Map<string, string> = new Map();
    expenseMappings.mappings.forEach(mapping => {
        categoryMapping.set(mapping.expenseTitle, mapping.categoryTitle);
    })
    return categoryMapping;
}


