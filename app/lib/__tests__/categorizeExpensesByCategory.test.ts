import {beforeAll, expect, test} from "@jest/globals";
import {GROCERIES_A, GROCERY_CATEGORY, TRANSPORT_A, TRANSPORT_CATEGORY} from "@/app/lib/__tests__/testConsts";



const categoryMapping: Map<string, string> = new Map(Object.entries({
    GROCERIES_A: GROCERY_CATEGORY,
    GROCERIES_B: GROCERY_CATEGORY,
    TRANSPORT_A: TRANSPORT_CATEGORY
}));


test('categorizes categories', () => {
    // This should look like
    const expenses: Record<string, string>[] = [
        {}
    ];

})