import { TABLES } from "@/common/constants/table";
import db from '../../../lib/db';
export const postProduct = async (title, price, images) => {
    try {
        const query = `INSERT INTO ${TABLES.PRODUCTS} (title, price, images) VALUES ($1, $2, $3) RETURNING *`;
        const result = await db.query(query, [title, price, images]);
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting product:", error);
        throw error;
    }
}

export const getProduct = async () => {
    try {
        const query = `SELECT * FROM ${TABLES.PRODUCTS}`;
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}