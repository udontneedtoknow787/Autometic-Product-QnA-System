import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-4">
      {/* Intro section */}
      <div className="flex flex-col items-center mb-6 min-h-[80lvh] bg-gray-300 dark:bg-gray-800 min-w-full rounded-lg p-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          Automatic Product Q&A System
        </h1>
        <p className="text-lg opacity-80 mb-12 text-center">
          Your one-stop solution for all product-related queries.
        </p>
        <p className="text-center text-lg mt-4 md:max-w-2/5">
          Get instant <span className="font-bold text-orange-500">answers</span> to your product-related questions, along with{" "}
          <span className="font-bold text-orange-500">reasoning or source</span>, powered by a
          fine-tuned LLM model trained on over 20,000 product-related question–answer pairs.
        </p>
        <Button className="m-4">
          <a href="/chat">Get Started</a>
        </Button>
        <Image src="/flipkart_qna_section.png" alt="FlipKart Q&A Section" width={800} height={500} className="p-2" />
        <p className="text-center text-sm md:max-w-2/5 text-red-500">
          (This is how the Flipkart Q&A section looks like.)
        </p>
        <p className="text-center text-sm md:max-w-2/5 text-red-500">
          Here, You need to wait for someone to answer your question.
        </p>
      </div>

      {/* Demo section */}
      <div className="flex flex-col items-center mb-6 min-h-[80lvh] bg-gray-400 dark:bg-gray-700 min-w-full rounded-lg p-6">
        <h2 className="text-3xl md:text-5xl font-bold">How To Use</h2>
        <ul className="text-lg flex flex-col gap-3 md:gap-4 md:max-w-3/5 list-decimal mt-4 pl-2 min-w-[200px]">
          <li>Enter product link in the input box.
            <Image src="/product_link_sub.png" alt="Enter product link" width={500} height={300} className="p-2" />
          </li>
          <li>Ask your question about the product.</li>
            <Image src="/question_sub.png" alt="Enter your question" width={500} height={300} className="p-2" />
          <li>Receive instant answers with sources.</li>
            <Image src="/llm_response.png" alt="Sample of LLM Response" width={500} height={300} className="p-2" />
        </ul>
      </div>

      {/* Sample responses */}
      <div id="sample" className="flex flex-col items-center mb-6 min-h-[80lvh] bg-gray-300 dark:bg-gray-800 min-w-full rounded-lg p-6">
        <h2 className="text-3xl md:text-5xl font-bold">Sample Responses</h2>
        <p className="text-lg mt-4 md:max-w-2/5">
          Here are some sample responses from the model:
        </p>
        <ul className="text-lg grid grid-cols-1 lg:grid-cols-2 gap-2 md:max-w-3/5 mt-4 pl-2 min-w-[200px]">
          <li>
            <Image src="/llm_res_hindi.png" alt="Sample of LLM Response in Hindi" width={500} height={300} className="p-2" />
          </li>
          <li>
            <Image src="/llm_response.png" alt="Sample of LLM Response in English" width={500} height={300} className="p-2" />
          </li>
          <li>
            <Image src="/sample_3.png" alt="Sample of LLM Response in English" width={500} height={300} className="p-2" />
          </li>
          <li>
            <Image src="/sample_4.png" alt="Sample of LLM Response in Hindi" width={500} height={300} className="p-2" />
          </li>
        </ul>
        <p className="font-bold">Here’s how the model generates responses:</p>
        <Image src="/backend_proof.png" alt="LLM Response Generation Process" width={800} height={400} className="p-2" />
      </div>

      {/* About Section */}
      <div id="about" className="flex flex-col items-center min-h-[80lvh] mb-2 p-6 bg-gray-400 dark:bg-gray-700  min-w-full rounded-lg">
        <h2 className="text-3xl md:text-5xl font-bold">Major Features:</h2>
        <ul className="text-lg flex flex-col gap-3 md:gap-4 md:max-w-3/5 list-disc mt-4 pl-2 min-w-[200px]">
          <li>
            Fine-tuned LLM model for accurate responses along with sources (such as
            description, previously answered questions, reviews, etc.).
          </li>
          <li>Trained on over 20,000 product-related question–answer pairs.</li>
          <li>
            Supports multiple languages (including, but not limited to, Hindi and
            English).
          </li>
          <li>
            Utilizes advanced NLP techniques for better understanding and
            context.
          </li>
          <li>
            Supports multiple e-commerce websites (such as Flipkart, Amazon, etc.) and can easily adapt for new platforms.
          </li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="flex flex-col justify-center items-center gap-1 md:gap-4 py-4 bg-gray-300 dark:bg-gray-800 w-full text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Automatic Product Q&amp;A System. All rights reserved.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Designed and developed by{" "}
          <Link
            className="text-blue-400 underline break-all"
            href="https://www.linkedin.com/in/raj-kumar787/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Raj Kumar
          </Link>.
        </p>
      </footer>
    </div>
  );
}
