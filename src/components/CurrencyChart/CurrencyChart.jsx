import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
 Chart as ChartJS,
 LineElement,
 PointElement,
 LinearScale,
 CategoryScale,
 Filler,
 Tooltip,
 Legend,
} from "chart.js";
import s from "./CurrencyChart.module.css";
import { selectRates } from "../../redux/currency/selectors";

ChartJS.register(
 LineElement,
 PointElement,
 LinearScale,
 CategoryScale,
 Filler,
 Tooltip,
 Legend
);

const CurrencyChart = () => {
 const rates = useSelector(selectRates);

 if (rates.length === 0) return null;

 const fakeRates = [
  { currency: "", purchase: 38.49, sale: 38.99 },
  { currency: "", purchase: 40.09, sale: 40.59 },
  { currency: "", purchase: 42.89, sale: 43.59 },
  { currency: "", purchase: 44.09, sale: 44.49 },
 ];

 const finalRates = [
  fakeRates[0],
  rates.find((r) => r.currency === "USD"),
  fakeRates[1],
  fakeRates[2],
  rates.find((r) => r.currency === "EUR"),
  fakeRates[3],
 ].filter(Boolean);

 const labels = finalRates.map((r) => r.currency);
 const purchase = finalRates.map((r) => r.purchase);
 const sale = finalRates.map((r) => r.sale);

 const createGradient = (ctx, area) => {
  const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.375, "rgba(255, 255, 255, 0.54)");
  gradient.addColorStop(0.6091, "rgba(255, 255, 255, 0.27)");
  gradient.addColorStop(0.766, "rgba(255, 255, 255, 0.15)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  return gradient;
 };

 const labelPlugin = {
  id: "customLabels",
  afterDatasetsDraw(chart) {
   const { ctx } = chart;

   if (window.innerWidth < 1280) {
    return;
   }

   chart.data.datasets.forEach((dataset, datasetIndex) => {
    if (dataset.label === "Sale") {
     chart.getDatasetMeta(datasetIndex).data.forEach((point, index) => {
      const currency = finalRates[index]?.currency;
      if (currency === "USD" || currency === "EUR") {
       ctx.save();
       ctx.fillStyle = "#ff868d";
       ctx.font = "bold 12px sans-serif";
       ctx.textAlign = "center";
       ctx.fillText(currency, point.x - 1, point.y - 5);
       ctx.restore();
      }
     });
    }
   });
  },
 };

 const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
   legend: {
    display: false,
   },
   tooltip: {
    enabled: true,
   },
  },
  scales: {
   x: {
    display: false,
    ticks: {
     display: false,
    },
    grid: {
     drawOnChartArea: false,
     drawTicks: false,
     drawBorder: false,
    },
   },
   y: {
    beginAtZero: false,
    display: false,
    ticks: {
     display: false,
    },
    grid: {
     drawOnChartArea: false,
     drawTicks: false,
     drawBorder: false,
    },
   },
  },
  layout: {
   padding: {
    top: 12,
   },
  },
 };

 const data = {
  labels,
  datasets: [
   {
    label: "Purchase",
    data: purchase,
    fill: true,
    backgroundColor: function (context) {
     const { chart } = context;
     const { ctx, chartArea } = chart;
     if (!chartArea) return "rgba(255,255,255,0.2)";
     return createGradient(ctx, chartArea);
    },
    tension: 0.4,
    pointRadius: 0,
   },
   {
    label: "Sale",
    data: sale,
    fill: false,
    borderColor: "#ff868d",
    tension: 0.4,
    pointBackgroundColor: "#563eaf",
    pointBorderColor: "#ff868d",
    pointRadius: sale.map((_, i) =>
     finalRates[i]?.currency === "USD" || finalRates[i]?.currency === "EUR"
      ? 4
      : 0
    ),
   },
  ],
 };

 return (
  <div className={s.chart}>
   <Line data={data} options={options} plugins={[labelPlugin]} />
  </div>
 );
};

export default CurrencyChart;
