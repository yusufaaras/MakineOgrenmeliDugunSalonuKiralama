import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

// Chart.js bileşenlerini kaydetme
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = ({ isOpen }) => {
  // Örnek veri
  const userGrowthData = {
    labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs"],
    datasets: [
      {
        label: "Yeni Kullanıcılar",
        data: [200, 300, 400, 500, 600],
        backgroundColor: ["#4c51bf"],
      },
    ],
  };

  const orderData = {
    labels: ["Paz", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
    datasets: [
      {
        label: "Siparişler",
        data: [50, 100, 75, 150, 200, 175, 250],
        backgroundColor: "#48bb78",
      },
    ],
  };

  const revenueData = {
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        label: "Gelir",
        data: [3000, 4000, 2500, 2000],
        backgroundColor: ["#805ad5", "#38b2ac", "#e53e3e", "#f6ad55"],
      },
    ],
  };

  const visitData = {
    labels: ["Ocak", "Şub", "Mar", "Nis", "May"],
    datasets: [
      {
        label: "Ziyaretçi",
        data: [1000, 1200, 1500, 1800, 2000],
        borderColor: "#4299e1",
        backgroundColor: "rgba(66, 153, 225, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Boyutların orantılı kalmasını engeller
    plugins: {
      legend: {
        position: 'bottom', // Legend'ı alta yerleştir
        labels: {
          font: {
            size: 10 // Legend font boyutunu küçült
          }
        }
      },
      title: {
        display: true,
        font: {
          size: 12 // Başlık font boyutunu küçült
        }
      },
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 10 // Y ekseni etiket font boyutunu küçült
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 10 // X ekseni etiket font boyutunu küçült
          }
        }
      }
    }
  };

  return (
    <div className={`dashboard-container ${isOpen ? "open" : "closed"} p-6 bg-gray-100 min-h-screen`}>
      {/* Başlık */}
      <div className="dashboard-header mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Hello Admin</h2>
      </div>

      {/* İlk Sıra Grafikler */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kullanıcı Büyüme Grafiği */}
        <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: '200px' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Kullanıcı Büyümesi</h3>
          <Bar data={userGrowthData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Aylık' } } }} />
        </div>

        {/* Sipariş Grafiği */}
        <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: '200px' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Haftalık Siparişler</h3>
          <Bar data={orderData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Haftalık' } } }} />
        </div>
      </div>

      {/* İkinci Sıra Grafikler */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gelir Dağılımı Grafiği */}
        <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: '200px' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Gelir Dağılımı</h3>
          <Doughnut data={revenueData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Ürün Bazında' } } }} />
        </div>

        {/* Ziyaretçi Grafiği */}
        <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: '200px' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Aylık Ziyaretçiler</h3>
          <Line data={visitData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Aylık' } } }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;