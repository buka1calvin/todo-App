import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiMicrophoneOn } from "react-icons/ci";
import { BsSendFill } from "react-icons/bs";

interface Message {
  user: string;
  content: string;
  time: string;
}

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      user: "Rebeca Hosty",
      content: "Have a great working week!",
      time: "12:34 AM",
    },
    {
      user: "Devid Mackurat",
      content: "What do you think about the new Team Section?",
      time: "12:35 AM",
    },
    {
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
          user: "You",
          content: newMessage,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg h-full max-h-[450px] my-5">
      <div className="flex items-center justify-between border-b p-4 border-gray-100">
        <div className="flex items-end gap-2 text-xs">
          <h2 className="text-base font-semibold">TeamChat</h2>
          <p className="text-gray-400 mb-[2px]">24 April 2024</p>
        </div>
        <BiDotsVerticalRounded className="text-gray-500" />
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto h-72 p-4 rounded-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              msg.user === "You" ? "justify-end" : ""
            }`}
          >
            {msg.user === "You" && (
              <div className="w-5 h-5 rounded-full bg-gray-300"></div>
            )}
            <div
              className={`flex flex-col ${
                msg.user === "You" ? "items-end" : "items-start"
              }`}
            >
              <div className={`flex ${msg.user === "You" ? "" : "flex-row-reverse"} items-center gap-2 mb-1`}>
                <span className="text-xs font-semibold">{msg.user}</span>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p
                className={`text-xs rounded-md p-2 max-w-[200px] ${
                  msg.user === "You" ? "bg-purple-100" : "bg-slate-100 text-gray-600"
                }`}
              >
                {msg.content}
              </p>
            </div>
            {msg.user !== "You" && (
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-auto relative bg-gray-100 rounded-md text-sm">
        <input
          type="text"
          placeholder="Your messages..."
          className="flex-1 p-2 pr-9 rounded-md w-full bg-transparent font-light"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <CiMicrophoneOn className="absolute right-14 text-gray-500 cursor-pointer" size={20} />
        <div className="h-4 w-[1px] bg-gray-300"></div>
        <button
          onClick={handleSendMessage}
          className="py-2 pl-1 text-primary pr-4"
        >
          <BsSendFill/>
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
