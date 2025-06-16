const puppeteer = require("puppeteer");
const fs = require("fs");
const cheerio = require("cheerio");

function fixGarbledPrice(text) {
    return text.replace('â‚¹', '').trim();
}

function cleanText(text) {
    return text.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
}

function getPrice($) {
    const price = $(".Nx9bqj, .CxhGGd").first().text();
    return fixGarbledPrice(price);
}

function getDescription($) {
    const descList = $("div.pqHCzB p").map((i, el) => cleanText($(el).text())).get();
    const descText = descList.join("");

    let smallerDesc = $(".yN\\+eNk, .w9jEaj").first().text();
    smallerDesc = cleanText(smallerDesc);

    return descText + (smallerDesc ? ` [${smallerDesc}]` : "") || "No description found!";
}

function getReviews($) {
    const reviews = $("div.ZmyHeo div div").map((i, el) => `[${cleanText($(el).text())}]`).get().join(" ");
    return reviews || "No reviews found!";
}

function getProductName($) {
    const name = $("span.VU-ZEz").first().text();
    return cleanText(name) || "No product name found!";
}

function getSpecifications($) {
    const specs = {};
    $("tr.WJdYP6.row").each((i, el) => {
        const title = cleanText($(el).find("td.+fFi1w").text());
        const data = cleanText($(el).find("td.Izz52n").text());
        if (title && data) specs[title] = data;
    });

    return Object.entries(specs).map(([key, val]) => `${key}: ${val}`).join(", ") || "No specifications found!";
}

function getQuestions($) {
    const questions = $("div.BZMA\\+t").map((i, el) => {
        const question = cleanText($(el).find("div.wys2hv span:nth-of-type(2)").text());
        const answer = cleanText($(el).find("div.JxAXcP span:nth-of-type(2)").text());
        return `[Q: ${question}, A: ${answer}]`;
    }).get().join("");

    return questions || "No questions found!";
}

export default async function ScrapeProductInfo(url){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36");
    await page.goto(url, { waitUntil: "networkidle2" });
    // Wait for product name or another key element
    await page.waitForSelector("span.VU-ZEz", { timeout: 10000 });

    const html = await page.content();

    const $ = cheerio.load(html);

    const product = {
        productName: getProductName($),
        price: getPrice($),
        description: getDescription($),
        specifications: getSpecifications($),
        reviews: getReviews($),
        questionsAnswers: getQuestions($)
    };

    console.log(product);
    await browser.close();
    return product;
}