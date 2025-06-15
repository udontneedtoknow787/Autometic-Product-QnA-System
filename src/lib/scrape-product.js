const puppeteer = require("puppeteer");
const fs = require("fs");
const cheerio = require("cheerio");
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;

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

// async function scrapeFlipkartPage(url, index) {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     await page.goto(url, { waitUntil: "networkidle2" });
//     const html = await page.content();

//     // fs.writeFileSync(`flipkart${index}.html`, html, "utf-8");

//     const $ = cheerio.load(html);

//     const product = {
//         productName: getProductName($),
//         price: getPrice($),
//         description: getDescription($),
//         specifications: getSpecifications($),
//         reviews: getReviews($),
//         questionsAnswers: getQuestions($)
//     };

//     console.log(product);
//     await browser.close();
//     return product;
// }

export default async function ScrapeProductInfo(url){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });
    const html = await page.content();

    // fs.writeFileSync(`flipkart${index}.html`, html, "utf-8");

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

// async function runScraper(urls) {
//     const products = [];

//     for (let i = 0; i < urls.length; i++) {
//         try {
//             const product = await scrapeFlipkartPage(urls[i], i + 1);
//             products.push(product);
//         } catch (err) {
//             console.error(`Error scraping URL ${i + 1}:`, err);
//         }
//     }

    // const csvWriter = createCsvWriter({
    //     path: "queryProducts.csv",
    //     header: [
    //         { id: "productName", title: "productName" },
    //         { id: "price", title: "price" },
    //         { id: "description", title: "description" },
    //         { id: "specifications", title: "specifications" },
    //         { id: "reviews", title: "reviews" },
    //         { id: "questionsAnswers", title: "questionsAnswers" }
    //     ],
    //     append: true
    // });

    // await csvWriter.writeRecords(products);
    // console.log("Data written to CSV.");
// }

// const urlList = [
//     "https://www.flipkart.com/saf-wooden-framed-floral-theme-canvas-wall-painting-home-dcor-office-digital-reprint-16-inch-x/p/itm592531be2c23e?pid=PTGH29TASN4E6MER&lid=LSTPTGH29TASN4E6MER17FDU4&marketplace=FLIPKART&store=arb%2Fbga&srno=b_1_22&otracker=browse&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_4_L2_view-all&fm=organic&iid=en_FzD-KR5qkfUvBvX0w0-25HqowX0X7dbLUgauwFTED2ZAWjMqcemo6rW4r3uErS8aRk7QE5VvGh76VD7iQ94mwg%3D%3D&ppt=browse&ppn=browse&ssid=5aa8dy916o0000001745232539121",
//     "https://www.flipkart.com/acer-aspire-3-intel-core-i3-13th-gen-1305u-8-gb-512-gb-ssd-windows-11-home-a324-53-thin-light-laptop/p/itma6a6812aa712e?pid=COMH4B6CGTPNVJW9&lid=LSTCOMH4B6CGTPNVJW9JOF4ZC&marketplace=FLIPKART&q=laptop&store=6bo%2Fb5g&srno=s_1_2&otracker=search&otracker1=search&fm=organic&iid=en_t4SP8dMCrs880cwPZCkk3abopY6b4miA7BwZr28b1Xt9wPaSc4Nr2vo7ZekhVqXBp0MaEcq1Wjc57aq1rR23zfUFjCTyOHoHZs-Z5_PS_w0%3D&ppt=hp&ppn=homepage&ssid=6ktkitx1r40000001745201899973&qH=312f91285e048e09",
// ];

// runScraper(urlList);