import {model, Schema} from "mongoose";

interface ExpenseCategory {
    "name": string;
}

const expenseCategorySchema = new Schema<ExpenseCategory>({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const ExpenseCategory = model<ExpenseCategory>('ExpenseCategory', expenseCategorySchema);

export default ExpenseCategory;
