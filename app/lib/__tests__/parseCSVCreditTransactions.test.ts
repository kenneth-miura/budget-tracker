import {beforeAll, expect, test} from "@jest/globals";
import fs from 'node:fs';
import {parseCSVCreditTransactions} from "@/app/lib/parseCSVCreditTransactions";
import path from "node:path";

let file: File;

beforeAll(async () => {
    const fileName = "expenses.csv"
    const csvFilePath = path.join(__dirname, "/test_data/" + fileName);

    const fileBuffer = await fs.promises.readFile(csvFilePath, {encoding: 'utf8'});
    // Create a Blob first
    const blob = new Blob([fileBuffer], { type: 'application/octet-stream' });

    // Convert Blob to File
    file = new File([blob], fileName, { type: 'application/octet-stream' });
})

test('Parse sample transactions', async () => {
    const res = await parseCSVCreditTransactions(file);
    expect(res).toMatchInlineSnapshot(`
[
  {
    "accountType": "MasterCard",
    "costInCad": 170.21,
    "targetDescription": "CASH BACK REWARD",
    "transactionDate": 2025-11-02T04:00:00.000Z,
  },
  {
    "accountType": "MasterCard",
    "costInCad": 10.03,
    "targetDescription": "PAYMENT - THANK YOU / PAIEMENT - MERCI",
    "transactionDate": 2025-01-04T05:00:00.000Z,
  },
  {
    "accountType": "MasterCard",
    "costInCad": -10.99,
    "targetDescription": "HMART - SAMPLE LOCATION",
    "transactionDate": 2025-01-06T05:00:00.000Z,
  },
]
`);
})