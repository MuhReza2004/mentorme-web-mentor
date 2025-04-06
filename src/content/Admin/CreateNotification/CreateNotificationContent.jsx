import React, { useState, useEffect } from 'react';
import { createNotification, getAllNotifications } from '../../../services/api'; // pastikan path-nya sesuai

const CreateNotificationContent = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    try {
      await createNotification(title, message);
      setSuccess('Notification created successfully!');
      setTitle('');
      setMessage('');
      fetchNotifications(); // refresh notifikasi setelah create
    } catch (error) {
      setSuccess('Failed to create notification.');
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = await getAllNotifications();
      setNotifications(data?.data || []); // pastikan sesuai struktur API kamu
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Generate Notifications</h1>

      <form onSubmit={handleSubmit} className="space-y-6 mb-10">
        <div>
          <label className="block font-semibold mb-1">Notifications Title</label>
          <input
            type="text"
            placeholder="Generate Code Here"
            className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Notifications Message</label>
          <textarea
            placeholder="Enter Message"
            className="w-full px-4 py-2 border rounded shadow-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-400 text-white font-semibold px-6 py-2 rounded hover:bg-teal-500 transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>

        {success && (
          <p className={`mt-4 font-medium ${success.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {success}
          </p>
        )}
      </form>

      {/* List All Notifications */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">All Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications available.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notif, index) => (
              <li key={index} className="border p-4 rounded shadow-sm">
                <h3 className="font-bold">{notif.title}</h3>
                <p className="text-gray-700 mt-1">{notif.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateNotificationContent;
