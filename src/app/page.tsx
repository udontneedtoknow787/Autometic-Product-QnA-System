import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24 md:w-3/5 md:mx-auto max-w-[800px]">
      <div className="flex flex-col items-center mb-8 min-h-[70lvh] md:min-h-[60lvh]">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">Automatic Product Q&A System</h1>
        <p className="text-lg opacity-80 mb-4 text-center">
          Your one-stop solution for all product-related queries.
        </p>
        <p className="text-center mt-4">
          Get instant <span className="font-bold">ANSWERS</span> to your product related questions along with <span className="font-bold">REASONING OR SOURCE</span>,
          powered by a fine-tuned model trained on over 20,000 product question-answer pairs.
        </p>
        <Button className="mt-4">Get Started</Button>
      </div>
      {/* <div className="flex justify-center mb-8">
        <Image
          src="/product-image.png"
          alt="Product Image"
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
        /> */}
      <div id="about" className="flex flex-col items-start">
        <h1 className="text-3xl font-bold">About</h1>
        <ul className="list-disc list-outside mt-4 pl-2 min-w-[200px]">
          <li>Fine-tuned model for accurate responses along with source (like description, previous-answered questions etc.)</li>
          <li>Trained over 20,000 product question-answer pairs</li>
          <li>Supports multiple languages (including but not limited to Hindi and English)</li>
        </ul>
      </div>
    </div>
  );
}
