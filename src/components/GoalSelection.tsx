import React, { useState } from "react";
import { Search, ArrowLeft, Clock, Users, TrendingUp } from "lucide-react";
import { careerGoals } from "../data/careerGoals";
import type { CareerGoal } from "../types";

interface GoalSelectionProps {
  onBack: () => void;
  onGoalSelect: (goal: CareerGoal) => void;
}

export function GoalSelection({ onBack, onGoalSelect }: GoalSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(careerGoals.map((goal) => goal.category))),
  ];

  const filteredGoals = careerGoals.filter((goal) => {
    const matchesSearch =
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || goal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="min-h-screen 
  bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 
  dark:from-gray-900 dark:via-gray-800 dark:to-black 
  pt-16 transition-colors duration-500"
    >
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors dark:hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </button>

            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 dark:text-white">
                Choose Your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-1">
                  Career Goal
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select the career path you want to pursue, and we'll generate a
                personalized learning roadmap just for you.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search career paths..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Goals Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {filteredGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onClick={() => onGoalSelect(goal)}
              />
            ))}
          </div>

          {filteredGoals.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GoalCard({
  goal,
  onClick,
}: {
  goal: CareerGoal;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/20 hover:scale-105 hover:bg-white outline-none hover:outline-violet-500 "
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
          {goal.icon}
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <TrendingUp className="h-4 w-4" />
          <span>{goal.popularity}%</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {goal.title}
      </h3>

      <p className="text-gray-600 mb-4 leading-relaxed text-sm">
        {goal.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {goal.category}
        </span>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Users className="h-3 w-3" />
          <span>Popular</span>
        </div>
      </div>
    </div>
  );
}
