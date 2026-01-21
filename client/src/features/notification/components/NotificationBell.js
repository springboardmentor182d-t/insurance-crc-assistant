// client/src/features/notifications/components/NotificationBell.js

import { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { markAsRead } from "../services/markAsRead";

export default function NotificationBell() {
  const { notifications, unreadCount, fetchNotifications } = useNotifications();
  const [open, setOpen] = useState(false);

  const handleRead = async (id) => {
    await markAsRead(id);
    fetchNotifications();
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2 font-semibold border-b">Notifications</div>

          {notifications.length === 0 && (
            <div className="p-3 text-sm text-gray-500">
              No notifications
            </div>
          )}

          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 border-b text-sm ${
                n.is_read ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="font-medium">{n.title}</div>
              <div className="text-gray-600">{n.message}</div>
              {!n.is_read && (
                <button
                  onClick={() => handleRead(n.id)}
                  className="text-blue-500 text-xs mt-1"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}