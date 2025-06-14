import { useEffect, useState } from "react";

import { BsBell } from "react-icons/bs";
import { HiMiniXMark } from "react-icons/hi2";
import * as signalR from "@microsoft/signalr";
import axiosInstance from "../../Api/axiosInstance";

function Alerts() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("accessUsertoken");
  const [connection, setConnection] = useState(null);
  // const []
  const getAllNotification = async () => {
    try {
      const response = await axiosInstance.get(`Notifications/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });
      console.log(response.data.items);
      setNotifications(response.data.items);
      // setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllNotification();
  }, []);
  // useEffect(() => {
  //   const newConnection = new signalR.HubConnectionBuilder()
  //     .withUrl("http://localhost:5067/Notification", {
  //       accessTokenFactory: () => token,
  //     })
  //     .withAutomaticReconnect()
  //     .build();

  //   setConnection(newConnection);

  //   newConnection.on("ReceiveNotification", (notification) => {
  //     console.log("📢 إشعار جديد:", notification);
  //     alert(`📢 ${notification.Title}\n${notification.Message}`);
  //   });

  //   const startConnection = async () => {
  //     try {
  //       await newConnection.start();
  //       console.log("✅ Connected to SignalR Hub");
  //     } catch (err) {
  //       console.error("❌ Error connecting to SignalR:", err);
  //       setTimeout(startConnection, 5000); // حاول مرة ثانية بعد ٥ ثواني
  //     }
  //   };

  //   startConnection();

  //   // تنظيف الاتصال عند خروج الكمبوننت
  //   return () => {
  //     newConnection.stop();
  //   };
  // }, []);

  return (
    <div className="my-10 h-screen">
      <div className="container mx-auto px-3">
        <h2 className="text-[32px] font-normal text-[#021B1A]">Alerts</h2>
        <div className="my-10">
          {notifications.map((data) => (
            <div
              key={data.id}
              className="flex items-center gap-3 shadow-lg p-4 rounded-lg border-l-7 border-[#095544] justify-between"
            >
              <div className="flex items-center gap-3">
                <div className=" rounded-full bg-[#FEEDE8] p-4">
                  <BsBell className="text-[#FF0000]" size={24} />
                </div>
                <div>
                  <h3>{data.title}</h3>
                  <p>
                    {data.message}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[#707D7D] text-sm">10:00 AM</p>
                <button className=" px-4 py-2 rounded-lg">
                  <HiMiniXMark className="text-[#707D7D]" size={28} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Alerts;
