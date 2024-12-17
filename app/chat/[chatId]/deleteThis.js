"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChatBubble } from "@/components/Chatbot/ChatUI";
import { AddMessageToChat, GetChatHistory } from "@/actions/chat.action";

const ChatPage = () => {
  const { chatId } = useParams();
  const [chatHistory, setChatHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await GetChatHistory(chatId);
        setChatHistory(history);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchHistory();
  
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      role: "user",
      content: inputValue,
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Add user's message to the chat in the database
      await AddMessageToChat(chatId, userMessage);

      // Simulate chatbot response for this example
      const botMessage = {
        role: "model",
        content: "This is the chatbot's response",
      };

      setChatHistory((prev) => [...prev, botMessage]);
      await AddMessageToChat(chatId, botMessage);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
    setInputValue("");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <ScrollArea className="w-[70%] h-[90%] pb-4">
        <div className="w-full h-full flex flex-col gap-6">
          {chatHistory.map((msg, index) => (
            <ChatBubble key={index} variant={msg.role}>
              {msg.content}
            </ChatBubble>
          ))}
          {loading && (
            <ChatBubble variant="model">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full animate-ping" />
                <span>Thinking...</span>
              </div>
            </ChatBubble>
          )}
        </div>
        <ScrollBar />
      </ScrollArea>

      <div className="w-full h-[10%] pt-2 flex justify-center items-start">
        <div className="w-[70%] relative flex gap-2">
          <Input
            placeholder="Type your message here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={loading}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
