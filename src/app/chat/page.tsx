"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/interfaces";

const ChatPage = () => {
  const [productLink, setProductLink] = useState("");
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ question: string; answer: string }[]>([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);


  const fetchProductInfo = async (link: string) => {
    setLoadingProduct(true);
    const response = await fetch("/api/fetchProductInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productURL: link }),
    });
    setLoadingProduct(false);

    if (response.ok) {
      const { productInfo, productId } = await response.json();
      setProductInfo(productInfo);
      setProductId(productId);
    } else {
      console.error("Failed to fetch product info");
    }
  };

  const fetchAnswer = async (question: string) => {
    setLoadingAnswer(true);
   const response = await fetch("/api/sendQuery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, question }),
    });
    setLoadingAnswer(false);

    if (!response.ok) {
      console.error("Failed to fetch answer");
      return "Failed to fetch answer";
    }

    const { answer } = await response.json();
    return answer;
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productLink) fetchProductInfo(productLink);
  };

const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setChat((prev) => [{ question, answer: "" }, ...prev]);
    const answer = await fetchAnswer(question);
    setChat((prev) =>
        prev.map((item, idx) =>
            idx === 0 ? { ...item, answer } : item
        )
    );
    setQuestion("");
};

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Product Link Input */}
      <form onSubmit={handleProductSubmit} className="mb-6 space-y-2">
        <label className="font-semibold">Enter Product Link:</label>
        <div className="flex gap-2 mt-1">
          <Input
            type="text"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            placeholder="Paste product link here"
            className="flex-1"
          />
          <Button type="submit" disabled={loadingProduct}>
            {loadingProduct ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>

      {/* Product Info Display */}
      {productInfo && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{productInfo.productName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-1 font-semibold">
              Price:{" "}
              <span className="font-normal">{productInfo.price}</span>
            </p>
            <a
              href={productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Product
            </a>
          </CardContent>
        </Card>
      )}

      {/* QnA Section */}
      <div>
        <form onSubmit={handleQuestionSubmit} className="flex gap-2">
          <Input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the product"
            className="flex-1"
            disabled={!productInfo}
          />
          <Button type="submit" disabled={loadingAnswer || !productInfo}>
            {loadingAnswer ? "Sending..." : "Send"}
          </Button>
        </form>

        {/* Chat Display */}
        <div className="mt-6 space-y-4">
          {chat.map((item, idx) => (
            <div key={idx} className="flex flex-col justify-between gap-4">
              {/* User Question (Left) */}
              <div className="bg-blue-400 px-4 py-3 rounded-lg max-w-[45%] self-start">
                <span className="font-semibold text-blue-700">You:</span>
                <div>{item.question}</div>
              </div>
              {/* Backend Answer (Right) */}
              <div className="bg-green-600 px-4 py-3 rounded-lg max-w-[45%] self-end text-right">
                <span className="font-semibold text-green-700">Bot:</span>
                <div className="whitespace-pre-wrap text-left">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;