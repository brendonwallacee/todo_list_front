import caller from "@/lib/api-caller";

export async function POST() {
    try {
        const data = await caller("/auth/token");
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