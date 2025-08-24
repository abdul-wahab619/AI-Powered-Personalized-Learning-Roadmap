import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { GoalSelection } from "./components/GoalSelection";
import { LoadingScreen } from "./components/LoadingScreen";
import { RoadmapView } from "./components/RoadmapView";
import { Dashboard } from "./components/Dashboard";
import { ChatInterface } from "./components/ChatInterface";
import type { CareerGoal, LearningPath } from "./types";
import Footer from "./components/Footer";

type ViewType =
  | "landing"
  | "goals"
  | "loading"
  | "roadmap"
  | "dashboard"
  | "chat";

function App() {
  const [currentView, setCurrentView] = useState<ViewType>("landing");
  const [selectedGoal, setSelectedGoal] = useState<CareerGoal | null>(null);
  const [generatedPath, setGeneratedPath] = useState<LearningPath | null>(null);
  const [savedPaths, setSavedPaths] = useState<LearningPath[]>([]);

  const handleNavigate = (view: string) => {
    setCurrentView(view as ViewType);
    if (view === "landing") {
      setSelectedGoal(null);
      setGeneratedPath(null);
    }
  };

  const handleGetStarted = () => {
    setCurrentView("goals");
  };

  const handleStartChat = () => {
    setCurrentView("chat");
  };

  const handleGoalSelect = (goal: CareerGoal) => {
    setSelectedGoal(goal);
    setCurrentView("loading");

    // Simulate loading for goal-based generation
    setTimeout(() => {
      // This would normally call the Gemini API, but for goal selection we'll use mock data
      const mockPath = createMockPath(goal);
      setGeneratedPath(mockPath);
      setCurrentView("roadmap");
    }, 3000);
  };

  const handleRoadmapGenerated = (roadmap: LearningPath) => {
    setGeneratedPath(roadmap);
    setCurrentView("roadmap");
  };

  const handleSavePath = (path: LearningPath) => {
    setSavedPaths((prev) => {
      const existing = prev.find((p) => p.id === path.id);
      if (existing) {
        return prev.map((p) => (p.id === path.id ? path : p));
      }
      return [...prev, path];
    });
  };

  const handleUpdateProgress = (pathId: string, updatedPath: LearningPath) => {
    setSavedPaths((prev) =>
      prev.map((p) => (p.id === pathId ? updatedPath : p))
    );
  };

  const handleViewPath = (path: LearningPath) => {
    setGeneratedPath(path);
    setCurrentView("roadmap");
  };

  const handleBackToGoals = () => {
    setCurrentView("goals");
    setGeneratedPath(null);
  };

  // Mock path generator for goal selection (fallback)
  const createMockPath = (goal: CareerGoal): LearningPath => {
    return {
      id: `mock-${Date.now()}`,
      title: goal.title,
      description: goal.description,
      duration: 6,
      difficulty: "Intermediate" as const,
      phases: [
        {
          id: "phase-1",
          title: "Foundation & Basics",
          duration: 4,
          skills: ["Fundamentals", "Core Concepts", "Best Practices"],
          resources: [
            {
              title: "Getting Started Guide",
              type: "documentation",
              url: "https://example.com",
            },
            {
              title: "Introduction Course",
              type: "course",
              url: "https://example.com",
            },
          ],
          project: "Build a basic project to demonstrate fundamental skills",
          completed: false,
        },
      ],
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  switch (currentView) {
    case "landing":
      return (
        <>
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            savedPathsCount={savedPaths.length}
          />
          <LandingPage
            onGetStarted={handleGetStarted}
            onStartChat={handleStartChat}
          />
          <Footer />
        </>
      );

    case "goals":
      return (
        <>
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            savedPathsCount={savedPaths.length}
          />
          <GoalSelection
            onBack={() => handleNavigate("landing")}
            onGoalSelect={handleGoalSelect}
          />
          <Footer />
        </>
      );

    case "chat":
      return (
        <>
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            savedPathsCount={savedPaths.length}
          />
          <ChatInterface
            onBack={() => handleNavigate("landing")}
            onRoadmapGenerated={handleRoadmapGenerated}
          />
        </>
      );

    case "loading":
      return <LoadingScreen />;

    case "roadmap":
      return generatedPath ? (
        <>
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            savedPathsCount={savedPaths.length}
          />
          <RoadmapView
            roadmap={generatedPath}
            onBack={handleBackToGoals}
            onSave={handleSavePath}
            onViewDashboard={() => handleNavigate("dashboard")}
          />
        </>
      ) : null;

    case "dashboard":
      return (
        <>
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            savedPathsCount={savedPaths.length}
          />
          <Dashboard
            savedPaths={savedPaths}
            onBack={() => handleNavigate("landing")}
            onViewPath={handleViewPath}
            onUpdateProgress={handleUpdateProgress}
          />
          <Footer />
        </>
      );

    default:
      return (
        <>
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            savedPathsCount={savedPaths.length}
          />
          <LandingPage
            onGetStarted={handleGetStarted}
            onStartChat={handleStartChat}
          />
        </>
      );
  }
}

export default App;
