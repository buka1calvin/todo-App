import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiMicrophoneOn } from "react-icons/ci";
import { BsSendFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

interface Message {
  img: string;
  user: string;
  content: string;
  time: string;
}

const ChatRoom: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      img: "https://randomuser.me/api/portraits/women/1.jpg",
      user: "Rebeca Hosty",
      content: "Have a great working week!",
      time: "12:34 AM",
    },
    {
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      user: "Devid Mackurat",
      content: "What do you think about the new Team Section?",
      time: "12:35 AM",
    },
    {
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      user: "Kate Watson",
      content: "Okay, thanks for the tips!",
      time: "12:36 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          img: "https://randomuser.me/api/portraits/men/2.jpg",
          user: t("dashboard.chatRoom.you"),
          content: newMessage,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-white/10 rounded-lg h-full max-h-[450px] my-5">
      <div className="flex items-center justify-between border-b p-4 border-gray-100">
        <div className="flex items-end gap-2 text-xs">
          <h2 className="text-base font-semibold dark:text-white">
            {t("dashboard.chatRoom.title")}
          </h2>
          <p className="text-gray-400 mb-[2px]">
            {t("dashboard.chatRoom.date")}
          </p>
        </div>
        <BiDotsVerticalRounded className="text-gray-500" />
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto h-72 p-4 rounded-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              msg.user === t("dashboard.chatRoom.you") ? "justify-end" : ""
            }`}
          >
            {msg.user === t("dashboard.chatRoom.you") && (
              <img src={msg.img} className="w-5 h-5 rounded-full bg-gray-300" />
            )}
            <div
              className={`flex flex-col dark:text-white ${
                msg.user === t("dashboard.chatRoom.you") ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`flex ${
                  msg.user === t("dashboard.chatRoom.you") ? "" : "flex-row-reverse"
                } items-center gap-2 mb-1`}
              >
                <span className="text-xs font-semibold">{msg.user}</span>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p
                className={`text-xs rounded-md p-2 max-w-[200px] text-gray-600 ${
                  msg.user === t("dashboard.chatRoom.you") ? "bg-purple-100" : "bg-slate-100"
                }`}
              >
                {msg.content}
              </p>
            </div>
            {msg.user !== t("dashboard.chatRoom.you") && (
              <img src={msg.img} className="w-5 h-5 rounded-full bg-gray-300" />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-auto relative bg-gray-100 dark:bg-white/15 mx-2 mb-2 rounded-md text-sm">
        <input
          type="text"
          placeholder={t("dashboard.chatRoom.placeholder")}
          className="flex-1 p-2 pr-9 rounded-md w-full bg-transparent dark:text-white font-light"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <CiMicrophoneOn
          className="absolute right-14 text-gray-500 dark:text-gray-200 cursor-pointer"
          size={20}
        />
        <div className="h-4 w-[1px] bg-gray-300"></div>
        <button
          onClick={handleSendMessage}
          className="py-2 pl-1 text-primary pr-4"
        >
          <BsSendFill />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
