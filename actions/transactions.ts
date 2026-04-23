"use server"

import prisma from "../lib/prisma"

export async function createTransaction(
    value: number,
    type: "income" | "expense",
    category: string,
    date: string,
    name: string,
    note?: string
) {
    await prisma.transaction.create({
        data: {
            value,
            type,
            category,
            date: new Date(date),
            name,
            note
        }
    })
}
