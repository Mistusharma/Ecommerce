import { NextResponse } from "next/server";
import { getProduct } from "../home-query";
import { TABLES } from "@/common/constants/table";
import db from '../../../../lib/db'
export async function GET() {
    try {
        const query = `SELECT * FROM ${TABLES.PRODUCTSUGGESTIONS}`;
        const result = await db.query(query);
        console.log("result: ", result.rows);
        return NextResponse.json({ status: 200, DATA:result.rows });
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}