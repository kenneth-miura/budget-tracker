
export interface CategorizedExpenses {
    expensesByCategory: Record<string, string>;
    uncategorizedExpenseNames: string[];
}

export function categorizeExpensesByCategory(expenses: Record<string, string>[], categoryMapping: Map<string, string>): CategorizedExpenses{
    // TODO: test this in jest using hardcoded expense and cateogry mapping before starting dev so my feedback loop is tighter
    // add each expense into a category
    // only consider chequeing and credit card expenses
    // also get all the deposits together and output as a category
    // also return the items that don't fit into any specific category

    return {
        expensesByCategory: {},
        uncategorizedExpenseNames: []
    }
}
