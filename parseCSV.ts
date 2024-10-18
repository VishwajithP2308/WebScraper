import * as fs from "fs";
import * as path from "path";
import csv from "csv-parser";

/**
 * This function reads and parses the CSV file containing company names and their YC URLs.
 * @param csvFilePath - The path to the CSV file
 * @returns An array of objects containing the company name and its YC URL.
 */
export async function parseCSV(csvFilePath: string): Promise<Array<{ name: string; url: string }>> {
  const companies: Array<{ name: string; url: string }> = [];
  const filePath = path.resolve(csvFilePath);

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        companies.push({ name: row["Company Name"], url: row["YC URL"] });
      })
      .on("end", () => {
        resolve(companies);
      })
      .on("error", (error) => {
        reject(`Error reading CSV file: ${error}`);
      });
  });
}