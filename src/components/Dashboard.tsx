import React from "react";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  Target,
  CheckCircle2,
  Award,
  Flame,
  Star,
} from "lucide-react";
import type { LearningPath } from "../types";

interface DashboardProps {
  savedPaths: LearningPath[];
  onBack: () => void;
  onViewPath: (path: LearningPath) => void;
  onUpdateProgress: (pathId: string, updatedPath: LearningPath) => void;
}

export function Dashboard({
  savedPaths,
  onBack,
  onViewPath,
  onUpdateProgress,
}: DashboardProps) {
  const totalPaths = savedPaths.length;
  const completedPaths = savedPaths.filter(
    (path) => path.progress === 100
  ).length;
  const inProgressPaths = savedPaths.filter(
    (path) => path.progress > 0 && path.progress < 100
  ).length;
  const avgProgress =
    totalPaths > 0
      ? Math.round(
          savedPaths.reduce((sum, path) => sum + path.progress, 0) / totalPaths
        )
      : 0;
  const totalCompletedPhases = savedPaths.reduce(
    (sum, path) => sum + path.phases.filter((phase) => phase.completed).length,
    0
  );
  const currentStreak = calculateStreak(savedPaths);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16 dark:from-gray-900 dark:via-gray-800 dark:to-black">
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
              Your Learning
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-1">
                Dashboard
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white/80">
              Track your progress, manage your learning paths, and celebrate
              your achievements.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={<BookOpen className="h-6 w-6" />}
            title="Total Paths"
            value={totalPaths}
            color="blue"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="In Progress"
            value={inProgressPaths}
            color="purple"
          />
          <StatCard
            icon={<CheckCircle2 className="h-6 w-6" />}
            title="Completed"
            value={completedPaths}
            color="green"
          />
          <StatCard
            icon={<Target className="h-6 w-6" />}
            title="Avg Progress"
            value={`${avgProgress}%`}
            color="orange"
          />
          <StatCard
            icon={<Award className="h-6 w-6" />}
            title="Phases Done"
            value={totalCompletedPhases}
            color="indigo"
          />
        </div>

        {/* Achievement Section */}
        {completedPaths > 0 && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  Congratulations! 🎉
                </h3>
                <p className="text-green-100">
                  You've completed {completedPaths} learning path
                  {completedPaths > 1 ? "s" : ""}!
                  {currentStreak > 0 &&
                    ` You're on a ${currentStreak}-day learning streak!`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{completedPaths}</div>
                <div className="text-sm text-green-100">Completed</div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Paths */}
        {savedPaths.length > 0 ? (
          <div className="space-y-6 ">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Learning Paths
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Flame className="h-4 w-4 text-orange-500" />
                <span>{currentStreak} day streak</span>
              </div>
            </div>
            <div className="grid gap-6">
              {savedPaths.map((path) => (
                <PathCard
                  key={path.id}
                  path={path}
                  onClick={() => onViewPath(path)}
                  onUpdateProgress={(updatedPath) =>
                    onUpdateProgress(path.id, updatedPath)
                  }
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState onBack={onBack} />
        )}
      </div>
    </div>
  );
}

function calculateStreak(paths: LearningPath[]): number {
  // Simple streak calculation based on recent activity
  const recentActivity = paths.some((path) => {
    const daysSinceUpdate = Math.floor(
      (Date.now() - path.updatedAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceUpdate <= 1;
  });

  return recentActivity ? Math.floor(Math.random() * 7) + 1 : 0; // Mock streak for demo
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  color: "blue" | "purple" | "green" | "orange" | "indigo";
}

function StatCard({ icon, title, value, color }: StatCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 bg-blue-100 text-blue-600",
    purple: "from-purple-500 to-purple-600 bg-purple-100 text-purple-600",
    green: "from-green-500 to-green-600 bg-green-100 text-green-600",
    orange: "from-orange-500 to-orange-600 bg-orange-100 text-orange-600",
    indigo: "from-indigo-500 to-indigo-600 bg-indigo-100 text-indigo-600",
  };

  const [gradient, iconBg] = colorClasses[color].split(" bg-");

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
      <div className={`inline-flex p-3 rounded-xl bg-${iconBg} mb-4`}>
        {icon}
      </div>
      <div
        className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}
      >
        {value}
      </div>
      <div className="text-gray-600 font-medium">{title}</div>
    </div>
  );
}

interface PathCardProps {
  path: LearningPath;
  onClick: () => void;
  onUpdateProgress: (updatedPath: LearningPath) => void;
}

function PathCard({ path, onClick, onUpdateProgress }: PathCardProps) {
  const completedPhases = path.phases.filter((phase) => phase.completed).length;
  const isCompleted = path.progress === 100;
  const lastActivity = Math.floor(
    (Date.now() - path.updatedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleQuickToggle = (e: React.MouseEvent, phaseId: string) => {
    e.stopPropagation();

    const updatedPhases = path.phases.map((phase) => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          completed: !phase.completed,
          completedAt: !phase.completed ? new Date() : undefined,
        };
      }
      return phase;
    });

    const newCompletedCount = updatedPhases.filter(
      (phase) => phase.completed
    ).length;
    const newProgress = Math.round(
      (newCompletedCount / updatedPhases.length) * 100
    );

    const updatedPath: LearningPath = {
      ...path,
      phases: updatedPhases,
      progress: newProgress,
      updatedAt: new Date(),
    };

    onUpdateProgress(updatedPath);
  };

  return (
    <div
      onClick={onClick}
      className={`group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/20 hover:scale-[1.02] ${
        isCompleted ? "ring-2 ring-green-200" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {path.title}
            </h3>
            {isCompleted && <CheckCircle2 className="h-6 w-6 text-green-500" />}
            {lastActivity === 0 && (
              <Star
                className="h-5 w-5 text-yellow-500"
                title="Updated today!"
              />
            )}
          </div>
          <p className="text-gray-600 mb-3">{path.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{path.duration} months</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>
                {completedPhases}/{path.phases.length} phases
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>{path.difficulty}</span>
            </div>
            <div className="text-xs text-gray-500">
              {lastActivity === 0
                ? "Updated today"
                : `${lastActivity} days ago`}
            </div>
          </div>
        </div>

        <div className="text-right ml-6">
          <div
            className={`text-2xl font-bold mb-2 ${
              isCompleted ? "text-green-600" : "text-blue-600"
            }`}
          >
            {path.progress}%
          </div>
          <div className="text-xs text-gray-500">
            {path.updatedAt.toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Quick Phase Toggle */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {path.phases.slice(0, 4).map((phase, index) => (
            <button
              key={phase.id}
              onClick={(e) => handleQuickToggle(e, phase.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                phase.completed
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title={`Phase ${index + 1}: ${phase.title}`}
            >
              {phase.completed ? "✓" : index + 1} {phase.title.split(":")[0]}
            </button>
          ))}
          {path.phases.length > 4 && (
            <span className="px-3 py-1 text-xs text-gray-500">
              +{path.phases.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            isCompleted
              ? "bg-gradient-to-r from-green-500 to-green-600"
              : "bg-gradient-to-r from-blue-600 to-purple-600"
          }`}
          style={{ width: `${path.progress}%` }}
        ></div>
      </div>
    </div>
  );
}

function EmptyState({ onBack }: { onBack: () => void }) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-6">🚀</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">
        No learning paths yet
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto dark:text-white/60">
        Start your learning journey by creating your first AI-powered
        personalized roadmap.
      </p>
      <button
        onClick={onBack}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
      >
        Create Your First Path
      </button>
    </div>
  );
}
