import React, { useState } from "react";
import {
  BookOpen,
  Home,
  Target,
  BarChart3,
  MessageCircle,
  User,
  Moon,
  Sun,
  Menu,
} from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";

export function Navbar() {
  const navItems = [
    { id: "/", label: "Home", icon: Home },
    { id: "goals", label: "Goals", icon: Target },
    { id: "aichat", label: "AI Chat", icon: MessageCircle },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  ];
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50
  bg-white/80 dark:bg-gray-900/80
  backdrop-blur-md
  border-b border-gray-200 dark:border-gray-700
  shadow-sm transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LearnPath AI
                </h1>
              </div>
            </div>
          </NavLink>

          {/* Navigation Items */}

          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:space-x-1 absolute sm:static top-16 left-0 w-full sm:w-auto
    bg-white dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent transition-all duration-300 ${
      isMobileMenuOpen ? "block" : "hidden sm:flex"
    }`}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.id}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 dark:text-white/80 ${
                      isActive
                        ? "bg-blue-100 text-blue-700 shadow-sm dark:bg-blue-500"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-400"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{item.label}</span>{" "}
                  {/* always visible */}
                </NavLink>
              );
            })}
          </div>

          <button
            onClick={toggleTheme}
            className="w-16 h-8 flex items-center rounded-full border-2 border-black  dark:border-white p-1 transition-all duration-300 "
          >
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full  text-black transform transition-all duration-300 ${
                theme === "dark"
                  ? "translate-x-8 text-white"
                  : "translate-x-0 bg-yellow-50  "
              }`}
            >
              {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            </div>
          </button>

          {/* User Profile */}
          <div className="flex items-center">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors dark:text-white/80 dark:hover:bg-gray-400">
              <User className="h-5 w-5" />
            </button>
          </div>
          {/* Hamburger Menu for small screens */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu size={24} className="text-gray-700 dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
