import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
import { useState, useEffect } from "react";

const DashNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notification");
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchCustomNotifications = async () => {
      try {
        const response = await axios.get("/api/custom-notifications");
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...response.data,
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomNotifications();
  }, []);

  return (
    <div className="w-full p-6 rounded-lg shadow-md">
      <h2 className="mb-4 text-3xl font-semibold drop-shadow-sm">
        Notifications
      </h2>
      <div className="flex flex-col gap-4">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className={`relative px-4 py-3 text-${
              notification.type === "comment" ? "blue" : "green"
            }-700 bg-${
              notification.type === "comment" ? "blue" : "green"
            }-100 border border-${
              notification.type === "comment" ? "blue" : "green"
            }-400 rounded`}
            role="alert"
          >
            <strong className="font-bold">
              {notification.type === "comment" ? "New Comment" : "New Like"}
            </strong>
            <span className="block sm:inline">
              {notification.type === "comment"
                ? `You have a new comment on your post "${notification.post.title}"`
                : `Someone liked your post "${notification.post.title}"`}
            </span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <HiOutlineExclamationCircle
                className={`w-6 h-6 text-${
                  notification.type === "comment" ? "blue" : "green"
                }-500`}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashNotifications;
