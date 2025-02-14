import {Readable} from "node:stream";
import {parse} from "csv-parse";

const a = {
    "Account Type": "Chequing",
    "Transaction Date": "10/21/2024",
    "Cheque Number": "",
    "Description 1": "Transfer",
    "Description 2": "WWW TRANSFER - 9800",
    "CAD$": "1000.00",
    "USD$": ""
}

// for credit cards, Description1 is the target
// for Accounts, Description 1 -> Expense Type, Description 2 is usually target
// Do I need to handle savings? I feel like that's a nice to have. For now, let's only handle a credit card expense

type RBCExpense = RBCCreditExpense;

interface RBCCreditExpense {
    accountType: "MasterCard" ;
    transactionDate: Date;
    targetDescription: string;
    costInCad: number;
}

function parseRawExpenseAsCredit(rawRecord: Record<string, string>): RBCCreditExpense{
    return {
        accountType: "MasterCard",
        costInCad: parseFloat(rawRecord["CAD$"]),
        targetDescription: rawRecord["Description 1"],
        transactionDate: new Date( rawRecord["Transaction Date"])
    }

}

export async function parseCSVCreditExpenses(file: File): Promise<RBCCreditExpense[]> {
    const buffer = await file.arrayBuffer();
    const stream = Readable.from(Buffer.from(buffer));

    return new Promise((resolve, reject) => {
        const parser = parse({columns: true, trim: true});
        const creditExpenses: RBCCreditExpense[] = [];
        parser.on("readable", () => {
            let record;
            while ((record = parser.read()) !== null) {
                if(record['Account Type'] === 'MasterCard'){
                    creditExpenses.push(parseRawExpenseAsCredit(record))
                }
            }
        });
        parser.on("end", () => resolve(creditExpenses));
        parser.on("error", reject);

        stream.pipe(parser);
    })
}
