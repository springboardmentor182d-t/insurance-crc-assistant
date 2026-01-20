// client/src/features/notifications/components/NotificationList.js

import { useNotifications } from "../hooks/useNotifications";
import { markAsRead } from "../services/markAsRead";

export default function NotificationList() {
  const { notifications, loading, fetchNotifications } = useNotifications();

  const handleRead = async (id) => {
    await markAsRead(id);
    fetchNotifications();
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Notifications</h1>

      {notifications.length === 0 && (
        <div className="text-gray-500">No notifications yet.</div>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 mb-3 border rounded ${
            n.is_read ? "bg-gray-100" : "bg-white"
          }`}
        >
          <div className="font-medium">{n.title}</div>
          <div className="text-sm text-gray-600">{n.message}</div>
          <div className="text-xs text-gray-400 mt-1">
            {new Date(n.created_at).toLocaleString()}
          </div>

          {!n.is_read && (
            <button
              onClick={() => handleRead(n.id)}
              className="text-blue-500 text-xs mt-2"
            >
              Mark as read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

