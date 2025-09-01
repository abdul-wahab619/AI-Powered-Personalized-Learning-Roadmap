import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generateChatResponse, generateLearningPath } from "../services/gemini";
import type { LearningPath } from "../types";
import { NavLink } from "react-router-dom";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isGeneratingRoadmap?: boolean;
}

// interface ChatInterfaceProps {
//   onBack: () => void;
//   onRoadmapGenerated: (roadmap: LearningPath) => void;
// }

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: `# Welcome to LearnPath AI! 🚀

I'm your personal learning assistant. I can help you with:

- **Generate Learning Roadmaps** - Just tell me what career you want to pursue
- **Answer Questions** - Ask about any technology, skill, or career path
- **Study Guidance** - Get tips on how to learn effectively
- **Resource Recommendations** - Find the best free courses and tutorials

**Try asking me something like:**
- "I want to become a Frontend Developer"
- "How do I learn Python for data science?"
- "What skills do I need for cybersecurity?"

What would you like to learn today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Check if user is asking for a roadmap
      const isRoadmapRequest =
        /(?:become|learn|roadmap|path|career|want to be|how to be).*(?:developer|engineer|analyst|scientist|designer|manager)/i.test(
          inputValue
        );

      if (isRoadmapRequest) {
        // Extract career goal
        const careerMatch = inputValue.match(
          /(?:become|be|learn|roadmap for|path for)\s+(?:a\s+)?([^.!?]+)/i
        );
        const careerGoal = careerMatch ? careerMatch[1].trim() : inputValue;

        const loadingMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content:
            "🤖 **Generating your personalized learning roadmap...**\n\nThis might take a moment as I analyze the best learning path for you!",
          timestamp: new Date(),
          isGeneratingRoadmap: true,
        };

        setMessages((prev) => [...prev, loadingMessage]);

        try {
          const roadmapData = await generateLearningPath(careerGoal);

          // Convert to our LearningPath format
          const learningPath: LearningPath = {
            id: `roadmap-${Date.now()}`,
            title: roadmapData.goal,
            description: roadmapData.description,
            duration: roadmapData.duration_months,
            difficulty: roadmapData.difficulty,
            phases: roadmapData.phases.map((phase, index) => ({
              id: `phase-${index + 1}`,
              title: phase.title,
              duration: phase.duration_weeks,
              skills: phase.skills,
              resources: phase.resources,
              project: phase.project,
              completed: false,
            })),
            progress: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          const successMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: "bot",
            content: `# 🎉 Your ${roadmapData.goal} Roadmap is Ready!

**Duration:** ${roadmapData.duration_months} months  
**Difficulty:** ${roadmapData.difficulty}  
**Phases:** ${roadmapData.phases.length}

${roadmapData.description}

**Your learning journey includes:**
${roadmapData.phases
  .map(
    (phase, index) =>
      `${index + 1}. **${phase.title}** (${phase.duration_weeks} weeks)`
  )
  .join("\n")}

Click the button below to view your complete roadmap with resources and projects!`,
            timestamp: new Date(),
          };

          setMessages((prev) =>
            prev
              .filter((msg) => !msg.isGeneratingRoadmap)
              .concat([successMessage])
          );

          // Trigger roadmap view
          // setTimeout(() => {
          //   onRoadmapGenerated(learningPath);
          // }, 1000);
        } catch (error) {
          const errorMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: "bot",
            content:
              '❌ **Sorry, I encountered an error generating your roadmap.**\n\nPlease try rephrasing your request or try again in a moment. You can ask something like:\n- "I want to become a Frontend Developer"\n- "Create a roadmap for Data Science"',
            timestamp: new Date(),
          };

          setMessages((prev) =>
            prev
              .filter((msg) => !msg.isGeneratingRoadmap)
              .concat([errorMessage])
          );
        }
      } else {
        // Regular chat response
        const response = await generateChatResponse(inputValue);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </NavLink>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 dark:text-white">
              AI Learning Assistant
            </h1>
            <p className="text-lg text-gray-600 dark:text-white/60">
              Ask me anything about your learning journey
            </p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "bot" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.type === "bot" ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-lg font-bold mb-2 text-gray-900">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-base font-semibold mb-2 text-gray-800">
                              {children}
                            </h2>
                          ),
                          p: ({ children }) => (
                            <p className="mb-2 text-gray-700 leading-relaxed">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside mb-2 text-gray-700">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside mb-2 text-gray-700">
                              {children}
                            </ol>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-gray-900">
                              {children}
                            </strong>
                          ),
                          code: ({ children }) => (
                            <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono">
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}

                  <div
                    className={`text-xs mt-2 ${
                      message.type === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {message.type === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about any career path or learning topic..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
