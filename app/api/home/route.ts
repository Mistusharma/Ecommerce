import { NextResponse } from "next/server";
import { postProduct, getProduct } from './home-query';

export async function POST(req: Request) {
    try {
        const { title, price, images } = await req.json();
        const productSave = await postProduct(title, price, images);
        return NextResponse.json({ status: 200, productSave });
    } catch (error) {
        console.error("Error saving product:", error);
        return NextResponse.json({ status: 500, message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const fetchProduct = await getProduct();
        return NextResponse.json({ status: 200, products: fetchProduct });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ status: 500, message: 'Internal server error' }, { status: 500 });
    }
}