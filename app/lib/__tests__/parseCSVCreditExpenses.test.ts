import {beforeAll, test} from "@jest/globals";
import fs from 'node:fs';
import {parseCSVCreditExpenses} from "@/app/lib/parseCSVCreditExpenses";

let file: File;

beforeAll(async () => {
    const fileName = "expenses.csv"
    const fileBuffer = await fs.promises.readFile('./data/' + fileName, {encoding: 'utf8'});
    // Create a Blob first
    const blob = new Blob([fileBuffer], { type: 'application/octet-stream' });

    // Convert Blob to File
    file = new File([blob], fileName, { type: 'application/octet-stream' });
})

test('Parse sample expenses', async () => {
    const res = await parseCSVCreditExpenses(file);
    console.log(JSON.stringify(res));
})