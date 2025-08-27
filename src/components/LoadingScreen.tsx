import React from "react";
import { Brain, Sparkles } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center ">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></div>
          </div>
          <div className="relative w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Brain className="h-12 w-12 text-white animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600 animate-spin" />
            AI is crafting your roadmap
            <Sparkles className="h-6 w-6 text-blue-600 animate-spin" />
          </h2>

          <div className="space-y-2">
            <div className="flex items-center text-gray-600 justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce mr-2"></div>
              <span className="text-sm">Analyzing your career goal...</span>
            </div>
            <div className="flex items-center text-gray-600 justify-center animation-delay-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce mr-2"></div>
              <span className="text-sm">Curating learning resources...</span>
            </div>
            <div className="flex items-center text-gray-600 justify-center animation-delay-400">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce mr-2"></div>
              <span className="text-sm">
                Building your personalized roadmap...
              </span>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse loading-bar"></div>
          </div>
        </div>
      </div>

      <style>{`
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .loading-bar {
          animation: loading 2s ease-in-out infinite;
        }
        @keyframes loading {
          0% { width: 0% }
          50% { width: 75% }
          100% { width: 100% }
        }
      `}</style>
    </div>
  );
}
