import { getCache } from "@/lib/cache";

export async function POST(request: Request) {
  const { productId, question } = await request.json();
  if (!productId || !question) {
    return Response.json(
      {
        error: "Product ID and question are required.",
      },
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const productInfo = await getCache(productId);
  if (!productInfo) {
    console.error("Product not found in cache for ID:", productId);
    return Response.json(
      {
        error: "Product not found in cache. Please submit the product link again.",
      },
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  try {
    const LLMURL = process.env.LLM_URL!;
    const response = await fetch(LLMURL + "/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: productInfo, question }),
    });
    // console.log("LLM response:", response);
    if (!response.ok) {
        console.log("Failed to fetch data from LLM", response);
        return Response.json({error: "Failed to fetch data from LLM."}, { status: 500, headers: { "Content-Type": "application/json" } });
    }
    const answer = await response.json();
    console.log("LLM answer:", answer);
    return Response.json({
        answer: answer.response
    }, { status: 200 });
  } catch (error) {
    console.error("Error sending query:", error);
    return Response.json(
      {
        error: "Failed to send query.",
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
