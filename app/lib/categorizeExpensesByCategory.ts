import {isCardPayment, RBCCreditTransaction} from "@/app/lib/parseCSVCreditTransactions";

export interface CategorizedExpenses {
    expensesByCategory: Map<string, string>;
    uncategorizedExpenseNames: string[];
}

export function categorizeExpensesByCategory(expenses: RBCCreditTransaction[], categoryMapping: Map<string, string>): CategorizedExpenses{

    const expensesByCategory: Map<string, number> = new Map();
    const uncategorizedExpenseNames: string[] = []
    expenses.forEach(expense => {

        if(isCardPayment(expense)){
            return;
        }

        if (categoryMapping.has(expense.targetDescription)){
            const category = categoryMapping.get(expense.targetDescription);
            if(category == undefined){
                return;
            }
            const currentCategoryExpense = expensesByCategory.get(category) ?? 0;
            const additionalExpense = -expense.costInCad;
            expensesByCategory.set(category, currentCategoryExpense + additionalExpense);
        }
        else {
            uncategorizedExpenseNames.push(expense.targetDescription);
        }
    })

    return {
        expensesByCategory: new Map(Array.from(expensesByCategory, ([key, value]) => [key, value.toFixed(2)])),
        uncategorizedExpenseNames
    }
}
