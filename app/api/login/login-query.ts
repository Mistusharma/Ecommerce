import db from '../../../lib/db';
import type { loginReq } from "./login-modal";
import { generateAuthToken } from './login-controller'
// Function to handle user login
export const login = async (
    email: string,
    password: string
): Promise<loginReq> => {
    try {
        // Check if email and password match an existing user
        const checkEmailQuery = `
            SELECT * FROM signup WHERE email = $1 AND password = $2;`;
        const { rows } = await db.query(checkEmailQuery, [email, password]);

        // If no user is found, throw an error
        if (rows.length === 0) {
            return { error: "Invalid email or password" };
        }

        // Generate JWT token if login is successful
        const authToken = await generateAuthToken(email);
        return authToken;
    } catch (error: unknown) {
        console.error("Error in login:", error);
        throw new Error(`Failed to login: ${error instanceof Error ? error.message : String(error)}`);
    }
};