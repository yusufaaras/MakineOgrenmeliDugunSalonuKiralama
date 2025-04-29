const Dashboard = ({ isOpen }) => {
  return (
    <div className={`dashboard-container ${isOpen ? "open" : "closed"} p-6 bg-gray-100 min-h-screen`}>
      {/* Başlık */}
      <div className="dashboard-header mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Dashboard</h2>
      </div>

      {/* İçerik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-600">Toplam Kullanıcı</h3>
          <p className="text-3xl font-bold text-blue-500">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-600">Toplam Sipariş</h3>
          <p className="text-3xl font-bold text-green-500">340</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-600">Toplam Gelir</h3>
          <p className="text-3xl font-bold text-purple-500">$12,540</p>
        </div>
      </div>

      {/* Grafik Alanı */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Grafikler ve İstatistikler</h3>
        <p className="text-gray-500">Buraya bir grafik bileşeni ekleyebilirsiniz.</p>
      </div>
    </div>
  );
};

export default Dashboard;
