import {model, Schema, Types} from "mongoose";

interface ExpenseSource {
    "title": string;
    "category_id": Types.ObjectId;
}

const ExpenseSourceSchema = new Schema<ExpenseSource>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'ExpenseCategory',
        required: true
    }
});

const ExpenseSource = model<ExpenseSource>('ExpenseSource', ExpenseSourceSchema);

export default ExpenseSource;
