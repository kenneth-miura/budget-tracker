import {model, Schema, Types} from "mongoose";

interface ExpenseMappings {
    "mappings": ExpenseMapping[];
}

interface ExpenseMapping {

    /** Denormalized title from the category ID*/
    "title": string;
    "category_id": Types.ObjectId;


}

const ExpenseMappingSchema = new Schema<ExpenseMapping>({
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
})

const ExpenseMappingsSchema = new Schema<ExpenseMappings>({
    mappings: {
        type: [ExpenseMappingSchema]
    }
});

const ExpenseMappings = model<ExpenseMappings>('ExpenseMappings', ExpenseMappingsSchema);

export default ExpenseMappings;
