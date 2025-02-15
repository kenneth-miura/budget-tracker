import {beforeAll, describe, expect, test} from "@jest/globals";
import {
    DUMMY_TRANSACTIONS,
    GROCERIES_A,
    GROCERIES_B,
    GROCERY_CATEGORY, PAYMENT_ONLY_TRANSACTIONS,
    TRANSPORT_A,
    TRANSPORT_CATEGORY
} from "@/app/lib/test_lib/testConsts";
import {CategorizedExpenses, categorizeExpensesByCategory} from "@/app/lib/categorizeExpensesByCategory";


const categoryMapping: Map<string, string> = new Map();

beforeAll(() => {
    categoryMapping.set(GROCERIES_A, GROCERY_CATEGORY);
    categoryMapping.set(GROCERIES_B, GROCERY_CATEGORY);
    categoryMapping.set(TRANSPORT_A, TRANSPORT_CATEGORY);
})

describe("Categorizing Expenses" , () => {
    test('has existing categories for expenses', () => {
        const expectedCategorizedExpenses: CategorizedExpenses = {
            expensesByCategory: new Map(Object.entries({
                [GROCERY_CATEGORY]: "15.99",
                [TRANSPORT_CATEGORY]: "20.00"
            })),
            uncategorizedExpenseNames: []
        }

        const categorizedExpenses = categorizeExpensesByCategory(DUMMY_TRANSACTIONS, categoryMapping);
        expect(categorizedExpenses).toEqual(expectedCategorizedExpenses);
    })

    test('identifies uncategorized expenses', () => {
        const expectedCategorizedExpenses: CategorizedExpenses = {
            expensesByCategory: new Map(),
            uncategorizedExpenseNames: [TRANSPORT_A, GROCERIES_A, GROCERIES_B]
        }

        const categorizedExpenses = categorizeExpensesByCategory(DUMMY_TRANSACTIONS, new Map());
        expect(categorizedExpenses.expensesByCategory).toEqual(expectedCategorizedExpenses.expensesByCategory);
        expect(categorizedExpenses.uncategorizedExpenseNames.sort()).toEqual(expectedCategorizedExpenses.uncategorizedExpenseNames.sort());
    })

    test('Ignores transactions that are card payments', () => {
        const expectedCategorizedExpenses: CategorizedExpenses = {
            expensesByCategory: new Map(),
            uncategorizedExpenseNames: []
        };
        const categorizedExpenses = categorizeExpensesByCategory(PAYMENT_ONLY_TRANSACTIONS, new Map());
        expect(categorizedExpenses).toEqual(expectedCategorizedExpenses);
    })

})


