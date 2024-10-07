import { NextResponse, type NextRequest } from "next/server";
import { signUp } from './signup-query';
import type { signupReq } from "./signup-modal";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { name, email, password } = await req.json();
        const data: signupReq = await signUp(name, email, password);
      
        if ('error' in data) {
            return NextResponse.json({
                status: 409,
                error: data.error
            }, { status: 409 });
        } else {
            return NextResponse.json({
                status: 200,
                message: 'User successfully created'
            }, { status: 200 });
        }
    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({
            status: 500,
            message: 'Internal server error'
        }, { status: 500 });
    }
}
