import React from "react";
import { Link } from "react-router-dom";

const ExchangeContent = () => {
  return (
    <div className="flex">

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Exchange</h1>

        <div className="space-y-4">
          {/* Card CoinMe */}
          <div className="flex items-center justify-between border p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <span className="text-yellow-500 text-xl mr-2">🟡</span>
              <div>
                <h2 className="font-bold">CoinMe</h2>
                <p>500</p>
              </div>
            </div>
            <Link to="/DetailExchange" className="text-blue-500 hover:underline">
              Detail
            </Link>
          </div>

          {/* Card MoneyMe */}
          <div className="flex items-center justify-between border p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <span className="text-green-500 text-xl mr-2">💵</span>
              <div>
                <h2 className="font-bold">MoneyMe</h2>
                <p>120.000</p>
              </div>
            </div>
            <Link to="/DetailExhange" className="text-blue-500 hover:underline">
              Detail
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExchangeContent;
