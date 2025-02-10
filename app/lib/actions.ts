'use server'

import {connectToDatabase} from "@/app/lib/db";
import ExpenseCategory from "@/app/models/ExpenseCategory";


export type State = {
    error?: {
        message: string;
    }
};

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