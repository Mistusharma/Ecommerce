import { NextResponse, type NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ['/home', '/dashboard'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value; // Get the token from cookies
    const { pathname } = request.nextUrl; // Get the current request pathname
    console.log(`Request Path: ${pathname}, Token: ${token}`);

    if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
        console.log("Redirecting to /login");
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect to home if accessing the login page with a valid token
    if (token && pathname === '/login') {
        console.log("Redirecting to /home");
        return NextResponse.redirect(new URL('/home', request.url));
    }

    return NextResponse.next(); // Proceed to the requested path if no conditions are met
}

// Configuration to match the appropriate routes
export const config = {
    matcher: ['/login', '/home', '/dashboard'],
};
