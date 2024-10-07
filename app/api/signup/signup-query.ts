import { TABLES } from "@/common/constants/table";
import type { signupReq } from "./signup-modal";
import db from '../../../lib/db'

export const signUp = async (
    name: string,
    email: string,
    password: string
): Promise<signupReq> => {
    try {
        // Check if email already exists
        const checkEmailQuery = `
            SELECT * FROM ${TABLES.SIGNUP} WHERE email = $1`;
        const emailCheck = await db.query(checkEmailQuery, [email]);

        if (emailCheck.rows.length === 0) {
            // Insert the user data into the table
            const insertUserQuery = `
                INSERT INTO ${TABLES.SIGNUP} (name, email, password) 
                VALUES ($1, $2, $3) 
                RETURNING *`;

            // Run the insert query and return the inserted user data
            const res = await db.query<signupReq>(insertUserQuery, [name, email, password]);
            console.log("res: ", res);  

            // Return the inserted row
            return res.rows[0];
        } else {
            return { error: "Email already exists" };
        }
    } catch (error: unknown) {
        console.error("Error in signUp:", error);
        throw new Error(`Failed to add user: ${error instanceof Error ? error.message : String(error)}`);
    }
};
