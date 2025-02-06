import {model, Schema} from "mongoose";

interface ExpenseCategory {
    "title": string;
}

const expenseCategorySchema = new Schema<ExpenseCategory>({
    title: {
        type: String,
        required: true,
        unique: true
    }
});

const ExpenseCategory = model<ExpenseCategory>('ExpenseCategory', expenseCategorySchema);

export default ExpenseCategory;
