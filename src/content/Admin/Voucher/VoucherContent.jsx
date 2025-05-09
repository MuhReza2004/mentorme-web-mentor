import React, { useEffect, useState } from "react";
import {
  createVoucher,
  getAllVouchers,
  deleteVoucher,
} from "../../../services/api";

const VoucherContent = () => {
  const [vouchers, setVouchers] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    piece: "",
    startTime: "",
    endTime: "",
    info: "",
  });

  const fetchVouchers = async () => {
    const response = await getAllVouchers();
    if (response?.data) setVouchers(response.data);
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVoucher({
        ...form,
        piece: parseInt(form.piece),
        startTime: parseInt(form.startTime),
        endTime: parseInt(form.endTime),
      });
      alert("Voucher berhasil dibuat!");
      setForm({ name: "", piece: "", startTime: "", endTime: "", info: "" });
      fetchVouchers(); // Refresh the voucher list after creating a new one
    } catch (err) {
      alert("Gagal membuat voucher. Silakan coba lagi.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus voucher ini?")) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteVoucher(id);
      // Optimistic update - langsung hapus dari state tanpa menunggu response
      setVouchers(vouchers.filter((voucher) => voucher.ID !== id));
      alert("Voucher berhasil dihapus!");
    } catch (err) {
      setDeleteError("Gagal menghapus voucher. Silakan coba lagi.");

      // Jika gagal, muat ulang data asli
      fetchVouchers();
    } finally {
      setIsDeleting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
  };

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ marginBottom: "16px" }}>Buat Voucher Baru</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
          <div>
            <label>Nama Voucher</label>
            <br />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label>Potongan (%)</label>
            <br />
            <input
              type="number"
              name="piece"
              value={form.piece}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label>Hari Mulai (0 = Now)</label>
            <br />
            <input
              type="number"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              min={0}
              max={6}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label>Hari Berakhir (0 = Now)</label>
            <br />
            <input
              type="number"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              min={0}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label>Deskripsi Voucher</label>
            <br />
            <textarea
              name="info"
              value={form.info}
              onChange={handleChange}
              rows="3"
              required
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Simpan Voucher
          </button>
        </form>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "16px" }}>Daftar Voucher</h2>
        {vouchers.length === 0 ? (
          <p>Tidak ada voucher.</p>
        ) : (
          vouchers.map((voucher) => (
            <div
              key={voucher.ID}
              style={{
                border: "1px solid #eee",
                borderRadius: "6px",
                padding: "12px",
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{voucher.name}</strong>
                <p style={{ margin: 0 }}>
                  Potongan: {voucher.piece}%<br />
                  {voucher.info}
                  <br />
                  Berlaku: {new Date(
                    voucher.dateStart
                  ).toLocaleDateString()} -{" "}
                  {new Date(voucher.dateEnd).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(voucher.ID)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Hapus
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VoucherContent;
