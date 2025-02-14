import mongoose, {model, Schema, Types} from "mongoose";

interface ExpenseMappingsSingleton {
    "mappings": ExpenseMapping[];
}

export interface ExpenseMapping {

    "expenseTitle": string;
    /** Denormalized title from the category ID*/
    "categoryTitle": string;
    "category_id": Types.ObjectId;


}

const ExpenseMappingSchema = new Schema<ExpenseMapping>({
    expenseTitle: {
        type: String,
        required: true,
        unique: true
    },
    categoryTitle: {
        type: String,
        required: true,
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'ExpenseCategory',
        required: true
    }
})

// Using https://www.mongodb.com/blog/post/building-with-patterns-the-attribute-pattern
const ExpenseMappingsSingletonSchema = new Schema<ExpenseMappingsSingleton>({
    mappings: {
        type: [ExpenseMappingSchema]
    }
});

// Ensure only one document exists by checking for a pre-save condition.
ExpenseMappingsSingletonSchema.pre("save", async function(next) {
    const count = await mongoose.models.ExpenseMappingsSingleton.countDocuments();
    if (count > 0) {
        const error = new Error("Only one ExpenseMappingsSingleton document is allowed.");
        return next(error);
    }
    next();
});

const ExpenseMappings = model<ExpenseMappingsSingleton>('ExpenseMappingsSingleton', ExpenseMappingsSingletonSchema);

export default ExpenseMappings;
