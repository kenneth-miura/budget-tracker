import {RBCCreditTransaction} from "@/app/lib/parseCSVCreditTransactions";

export const GROCERY_CATEGORY = "Groceries";
export const GROCERIES_A = "HMART - TORONTO ON";
export const GROCERIES_B = "SHOPPERS DRUG MART 123 TORONTO ON";
export const TRANSPORT_CATEGORY = "Transport";
export const TRANSPORT_A = "BIKE SHARE TORONTO PAR TORONTO ON";

export const PAYMENT_ONLY_TRANSACTIONS :RBCCreditTransaction[]= [
    {
        "accountType": "MasterCard",
        "costInCad": 170.21,
        "targetDescription": "CASH BACK REWARD",
        "transactionDate": new Date()
    },
    {
        "accountType":
            "MasterCard",
        "costInCad":
            10.03,
        "targetDescription":
            "PAYMENT - THANK YOU / PAIEMENT - MERCI",
        "transactionDate": new Date()
    }
]

export const DUMMY_TRANSACTIONS: RBCCreditTransaction[] = [
        {
            "accountType": "MasterCard",
            "costInCad": 170.21,
            "targetDescription": "CASH BACK REWARD",
            "transactionDate": new Date()
        },
        {
            "accountType":
                "MasterCard",
            "costInCad":
                10.03,
            "targetDescription":
                "PAYMENT - THANK YOU / PAIEMENT - MERCI",
            "transactionDate": new Date()
        }
        ,
        {
            "accountType":
                "MasterCard",
            "costInCad":
                -10.99,
            "targetDescription":
            GROCERIES_A,
            "transactionDate": new Date()
        }
        ,
        {
            "accountType":
                "MasterCard",
            "costInCad":
                -5.00,
            "targetDescription":
            GROCERIES_B,
            "transactionDate": new Date()
        }
        ,
        {
            "accountType":
                "MasterCard",
            "costInCad":
                -20.00,
            "targetDescription":
            TRANSPORT_A,
            "transactionDate": new Date()
        }
    ]
;
