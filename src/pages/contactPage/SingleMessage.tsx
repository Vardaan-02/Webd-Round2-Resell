import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizontal } from "lucide-react";
import DisplayContact from "./DisplayContact";
import { dummyConversation } from "@/lib/conversation";
import { useParams } from "react-router-dom";
import { Message } from "@/types/Message";

export default function MessageArea() {
  const { tag } = useParams();

  const initialValue = window.localStorage.getItem(`message/${tag}`);

  const [messages, setMessages] = useState(
    initialValue ? JSON.parse(initialValue) : dummyConversation
  );
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
    window.localStorage.setItem(`message/${tag}`, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const messageList = window.localStorage.getItem(`message/${tag}`);
    setMessages(messageList ? JSON.parse(messageList) : initialValue);
  },[tag]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, sender: "user" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-full bg-background text-foreground overflow-hidden">
      <div
        className="flex flex-col w-full h-full pt-24"
        style={{ marginLeft: "240px" }}
      >
        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`flex items-start max-w-[70%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={
                      message.sender === "user"
                        ? "/placeholder.svg?height=32&width=32"
                        : "/placeholder.svg?height=32&width=32"
                    }
                  />
                  <AvatarFallback>
                    {message.sender === "user" ? "U" : "S"}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`mx-2 p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="text-sm md:text-base">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-border"
        >
          <div className="flex justify-between">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="mr-2 min-w-[1300px] h-12"
              ref={inputRef}
            />
            <Button type="submit" size="icon" className="h-12 w-12">
              <SendHorizontal className="h-6 w-6" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
      </div>
      <DisplayContact />
    </div>
  );
}
