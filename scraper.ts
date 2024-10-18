import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Scrapes the YC page for a given company URL and extracts relevant company information.
 * @param url - The YC company page URL.
 * @returns A structured object containing the company's scraped data.
 */
export async function scrapeCompanyPage(url: string): Promise<{ description?: string; founders?: string; foundedYear?: string; employeeCount?: string; location?: string; hiring?: string }> {
  try {
    // Fetch the HTML content of the company's YC page
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Example scraping logic (this would depend on the actual YC page structure):
    const description = $('meta[name="description"]').attr("content") || "";

    // Extracting fields from the description
    const foundedYearMatch = description.match(/Founded in (\d{4})/);
    const foundersMatch = description.match(/Founded in \d{4} by (.+?),/);
    const employeeCountMatch = description.match(/has (\d+) employees/);
    const locationMatch = description.match(/based in ([^,.]+)/);
    const hiringMatch = description.match(/hiring for (\d+) roles/);

    const foundedYear = foundedYearMatch ? foundedYearMatch[1] : undefined;
    const founders = foundersMatch ? foundersMatch[1] : undefined;
    const employeeCount = employeeCountMatch ? employeeCountMatch[1] : undefined;
    const location = locationMatch ? locationMatch[1] : undefined;
    const hiring = hiringMatch ? hiringMatch[1] : undefined;

    // Return the scraped data
    return { description, founders, foundedYear, employeeCount, location, hiring };
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error);
    return {};
  }
}
