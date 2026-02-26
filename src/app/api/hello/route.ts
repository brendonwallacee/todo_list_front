import caller from "@/lib/api-caller";

export async function GET() {
    try {
        const data = await caller("/");
        return await data.json();

    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            },
        });
    }
}