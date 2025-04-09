import { useEffect, useState } from "react";
import { getAllNotifications } from "../../services/api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const NotificationContent = () => {
    const [notifications, setNotifications] = useState([]);
    const [openIndexes, setOpenIndexes] = useState([]);
  
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await getAllNotifications(); // sesuaikan dengan API kamu
          if (response && response.data) {
            setNotifications(response.data);
            console.log("Notifications:", response.data);
          }
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      };
  
      fetchNotifications();
    }, []);
  
    const toggleDropdown = (index) => {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    };

    return (
        <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
  
        {notifications.map((notif, index) => (
          <div
            key={notif.id || index}
            className="border rounded-lg p-4 mb-4 bg-white shadow"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleDropdown(index)}
            >
              <h3 className="font-semibold">
                {notif.title || "Notifikasi"}
              </h3>
              {openIndexes.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
            </div>
  
            {openIndexes.includes(index) && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-700">{notif.message}</p>
  
                {notif.image && (
                  <img
                    src={notif.image}
                    alt="notification"
                    className="rounded-lg mt-2 w-full h-auto"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
}

export default NotificationContent;