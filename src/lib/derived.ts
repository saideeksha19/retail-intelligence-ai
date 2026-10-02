import type { CSVRow } from "@/lib/retailData";

/* ============================================================
   DERIVED ANALYTICS — every number shown in the UI is computed
   here, deterministically, from the real CSV rows loaded by
   src/lib/retailData.ts. No fabricated or placeholder values.
   ============================================================ */

/* ---------- parsing helpers ---------- */

export function num(row: CSVRow | undefined, key: string): number {
  if (!row) return 0;
  const raw = row[key];
  const value =
    typeof raw === "string" ? parseFloat(raw.replace(/,/g, "")) : Number(raw);
  return Number.isFinite(value) ? value : 0;
}

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export interface MonthPoint {
  key: string; // "2023-01"
  date: Date;
  label: string; // "Jan 2023"
  short: string; // "Jan 23"
  revenue: number;
}

function toMonthPoint(dateStr: string, value: number): MonthPoint | null {
  const match = /^(\d{4})-(\d{2})/.exec(dateStr ?? "");
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  return {
    key: `${match[1]}-${match[2]}`,
    date: new Date(Date.UTC(year, month, 1)),
    label: `${MONTHS_SHORT[month]} ${year}`,
    short: `${MONTHS_SHORT[month]} ${String(year).slice(2)}`,
    revenue: value,
  };
}

/* ---------- public types ---------- */

export interface CategoryStat {
  name: string;
  revenue: number;
  units: number;
  discount: number;
  share: number; // from the CSV Revenue_Share_% column
  rank: number;
}

export interface StoreStat {
  id: string;
  revenue: number;
  units: number;
  records: number;
  discount: number;
  rank: number;
}

export interface ClusterStat {
  cluster: number;
  label: string; // "SEGMENT 01"
  stores: string[];
  storeCount: number;
  totalRevenue: number; // Σ of per-store Total_Revenue
  totalUnits: number; // Σ of per-store Total_Units
  avgDiscount: number; // mean of per-store Average_Discount
  avgUnitPrice: number; // mean of per-store Average_Unit_Price
  revenuePerRecord: number; // mean of per-store Revenue_per_Record
  revenuePerUnit: number; // mean of per-store Revenue_per_Unit
  avgRevenuePerStore: number;
}

export interface ModelStat {
  model: string;
  mae: number;
  rmse: number;
  r2: number;
  mape: number;
}

export interface HoldoutPoint {
  key: string;
  label: string;
  actual: number;
  predicted: number;
  deltaPct: number;
}

export interface ForecastPoint {
  key: string;
  label: string;
  value: number;
}

export interface ForecastSeriesPoint {
  key: string;
  label: string;
  actual: number | null;
  predicted: number | null;
  forecast: number | null;
}

export interface RetailAnalytics {
  months: MonthPoint[];
  monthlyTotal: number;
  monthlyAvg: number;
  peak: MonthPoint;
  low: MonthPoint;
  year2023: number;
  year2024: number;
  yoyPct: number;
  rangeStartLabel: string;
  rangeEndLabel: string;
  chartTicks: string[];

  categories: CategoryStat[];
  categoryLeader: CategoryStat;
  categoryCount: number;
  categoryShareSum: number;

  stores: StoreStat[];
  storeLeader: StoreStat;
  storeLaggard: StoreStat;
  storeCount: number;
  recordsTotal: number;
  unitsTotal: number;
  avgUnitPrice: number;
  avgStoreDiscount: number;
  avgRevenuePerStore: number;
  recordsDisplay: string;

  clusters: ClusterStat[];

  models: ModelStat[];
  bestModel: ModelStat;
  bestModelDominant: boolean;

  holdout: HoldoutPoint[];
  holdoutWindow: string;
  holdoutActualTotal: number;
  holdoutPredictedTotal: number;
  holdoutDeltaPct: number;

  forecast: ForecastPoint[];
  forecastTotal: number;
  forecastAvg: number;
  forecastHorizon: string;

  series: ForecastSeriesPoint[];
}

/* ---------- formatters ---------- */

const trimNum = (n: number): string => {
  const abs = Math.abs(n);
  const digits = abs >= 100 ? 0 : abs >= 10 ? 1 : 2;
  return n
    .toFixed(digits)
    .replace(/\.0+$/, "")
    .replace(/(\.\d)0$/, "$1");
};

export function fmtINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function fmtINRCompact(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1e12) return `₹${trimNum(value / 1e12)}T`;
  if (abs >= 1e9) return `₹${trimNum(value / 1e9)}B`;
  if (abs >= 1e6) return `₹${trimNum(value / 1e6)}M`;
  if (abs >= 1e3) return `₹${trimNum(value / 1e3)}K`;
  return `₹${trimNum(value)}`;
}

