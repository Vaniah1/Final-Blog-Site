import { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  const toggleChat = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setMessages([]); // Clear messages when opening
    }
    setError(""); // Clear any previous error when opening the chat
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("/generate", {
        input,
      });
      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      console.log("Response successful");
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Error generating text. Please try again.");
    }

    setInput("");
  };

  return (
    <div>
      <button
        onClick={toggleChat}
        className="fixed z-50 p-3 text-white bg-blue-500 rounded-full shadow-lg bottom-4 right-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {isVisible ? "Close Chat" : "Open Chat"}
      </button>
      {isVisible && (
        <div className="fixed z-50 w-full max-w-md p-4 bg-white border rounded-lg shadow-lg bottom-16 right-4">
          <div className="h-64 p-2 mb-4 overflow-y-scroll border rounded-lg">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-200 text-right"
                    : "bg-green-200 text-left"
                }`}
              >
                <span className="block font-bold">
                  {msg.sender === "user" ? "You" : "ChatBot"}
                </span>
                {msg.text}
              </div>
            ))}
          </div>
          {error && (
            <div className="mb-4 text-center text-red-500">{error}</div>
          )}
          <div className="flex">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
            />
            <button
              className="p-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-700"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
