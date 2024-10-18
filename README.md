
# Web Scraping Tool for YC Companies

## Project Overview

This project implements a web scraping tool designed to extract structured data from public Y Combinator (YC) company pages. Given a CSV file with company names and URLs, the tool scrapes relevant information about each company and stores the structured data in a JSON file.

The focus of this challenge was to build a scalable and error-resilient scraper that efficiently extracts and processes dynamic content while handling missing or incomplete data gracefully.

## Features

- **CSV Parsing**: Reads and parses company names and URLs from a CSV file using the `csv-parser` library.
- **Web Scraping**: Utilizes Axios for fetching web pages and Cheerio for parsing and extracting HTML content.
- **Error Handling**: Includes comprehensive error handling to ensure that scraping failures for one company don’t halt the process for others.
- **Dynamic Content Handling**: Gracefully handles missing or incomplete data by dynamically setting fields to undefined or null as appropriate.
- **Data Storage**: Extracted data is saved as structured JSON for each company, making it easily consumable for future applications.

## Tech Stack

- **Node.js**: Handles the server-side logic and scripting.
- **TypeScript**: Ensures type safety and improved maintainability.
- **Cheerio**: Parses and extracts HTML content from the YC pages.
- **Axios**: Fetches the web pages for scraping.
- **csv-parser**: Reads and parses CSV files.
- **fs**: Interacts with the filesystem for reading and writing files.

---

## Project Structure

```bash
├── inputs/             # Contains the CSV file with company names and URLs
├── challenge.ts        # Main file for handling the scraping logic
├── parseCSV.ts         # Module responsible for parsing the CSV file
├── scraper.ts          # Module responsible for scraping individual YC pages
├── package.json        # Node.js dependencies and scripts
├── package-lock.json   # Dependency lock file
├── README.md           # This readme file
├── resources.ts        # Configuration for paths and constants
├── runner.ts           # Script to execute the scraping tool
├── tsconfig.json       # TypeScript configuration file
```

---

## How It Works

1. **CSV Parsing**: The tool starts by reading the `inputs/companies.csv` file using the `csv-parser` library to retrieve the list of companies and their respective URLs.
   
2. **Scraping**: For each company, Axios is used to fetch the corresponding YC profile page. The fetched HTML is parsed using Cheerio to extract structured information, such as:
   - Company name
   - Founders
   - Year founded
   - Employee count
   - Location
   - Job openings (if any)

3. **Error Handling**: If a page cannot be scraped, the process moves on to the next company without stopping. Any missing fields are dynamically set to undefined to handle cases where some companies do not provide complete information.

4. **Data Storage**: Once all companies are processed, the structured data is stored in a JSON file in the `out/` directory.

---

## Getting Started

### Prerequisites

- Node.js (v18 or greater)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/VishwajithP2308/challenge-2-web-scraping.git
   ```

2. Navigate to the project directory:
   ```bash
   cd challenge-2
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

---

## Usage

1. **Prepare the Input**: Place the CSV file with company names and URLs inside the `inputs/` directory. Ensure the file is named `companies.csv`.

2. **Run the Scraper**:
   ```bash
   npm run start
   ```

This will parse the CSV file, scrape each YC company’s page, and store the structured data in the `out/scraped.json` file.

---

## Error Handling

- **Failed Scrapes**: If a page fails to scrape, the error is logged, and the scraper continues with the next company. The final JSON file will contain incomplete data for companies with missing fields.
- **Missing Data**: If certain fields are missing from a company's page (e.g., no job openings or no employee count), those fields are dynamically set to `null` or `undefined` in the JSON output.

---

## Improvements

- **Rate Limiting**: Introduce rate limiting or delay between requests to avoid being blocked by the website.
- **Data Enrichment**: Enhance the tool by scraping additional sources to enrich company data.
- **Retries**: Add retry logic to attempt scraping failed pages a set number of times before logging the failure.
