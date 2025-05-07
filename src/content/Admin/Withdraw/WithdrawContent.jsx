import React, { useState, useEffect } from "react";
import {
  GetWithdrawAdmin,
  UpdateWithdrawalStatus,
} from "../../../services/api";

const WithdrawContent = () => {
  const [withdrawData, setWithdrawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStatus, setUpdateStatus] = useState({
    loading: false,
    id: null,
    error: null,
  });
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchWithdrawData = async () => {
    try {
      setIsLoading(true);
      const response = await GetWithdrawAdmin();
      if (response === null) {
        // Handle null response specifically
        setWithdrawData([]);
        setError(null);
      } else if (response.error) {
        setError(response.error);
      } else {
        setWithdrawData(response.data || []);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch withdrawal data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawData();
  }, []);

  // Format date from "2025-05-02T13:00:37.000Z" to more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Format currency to IDR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Get status badge class based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdateStatus({ loading: true, id, error: null });
      const response = await UpdateWithdrawalStatus(id, newStatus);

      if (response.error) {
        setUpdateStatus({ loading: false, id: null, error: response.error });
      } else {
        // Update local state
        setWithdrawData((prevData) =>
          prevData.map((item) =>
            item.ID === id ? { ...item, status: newStatus } : item
          )
        );
        setUpdateStatus({ loading: false, id: null, error: null });
        setShowStatusModal(false);
      }
    } catch (err) {
      setUpdateStatus({
        loading: false,
        id: null,
        error: "Failed to update status",
      });
    }
  };

  // Open status modal
  const openStatusModal = (item) => {
    setSelectedItem(item);
    setShowStatusModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
        <p>{error}</p>
        <button
          onClick={fetchWithdrawData}
          className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Withdrawal History
        </h1>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-black-700">
            Track all withdrawal transactions. Manage and monitor the status of
            each request.
          </p>
        </div>

        {withdrawData.length === 0 ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              <p className="mt-2 text-lg font-medium text-gray-900">
                Belum ada Permintaan Withdraw
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Withdrawal data akan muncul di sini ketika ada permintaan
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mentor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {withdrawData.map((item) => (
                  <tr key={item.ID} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.ID.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.time)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-md bg-purple-100 text-purple-800">
                        {item.bank}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(item.moneyMe)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(item.totalMoney)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-md ${getStatusBadgeClass(
                          item.status
                        )}`}
                      >
                        {updateStatus.loading && updateStatus.id === item.ID ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-3 w-3 text-current"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Updating...
                          </span>
                        ) : (
                          item.status
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {item.mentor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => openStatusModal(item)}
                        className="text-indigo-600 hover:text-indigo-900"
                        disabled={updateStatus.loading}
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {withdrawData.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <p>
                Request ID:{" "}
                <span className="font-mono">
                  {withdrawData.length > 0 ? withdrawData[0].idRequest : "N/A"}
                </span>
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={fetchWithdrawData}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Refresh"}
              </button>
            </div>
          </div>
        )}

        {withdrawData.length === 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={fetchWithdrawData}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Refresh"}
            </button>
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                Update Withdrawal Status
              </h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  ID: <span className="font-mono">{selectedItem.ID}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Current Status:
                  <span
                    className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-md ${getStatusBadgeClass(
                      selectedItem.status
                    )}`}
                  >
                    {selectedItem.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Amount:{" "}
                  <span className="font-semibold">
                    {formatCurrency(selectedItem.moneyMe)}
                  </span>
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Select New Status:
                </p>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() =>
                      handleStatusChange(selectedItem.ID, "PENDING")
                    }
                    className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-4 py-2 rounded hover:bg-yellow-200"
                    disabled={
                      selectedItem.status === "PENDING" || updateStatus.loading
                    }
                  >
                    PENDING
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(selectedItem.ID, "ACCEPTED")
                    }
                    className="bg-green-100 text-green-800 border border-green-200 px-4 py-2 rounded hover:bg-green-200"
                    disabled={
                      selectedItem.status === "ACCEPTED" || updateStatus.loading
                    }
                  >
                    ACCEPTED
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(selectedItem.ID, "REJECTED")
                    }
                    className="bg-red-100 text-red-800 border border-red-200 px-4 py-2 rounded hover:bg-red-200"
                    disabled={
                      selectedItem.status === "REJECTED" || updateStatus.loading
                    }
                  >
                    REJECTED
                  </button>
                </div>
              </div>

              {updateStatus.error && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-sm text-red-700">{updateStatus.error}</p>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="bg-white border text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-50"
                  disabled={updateStatus.loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast for successful updates (optional) */}
      {updateStatus.success && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
          Status updated successfully
        </div>
      )}
    </div>
  );
};

export default WithdrawContent;
