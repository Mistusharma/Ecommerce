import { NextResponse, type NextRequest } from "next/server";
import { login } from './login-query';
import type { loginReq } from "./login-modal";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { email, password } = await req.json();
        const data = await login(email, password);
        console.log("data: ", data);
        if (data.error) {
            return NextResponse.json({
                status: 400,
                error: data.error
            }, { status: 400 });
        }
        else{
            return NextResponse.json({
                message: 'User successfully loggedIn',data}, { status: 200 });
        }
    

    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({
            status: 500,
            message: 'Internal server error'
        }, { status: 500 });
    }
}
