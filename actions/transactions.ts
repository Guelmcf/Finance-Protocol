"use server"

import { prisma } from "../lib/prisma"
import { createClient } from "../utils/supabase/server"
import { TransactionCategorie } from "@/app/generated/prisma/enums"

export async function createTransaction(
    value: number,
    type: "income" | "expense",
    category: TransactionCategorie,
    date: string,
    name: string,
    note?: string
) {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("User not authenticated")
    }

    await prisma.transaction.create({
        data: {
            userId: user.id,
            value,
            type,
            categorie: category,
            date: new Date(date),
            name,
            note
        }
    })
}
