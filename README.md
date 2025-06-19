# Automatic Product Q&A System

A full-stack web application that provides instant, accurate answers to product-related questions using a fine-tuned LLM (Large Language Model) trained on over 20,000 product Q&A pairs. The system scrapes product information from e-commerce sites, caches results for performance, and delivers answers with sources and reasoning.

---

## ✨ Features

- **Instant Product Q&A:** Get answers to your product queries in real time.
- **Source & Reasoning:** Each answer includes supporting information and reasoning from product descriptions, reviews, and Q&A sections.
- **Multi-language Support:** Handles questions in multiple languages (including Hindi and English).
- **E-commerce Integration:** Gather up-to-date product data from Flipkart (more platforms can be added).
- **Modern UI:** Built with Next.js, Tailwind CSS, and shadcn/ui for a responsive, accessible experience.
- **Smart Caching:** Product info is cached for 30 minutes to reduce redundant scraping and speed up responses.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/automatic-product-qna-system.git
cd automatic-product-qna-system/frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 🛠️ Project Structure

- `src/app/` – Next.js app directory (pages, API routes, layout)
- `src/components/` – Reusable UI components (navigation bar, theme button, etc.)
- `src/lib/` – Utility libraries (scraper, cache, etc.)
- `src/types/` – TypeScript interfaces and types

---

## 🖼️ Screenshots

- **Home Page:** Introduction and sample responses
- **Chat Page:** Enter a product link, ask questions, and get instant answers with sources
- **About Section:** Major features and project highlights

---

## ⚡ Usage

1. **Paste a Flipkart product link** in the chat page.
2. **Ask any product-related question** (in English or Hindi).
3. **Get an instant answer** with reasoning and source references.

---

## 📦 Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.

---



## 📢 Note

- Currently, only Flipkart product links are supported.
- For best results, use valid product URLs and clear questions.

---

Feel free to contribute, open issues, or suggest features!
