@'
# Retail Intelligence AI

An AI-powered retail analytics and decision-support dashboard for analyzing sales performance, forecasting future revenue, and identifying meaningful store segments from historical retail data.

## Overview

Retail Intelligence AI transforms historical retail transaction data into actionable business insights through interactive analytics, predictive forecasting, and store segmentation.

The system analyzes sales across stores and product categories, identifies revenue patterns and seasonality, evaluates multiple forecasting approaches, predicts future revenue, and groups stores using K-Means clustering.

## Key Capabilities

- Sales and revenue performance analysis
- Store-level performance analysis
- Product category intelligence
- Monthly revenue and seasonality analysis
- Revenue forecasting
- Forecast model comparison
- Store segmentation using K-Means clustering
- Business insight generation
- Interactive data visualizations
- Executive decision-support dashboard

## Project Workflow

Retail Sales Data
↓
Data Preprocessing
↓
Business & Sales Analytics
↓
Category & Store Analysis
↓
Monthly Revenue Analysis
↓
Forecast Model Evaluation
↓
Future Revenue Forecast
↓
K-Means Store Segmentation
↓
Business Insights
↓
Interactive Decision-Support Dashboard

## Dataset

The project analyzes historical retail sales data covering:

- Period: January 2023 – December 2024
- Stores: 8
- Product Categories: 5
- Approximately 73,000 records

## Business Analytics

### Sales Intelligence

- Total revenue
- Total units sold
- Average unit realization
- Monthly revenue trends
- Revenue performance over time

### Category Intelligence

Category-level analysis includes:

- Revenue
- Revenue share
- Units sold
- Average discount

Electronics is the highest-revenue category in the analyzed dataset, contributing approximately 20.22% of total revenue.

### Store Intelligence

Store-level analysis includes:

- Total revenue
- Units sold
- Average discount
- Store revenue comparison
- Revenue-based performance signals

STR_103 recorded the highest total revenue in the analyzed dataset, while STR_106 recorded the lowest.

## Revenue Forecasting

Three forecasting approaches were evaluated using a historical training period and a six-month holdout period:

1. Seasonal Naïve
2. Holt Exponential Smoothing
3. SARIMA

The models were evaluated using:

- MAE
- RMSE
- R²
- MAPE

### Forecast Model Evaluation

| Model | MAE | RMSE | R² | MAPE |
|---|---:|---:|---:|---:|
| Seasonal Naïve | ₹22.29M | ₹24.10M | 0.6657 | 1.28% |
| Holt Exponential Smoothing | ₹51.34M | ₹61.77M | -1.1971 | 2.90% |
| SARIMA | ₹80.69M | ₹96.45M | -4.3562 | 4.69% |

For the selected holdout period, Seasonal Naïve produced the lowest MAE, RMSE, and MAPE among the evaluated approaches.

## Future Revenue Forecast

The selected forecasting approach generates a six-month revenue forecast for January–June 2025.

| Month | Forecast Revenue |
|---|---:|
| January 2025 | ₹1.763B |
| February 2025 | ₹1.568B |
| March 2025 | ₹1.681B |
| April 2025 | ₹1.645B |
| May 2025 | ₹1.696B |
| June 2025 | ₹1.687B |

## Store Segmentation

K-Means clustering is used to identify practical store segments based on:

- Total revenue
- Total units
- Average discount
- Average unit price
- Revenue per record
- Revenue per unit

Four practical store segments are presented in the dashboard to support differentiated business analysis.

## Dashboard

The dashboard is organized into:

- Overview
- System Architecture
- Sales Intelligence
- Category Intelligence
- Store Intelligence
- Forecasting
- AI Insights
- Executive Summary

The interface combines interactive charts, KPI cards, analytical storytelling, and decision-support insights.

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React

### Data & Analytics

- Python
- Pandas
- NumPy
- Scikit-learn
- Statsmodels
- PapaParse

### Machine Learning

- Time-series forecasting
- Seasonal Naïve forecasting
- Holt Exponential Smoothing
- SARIMA
- K-Means clustering
- StandardScaler

## Project Structure

```text
retail-intelligence/
├── data/
│   ├── category_performance.csv
│   ├── store_performance.csv
│   ├── store_segmentation.csv
│   ├── forecast_model_comparison.csv
│   ├── future_revenue_forecast.csv
│   ├── monthly_revenue.csv
│   └── forecast_test_results.csv
├── public/
│   └── data/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── package.json
└── README.md