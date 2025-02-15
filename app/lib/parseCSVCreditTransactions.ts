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


export interface RBCCreditTransaction {
    accountType: "MasterCard" ;
    transactionDate: Date;
    targetDescription: string;
    /** If the cost is negative, that means a purchase was made. If it's positive, that means the card was paid off*/
    costInCad: number;
}

function parseRawTransactionAsCredit(rawRecord: Record<string, string>): RBCCreditTransaction{
    return {
        accountType: "MasterCard",
        costInCad: parseFloat(rawRecord["CAD$"]),
        targetDescription: rawRecord["Description 1"],
        transactionDate: new Date( rawRecord["Transaction Date"])
    }
}

export function isCardPayment(transaction: RBCCreditTransaction){
    return transaction.costInCad > 0;
}

export async function parseCSVCreditTransactions(file: File): Promise<RBCCreditTransaction[]> {
    const buffer = await file.arrayBuffer();
    const stream = Readable.from(Buffer.from(buffer));

    return new Promise((resolve, reject) => {
        const parser = parse({columns: true, trim: true});
        const creditExpenses: RBCCreditTransaction[] = [];
        parser.on("readable", () => {
            let record;
            while ((record = parser.read()) !== null) {
                if(record['Account Type'] === 'MasterCard'){
                    creditExpenses.push(parseRawTransactionAsCredit(record))
                }
            }
        });
        parser.on("end", () => resolve(creditExpenses));
        parser.on("error", reject);

        stream.pipe(parser);
    })
}
