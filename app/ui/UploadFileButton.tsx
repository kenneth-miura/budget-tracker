'use client'

import {useActionState} from "react";
import {categorizeExpenses} from "@/app/lib/actions";

export default function UploadFileButton(){
    const [state, formAction] = useActionState(categorizeExpenses, {});
    return (
        <form action={formAction}>
            <label htmlFor="expensesFile">Upload a file</label>
            <input className='border-b-black' type="file" name="expensesFile" id="expensesFile" required/>
            <button type="submit">Submit</button>
        </form>
    )

}