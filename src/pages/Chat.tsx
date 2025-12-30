import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/landing/Footer";
import {
  ArrowLeft,
  Send,
  Shield,
  User,
  Info,
  Loader2,
} from "lucide-react";
import { getGeminiResponse } from "../utils/gemini";

/* ---------------- Types ---------------- */

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

/* ---------------- Quick Actions ---------------- */

const quickActions = [
  "Someone is threatening me with screenshots",
  "A fake image of me is spreading online",
  "My account was hacked",
  "I need to know what to do first",
];

/* ---------------- Component ---------------- */

const Chat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
          "Hi, I’m here to help. This is a safe, judgment-free space.\n\nYou can tell me what’s happening, or choose one of the options below to get started. You’re not alone.",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  /* ---------------- Auto Scroll ---------------- */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ---------------- Send Message ---------------- */

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const aiReply = await getGeminiResponse(
          messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          messageText
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiReply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
              "Something went wrong while responding. Please try again in a moment.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  /* ---------------- Enter Key ---------------- */

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* ---------------- Render ---------------- */

  return (
      <>
        <Helmet>
          <title>Talk with Support - Digital Dignity Toolkit</title>
          <meta
              name="description"
              content="Private AI-guided support for digital harm. No tracking. No judgment."
          />
        </Helmet>

        <div className="min-h-screen bg-background flex flex-col">
          <Header />

          <main className="flex-1 pt-20 pb-4 flex flex-col">
            <div className="container max-w-3xl flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between py-4 border-b border-border/50">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/")}
                    className="-ml-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="font-semibold text-foreground">
                      Dignity Support
                    </h1>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      Online
                    </div>
                  </div>
                </div>

                <div className="w-20" />
              </div>

              {/* AI Disclosure */}
              <div className="flex items-center gap-2 p-3 my-4 rounded-xl bg-secondary/50 border border-border/50">
                <Info className="w-4 h-4 text-primary" />
                <p className="text-xs text-muted-foreground">
                  AI-assisted guidance only. No data is stored. Not a substitute for
                  professional or emergency help.
                </p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 py-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-start gap-3 ${
                            message.role === "user" ? "flex-row-reverse" : ""
                        }`}
                    >
                      <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.role === "user"
                                  ? "bg-primary/10"
                                  : "bg-gradient-to-br from-primary to-accent"
                          }`}
                      >
                        {message.role === "user" ? (
                            <User className="w-4 h-4 text-primary" />
                        ) : (
                            <Shield className="w-4 h-4 text-primary-foreground" />
                        )}
                      </div>

                      <div
                          className={`max-w-[80%] p-4 rounded-2xl text-sm whitespace-pre-wrap ${
                              message.role === "user"
                                  ? "bg-primary text-primary-foreground rounded-tr-md"
                                  : "bg-card border border-border/50 rounded-tl-md"
                          }`}
                      >
                        {message.content}
                      </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Shield className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="bg-card border border-border/50 rounded-2xl rounded-tl-md p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Thinking…
                        </div>
                      </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length === 1 && (
                  <div className="py-4 space-y-2">
                    <p className="text-xs text-muted-foreground text-center">
                      Quick options
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {quickActions.map((action) => (
                          <button
                              key={action}
                              onClick={() => handleSend(action)}
                              className="px-4 py-2 rounded-full bg-secondary/80 border border-border/50 text-sm hover:bg-primary/10 transition"
                          >
                            {action}
                          </button>
                      ))}
                    </div>
                  </div>
              )}

              {/* Input */}
              <div className="py-4 border-t border-border/50">
                <div className="flex items-center gap-3 p-2 rounded-2xl bg-card border border-border/50">
                  <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message…"
                      disabled={isTyping}
                      className="flex-1 bg-transparent px-3 py-2 focus:outline-none"
                  />
                  <Button
                      variant="hero"
                      size="icon"
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isTyping}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </>
  );
};

export default Chat;
