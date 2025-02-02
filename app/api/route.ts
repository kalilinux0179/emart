import connectDB from "@/lib/db"

export async function GET(request: Request) {
    connectDB();
    return new Response("Hello, Next.js!")
}