export function fmtNum(value: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    value
  );
}

export function fmtNumCompact(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1e6) return `${trimNum(value / 1e6)}M`;
  if (abs >= 1e3) return `${trimNum(value / 1e3)}K`;
  return fmtNum(value);
}

export function fmtPct(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}

export function fmtSignedPct(value: number, digits = 1): string {
  return `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(digits)}%`;
}

/* ---------- main derivation ---------- */

export function computeRetailAnalytics(input: {
  monthlyRevenue: CSVRow[];
  categoryPerformance: CSVRow[];
  storePerformance: CSVRow[];
  storeSegmentation: CSVRow[];
  forecastModelComparison: CSVRow[];
  futureRevenueForecast: CSVRow[];
  forecastTestResults: CSVRow[];
}): RetailAnalytics {
  /* --- monthly revenue (monthly_revenue.csv) --- */
  const months = input.monthlyRevenue
    .map((row) => toMonthPoint(row.Date ?? "", num(row, "Revenue")))
    .filter((m): m is MonthPoint => m !== null)
    .sort((a, b) => a.key.localeCompare(b.key));

  const monthlyTotal = months.reduce((sum, m) => sum + m.revenue, 0);
  const monthlyAvg = months.length ? monthlyTotal / months.length : 0;
  const peak = months.reduce(
    (best, m) => (m.revenue > best.revenue ? m : best),
    months[0]
  );
  const low = months.reduce(
    (best, m) => (m.revenue < best.revenue ? m : best),
    months[0]
  );

  const sumYear = (year: number) =>
    months
      .filter((m) => m.key.startsWith(String(year)))
      .reduce((sum, m) => sum + m.revenue, 0);
  const year2023 = sumYear(2023);
  const year2024 = sumYear(2024);
  const yoyPct = year2023 ? ((year2024 - year2023) / year2023) * 100 : 0;

  const chartTicks = months
    .filter((_, i) => i % 6 === 0)
    .map((m) => m.short);

  /* --- categories (category_performance.csv) --- */
  const categories: CategoryStat[] = input.categoryPerformance
    .map((row) => ({
      name: row.Product_Category ?? "—",
      revenue: num(row, "Revenue"),
      units: num(row, "Units_Sold"),
      discount: num(row, "Average_Discount"),
      share: num(row, "Revenue_Share_%"),
      rank: 0,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .map((row, i) => ({ ...row, rank: i + 1 }));

  /* --- stores (store_performance.csv) --- */
  const stores: StoreStat[] = input.storePerformance
    .map((row) => ({
      id: row.Store_ID ?? "—",
      revenue: num(row, "Revenue"),
      units: num(row, "Units_Sold"),
      records: num(row, "Records"),
      discount: num(row, "Average_Discount"),
      rank: 0,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .map((row, i) => ({ ...row, rank: i + 1 }));

  const recordsTotal = stores.reduce((sum, s) => sum + s.records, 0);
  const unitsTotal = stores.reduce((sum, s) => sum + s.units, 0);
  const storesRevenueTotal = stores.reduce((sum, s) => sum + s.revenue, 0);
  const avgUnitPrice = unitsTotal > 0 ? storesRevenueTotal / unitsTotal : 0;
  const avgStoreDiscount = stores.length
    ? stores.reduce((sum, s) => sum + s.discount, 0) / stores.length
    : 0;
  const avgRevenuePerStore = stores.length
    ? storesRevenueTotal / stores.length
    : 0;

  /* --- clusters (store_segmentation.csv) --- */
  const clusterMap = new Map<number, CSVRow[]>();
  for (const row of input.storeSegmentation) {
    const cluster = num(row, "Cluster");
    const list = clusterMap.get(cluster) ?? [];
    list.push(row);
    clusterMap.set(cluster, list);
  }
  const clusters: ClusterStat[] = [...clusterMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([cluster, rows]) => {
      const count = rows.length;
      const mean = (key: string) =>
        rows.reduce((sum, r) => sum + num(r, key), 0) / (count || 1);
      const totalRevenue = rows.reduce(
        (sum, r) => sum + num(r, "Total_Revenue"),
        0
      );
      return {
        cluster,
        label: "SEGMENT",
        stores: rows.map((r) => r.Store_ID ?? "—"),
        storeCount: count,
        totalRevenue,
        totalUnits: rows.reduce((sum, r) => sum + num(r, "Total_Units"), 0),
        avgDiscount: mean("Average_Discount"),
        avgUnitPrice: mean("Average_Unit_Price"),
        revenuePerRecord: mean("Revenue_per_Record"),
        revenuePerUnit: mean("Revenue_per_Unit"),
        avgRevenuePerStore: count ? totalRevenue / count : 0,
      };
    });
  clusters.forEach((c, i) => {
    c.label = `SEGMENT ${String(i + 1).padStart(2, "0")}`;
  });

  /* --- models (forecast_model_comparison.csv) --- */
  const models: ModelStat[] = input.forecastModelComparison
    .map((row) => ({
      model: row.Model ?? "—",
      mae: num(row, "MAE"),
      rmse: num(row, "RMSE"),
      r2: num(row, "R2"),
      mape: num(row, "MAPE_%"),
    }))
    .filter((m) => m.model !== "—");

  const bestModel = models.reduce(
    (best, m) => (m.mae < best.mae ? m : best),
    models[0]
  );
  const minBy = (key: keyof ModelStat) =>
    Math.min(...models.map((m) => m[key] as number));
  const maxBy = (key: keyof ModelStat) =>
    Math.max(...models.map((m) => m[key] as number));
  const bestModelDominant =
    bestModel &&
    bestModel.mae === minBy("mae") &&
    bestModel.rmse === minBy("rmse") &&
    bestModel.mape === minBy("mape") &&
    bestModel.r2 === maxBy("r2");

  /* --- holdout (forecast_test_results.csv) --- */
  const holdout = input.forecastTestResults
    .map((row) => {
      const point = toMonthPoint(row.Date ?? "", num(row, "Revenue"));
      if (!point) return null;
      const predicted = num(row, "Predicted_Revenue");
      return {
        key: point.key,
        label: point.label,
        short: point.short,
        actual: point.revenue,
        predicted,
        deltaPct: point.revenue
          ? ((point.revenue - predicted) / point.revenue) * 100
          : 0,
      };
    })
    .filter((h): h is HoldoutPoint & { short: string } => h !== null)
    .sort((a, b) => a.key.localeCompare(b.key));

  const holdoutActualTotal = holdout.reduce((sum, h) => sum + h.actual, 0);
  const holdoutPredictedTotal = holdout.reduce(
    (sum, h) => sum + h.predicted,
    0
  );
  const holdoutDeltaPct = holdoutActualTotal
    ? ((holdoutActualTotal - holdoutPredictedTotal) / holdoutActualTotal) * 100
    : 0;
  const holdoutWindow = holdout.length
    ? `${holdout[0].label} — ${holdout[holdout.length - 1].label}`
    : "—";

  /* --- future forecast (future_revenue_forecast.csv) --- */
  const forecast = input.futureRevenueForecast
    .map((row) => {
      const point = toMonthPoint(row.Date ?? "", num(row, "Forecasted_Revenue"));
      return point
        ? { key: point.key, label: point.label, value: point.revenue }
        : null;
    })
    .filter((f): f is ForecastPoint => f !== null)
    .sort((a, b) => a.key.localeCompare(b.key));

  const forecastTotal = forecast.reduce((sum, f) => sum + f.value, 0);
  const forecastAvg = forecast.length ? forecastTotal / forecast.length : 0;
  const forecastHorizon = forecast.length
    ? `${forecast[0].label} — ${forecast[forecast.length - 1].label}`
    : "—";

  /* --- combined chart series: actual | holdout prediction | forecast --- */
  const holdoutByKey = new Map(holdout.map((h) => [h.key, h]));
  const series: ForecastSeriesPoint[] = months.map((m, i) => ({
    key: m.key,
    label: m.label,
    actual: m.revenue,
    predicted: holdoutByKey.get(m.key)?.predicted ?? null,
    // anchor the forecast line on the final observed month (a real actual value)
    forecast: i === months.length - 1 ? m.revenue : null,
  }));
  for (const f of forecast) {
    series.push({
      key: f.key,
      label: f.label,
      actual: null,
      predicted: null,
      forecast: f.value,
    });
  }

  return {
    months,
    monthlyTotal,
    monthlyAvg,
    peak,
    low,
    year2023,
    year2024,
    yoyPct,
    rangeStartLabel: months[0]?.label ?? "—",
    rangeEndLabel: months[months.length - 1]?.label ?? "—",
    chartTicks,

    categories,
    categoryLeader: categories[0],
    categoryCount: categories.length,
    categoryShareSum: categories.reduce((sum, c) => sum + c.share, 0),

    stores,
    storeLeader: stores[0],
    storeLaggard: stores[stores.length - 1],
    storeCount: stores.length,
    recordsTotal,
    unitsTotal,
    avgUnitPrice,
    avgStoreDiscount,
    avgRevenuePerStore,
    recordsDisplay: `~${trimNum(recordsTotal / 1000)}K`,

    clusters,

    models,
    bestModel,
    bestModelDominant: Boolean(bestModelDominant),

    holdout,
    holdoutWindow,
    holdoutActualTotal,
    holdoutPredictedTotal,
    holdoutDeltaPct,

    forecast,
    forecastTotal,
    forecastAvg,
    forecastHorizon,

    series,
  };
}
