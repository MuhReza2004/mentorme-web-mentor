import { useState } from "react";
import { PostExchangeMoney } from "../../../services/api";

const ExchangeMoneyContent = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    money: "",
    accountNumber: "",
    bank: "",
  });
  const [formattedMoney, setFormattedMoney] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");

  const formatRupiah = (value) => {
    const number = value.replace(/\D/g, "");
    return new Intl.NumberFormat("id-ID").format(number);
  };

  const handleMoneyChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, money: raw });
    setFormattedMoney(formatRupiah(raw));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(formData.money) < 100000) {
      setModalMessage("Jumlah minimum penukaran adalah Rp100.000");
      setStatus("error");
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      const response = await PostExchangeMoney(formData);
      if (response?.code === 200) {
        setStatus("success");
        setModalMessage("Penukaran berhasil! Silakan tunggu 1x24 jam.");
        setFormData({ money: "", accountNumber: "", bank: "" });
        setFormattedMoney("");
      } else {
        throw new Error("Gagal melakukan penukaran.");
      }
    } catch (err) {
      setStatus("error");
      setModalMessage(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
      setShowModal(true);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          💸 Penukaran Saldo
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Jumlah Penukaran
            </label>
            <input
              type="text"
              name="money"
              placeholder="Minimum Rp100.000"
              value={formattedMoney}
              onChange={handleMoneyChange}
              className="w-full border rounded px-4 py-2 focus:outline-green-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Nomor Rekening / E-Wallet
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-green-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Bank / E-Wallet
            </label>
            <select
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-green-500"
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Memproses..." : "Ajukan Penukaran"}
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <div className="flex justify-center mb-4">
              {status === "success" ? (
                <span className="text-green-500 text-4xl">✅</span>
              ) : (
                <span className="text-red-500 text-4xl">❌</span>
              )}
            </div>
            <h3 className="text-lg font-bold mb-2">Notifikasi</h3>
            <p className="text-gray-700 mb-4">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeMoneyContent;
