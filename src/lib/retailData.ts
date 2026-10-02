import Papa from "papaparse";

export type CSVRow = Record<string, string>;

async function loadCSV(filename: string): Promise<CSVRow[]> {
  const response = await fetch(`/data/${filename}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${filename}`);
  }

  const csvText = await response.text();

  const result = Papa.parse<CSVRow>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data;
}

export async function loadRetailData() {
  const [
    categoryPerformance,
    storePerformance,
    storeSegmentation,
    forecastModelComparison,
    futureRevenueForecast,
    monthlyRevenue,
    forecastTestResults,
  ] = await Promise.all([
    loadCSV("category_performance.csv"),
    loadCSV("store_performance.csv"),
    loadCSV("store_segmentation.csv"),
    loadCSV("forecast_model_comparison.csv"),
    loadCSV("future_revenue_forecast.csv"),
    loadCSV("monthly_revenue.csv"),
    loadCSV("forecast_test_results.csv"),
  ]);

  return {
    categoryPerformance,
    storePerformance,
    storeSegmentation,
    forecastModelComparison,
    futureRevenueForecast,
    monthlyRevenue,
    forecastTestResults,
  };
}