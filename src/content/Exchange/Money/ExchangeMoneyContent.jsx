import { useState } from "react";
import { PostExchangeMoney } from "../../../services/api";

const ExchangeMoneyContent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    money: "",
    accountNumber: "",
    bank: "",
  });

  const [formattedMoney, setFormattedMoney] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(""); // "success" | "error"

  const formatRupiah = (value) => {
    const number = value.replace(/\D/g, "");
    return new Intl.NumberFormat("id-ID").format(number);
  };

  const handleMoneyChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    const formatted = formatRupiah(raw);
    setFormData({ ...formData, money: raw });
    setFormattedMoney(formatted);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");
    setModalMessage("");
    setShowModal(false);

    // Validasi minimum uang
    const moneyValue = parseInt(formData.money);
    if (isNaN(moneyValue) || moneyValue < 100000) {
      setModalMessage("Jumlah minimum penukaran adalah Rp100.000");
      setStatus("error");
      setShowModal(true);
      return;
    }

    setLoading(true);

    try {
      const response = await PostExchangeMoney(formData);
      console.log(response);
      if (response?.code === 200) {
        setModalMessage("Silahkan tunggu 1x24 jam");
        setStatus("success");
        setShowModal(true);
        setFormData({ money: "", accountNumber: "", bank: "" });
        setFormattedMoney("");
      } else {
        throw new Error("Pengajuan gagal. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
      setModalMessage(err.message || "Terjadi kesalahan saat mengirim data.");
      setStatus("error");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const bankOptions = [
    { value: "bca", label: "BCA" },
    { value: "bni", label: "BNI" },
    { value: "bri", label: "BRI" },
    { value: "mandiri", label: "Mandiri" },
    { value: "permata", label: "Permata" },
    { value: "cimb", label: "CIMB Niaga" },
    { value: "gopay", label: "GoPay" },
    { value: "shopeepay", label: "ShopeePay" },
    { value: "ovo", label: "OVO" },
    { value: "dana", label: "DANA" },
    { value: "linkaja", label: "LinkAja" },
  ];

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
      >
        <h2 className="text-xl font-semibold mb-4">Penukaran Saldo</h2>

        <div className="mb-4">
          <label
            htmlFor="money"
            className="block text-gray-700 font-medium mb-1"
          >
            Jumlah Penukaran
          </label>
          <input
            type="text"
            id="money"
            name="money"
            placeholder="Minimum Rp100.000"
            value={formattedMoney}
            onChange={handleMoneyChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="accountNumber"
            className="block text-gray-700 font-medium mb-1"
          >
            Nomor Rekening / E-wallet
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bank" className="block text-gray-700 font-medium mb-1">
            Bank / E-Wallet
          </label>
          <select
            id="bank"
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Pilih --</option>
            {bankOptions.map((bank) => (
              <option key={bank.value} value={bank.value}>
                {bank.label}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Memproses..." : "Ajukan Penukaran"}
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <div className="mb-4 flex justify-center">
              {status === "success" && (
                <svg
                  className="w-16 h-16 text-green-500 animate-scaleBounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {status === "error" && (
                <svg
                  className="w-16 h-16 text-red-500 animate-scaleBounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
            <h2 className="text-lg font-semibold mb-2">Notifikasi</h2>
            <p className="text-gray-700 mb-6">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Animasi Modal Icon */}
      <style jsx>{`
        @keyframes scaleBounce {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-scaleBounce {
          animation: scaleBounce 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default ExchangeMoneyContent;
