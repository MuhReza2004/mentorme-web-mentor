import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const DetailExchangeContent = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const isCoinMe = type === "coinme";

  return (
    <div className="flex">
      {/* Main Content */}
      <main className="flex-1 p-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-500 hover:text-blue-700">
            <FaArrowLeft className="mr-2" /> Back
          </button>
        <h1 className="text-2xl font-bold mb-2">Exchange {isCoinMe ? "CoinMe" : "MoneyMe"}</h1>

        <div className="bg-white shadow-md rounded-lg p-6 w-2/3">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold">{isCoinMe ? "CoinMe" : "MoneyMe"}</h2>
            <span className="text-yellow-500 text-xl">{isCoinMe ? "🟡" : "💵"}</span>
          </div>

          {/* Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Pilih Bulan</label>
            <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg">
              <option>Oktober 2024</option>
              <option>November 2024</option>
            </select>
          </div>

          {/* Saldo */}
          <div className="mt-4 p-4 border rounded-lg text-center text-lg font-bold">
            {isCoinMe ? "500 CoinMe" : "120.000 MoneyMe"}
          </div>

          {/* Tombol Tarik */}
          <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600">
            Tarik {isCoinMe ? "CoinMe" : "MoneyMe"}
          </button>

          {/* Rincian */}
          <h3 className="mt-6 font-bold">Rincian</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex justify-between">
              <span>Konsultasi</span> <span>{isCoinMe ? "10C" : "Rp 10.000"}</span>
            </li>
            <li className="flex justify-between">
              <span>Aktivitas</span> <span>{isCoinMe ? "25C" : "Rp 25.000"}</span>
            </li>
            <li className="flex justify-between">
              <span>Konsultasi</span> <span>{isCoinMe ? "10C" : "Rp 10.000"}</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default DetailExchangeContent;
 