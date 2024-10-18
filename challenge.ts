import { parseCSV } from "./parseCSV";
import { scrapeCompanyPage } from "./scraper";
import { CSV_INPUT_PATH, JSON_OUTPUT_PATH } from "./resources";
import * as fs from "fs/promises";
import * as path from "path";
import * as fsSync from "fs"; // For synchronous fs operations

/**
 * The entry point function. This will read the provided CSV file, scrape the companies'
 * YC pages, and output structured data in a JSON file.
 */
export async function processCompanyList() {
  try {
    // Step 1: Parse the CSV file to get the list of companies and URLs
    const companies = await parseCSV(CSV_INPUT_PATH);
    console.log(`Parsed ${companies.length} companies from the CSV file.`);

    // Step 2: Create an array to store the results
    const results = [];

    // Step 3: Loop through each company and scrape its YC page
    for (const company of companies) {
      console.log(`Scraping data for: ${company.name}`);
      
      // Step 4: Scrape the company's YC page
      const scrapedData = await scrapeCompanyPage(company.url);
      
      // Step 5: Combine the scraped data with the company name
      results.push({
        name: company.name,
        founders: scrapedData.founders,
        foundedYear: scrapedData.foundedYear,
        employeeCount: scrapedData.employeeCount,
        location: scrapedData.location,
        hiring: scrapedData.hiring,
        description: scrapedData.description,
      });
    }

    // Step 6: Ensure the 'out' directory exists
    const outputDir = path.dirname(JSON_OUTPUT_PATH);
    if (!fsSync.existsSync(outputDir)) {
      await fs.mkdir(outputDir, { recursive: true });
      console.log(`Created directory: ${outputDir}`);
    }

    // Step 7: Write the results to a JSON file
    await fs.writeFile(JSON_OUTPUT_PATH, JSON.stringify(results, null, 2), "utf-8");
    console.log(`Scraped data for ${results.length} companies saved to ${JSON_OUTPUT_PATH}.`);
  } catch (error) {
    console.error("An error occurred while processing the company list:", error);
  }
}
