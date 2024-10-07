import { TABLES } from "@/common/constants/table";
import { NextResponse } from "next/server";
import db from '../../../../lib/db'



// http://localhost:3000/api/home/1?id=1
export async function GET(req: Request) {
    try {
        // Extract query parameters from the request URL
        const url = new URL(req.url);
        const params = Object.fromEntries(url.searchParams.entries());

        // Ensure 'id' exists in params
        const productId = params.id;
        if (!productId) {
            return NextResponse.json({ status: 400, message: "Product ID is required." });
        }

        const query = `SELECT * FROM ${TABLES.PRODUCTS} WHERE id = $1`;
        const result = await db.query(query, [productId]);

        if (result.rowCount === 0) {
            return NextResponse.json({ status: 404, message: "Product not found." });
        }

        return NextResponse.json({ status: 200, product: result.rows[0] });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}