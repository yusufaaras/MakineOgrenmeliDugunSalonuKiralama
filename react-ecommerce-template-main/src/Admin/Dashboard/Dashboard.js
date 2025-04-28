import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const dataGelir = [
  { name: 'Ocak', gelir: 1200 },
  { name: 'Şubat', gelir: 1500 },
  { name: 'Mart', gelir: 1100 },
  { name: 'Nisan', gelir: 1800 },
  { name: 'Mayıs', gelir: 1600 },
];

const dataSiparis = [
  { name: '1. Düğün Salonu', value: 400 },
  { name: '2. Düğün Salonu', value: 300 },
  { name: '3. Düğün Salonu', value: 300 },
  { name: '4. Düğün Salonu', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = ({ isOpen }) => {
  return (
    <div className={`dashboard-container ${isOpen ? "open" : "closed"} p-6 bg-gray-100 min-h-screen`}>
      {/* Başlık */}
      <div className="dashboard-header mb-8">
        <h2 className="text-3xl font-semibold text-gray-700">Admin Paneli</h2>
        <p className="text-gray-500 mt-1">Genel Bakış ve İstatistikler</p>
      </div>

      {/* Grafik Alanları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Aylık Gelir Grafiği */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Aylık Yapılan Rezervasyonlar</h3>
          <ResponsiveContainer height={300}>
            <BarChart data={dataGelir}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Bar dataKey="gelir" fill="#8884d8" name="Gelir ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sipariş Dağılımı Grafiği */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Rezervasyon Dağılımı</h3>
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie
                data={dataSiparis}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {dataSiparis.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ek İstatistikler ve Grafikler Eklenebilir */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Son İşlemler</h3>
        {/* Buraya son siparişler, kullanıcı kayıtları vb. listelenebilir */}
        <ul>
          <li className="py-2 border-b">Yeni Kullanıcı Kaydı: Ayşe Yılmaz</li>
          <li className="py-2 border-b">Yeni Sipariş: #1023 - $55</li>
          <li className="py-2 border-b">Ürün Güncellemesi: Stoklar yenilendi</li>
          {/* Daha fazla işlem... */}
        </ul>
      </div>

      {/* Başka bir grafik örneği: Çizgi grafik */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Rezervasyon Artışı (Son 7 Gün)</h3>
        <ResponsiveContainer height={300}>
          <LineChart data={[
            { name: 'Paz', kullanıcı: 50 },
            { name: 'Pzt', kullanıcı: 65 },
            { name: 'Sal', kullanıcı: 70 },
            { name: 'Çar', kullanıcı: 82 },
            { name: 'Per', kullanıcı: 78 },
            { name: 'Cum', kullanıcı: 90 },
            { name: 'Cmt', kullanıcı: 85 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="kullanıcı" stroke="#82ca9d" strokeWidth={2} name="Yeni Rezervasyon" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;