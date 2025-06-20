import { setCache } from "@/lib/cache";
import { Product } from "@/types/interfaces";
import crypto from "crypto"

export async function POST(request: Request) {
    const { productURL } = await request.json();

    if (!productURL) {
        return Response.json({
            error: "Product URL is required.",
        }, {
            status: 400,
            headers: { "Content-Type": "application/json" },
        })
    }
    try {
        const LLMURL = process.env.LLM_URL!;
        const response = await fetch(LLMURL + "/scrape-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: productURL }),
        });
        const { productInfo }: { productInfo: Product } = await response.json();
        const productId = crypto.createHash("sha1").update(productURL).digest("hex");
        setCache(productId, productInfo);
        return Response.json({
            productId,
            productInfo
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching product info:", error);
        return Response.json({
            error: "Failed to fetch product information.",
        }, {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}