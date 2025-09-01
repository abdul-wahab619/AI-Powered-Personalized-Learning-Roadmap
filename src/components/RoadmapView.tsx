import React, { useState } from "react";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Circle,
  ExternalLink,
  BookOpen,
  PlayCircle,
  FileText,
  Code,
  Calendar,
  Target,
  Share2,
  Download,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { LearningPath, Phase } from "../types";
import { useNavigate, useParams } from "react-router-dom";

interface RoadmapViewProps {
  roadmap: LearningPath;
  onBack: () => void;
  onSave: (path: LearningPath) => void;
  onViewDashboard: () => void;
}

export function RoadmapView({
  roadmap,
  onBack,
  onSave,
  onViewDashboard,
}: RoadmapViewProps) {
  // const navigate = useNavigate();
  const { id } = useParams();
  const [localRoadmap, setLocalRoadmap] = useState<LearningPath>(roadmap);

  const [expandedPhase, setExpandedPhase] = useState<string | null>(
    localRoadmap.phases[0]?.id || null
  );

  const togglePhaseCompletion = (phaseId: string) => {
    const updatedPhases = localRoadmap.phases.map((phase) => {
      if (phase.id === phaseId) {
        const completed = !phase.completed;
        return {
          ...phase,
          completed,
          completedAt: completed ? new Date() : undefined,
        };
      }
      return phase;
    });

    const completedCount = updatedPhases.filter(
      (phase) => phase.completed
    ).length;
    const progress = Math.round((completedCount / updatedPhases.length) * 100);

    setLocalRoadmap((prev) => ({
      ...prev,
      phases: updatedPhases,
      progress,
      updatedAt: new Date(),
    }));
  };

  const handleSave = () => {
    onSave(localRoadmap);
    alert("✅ Roadmap saved to your dashboard!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${localRoadmap.title} Learning Path`,
          text: localRoadmap.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("🔗 Link copied to clipboard!");
    }
  };

  const handleExport = () => {
    const roadmapText = generateMarkdownExport(localRoadmap);
    const blob = new Blob([roadmapText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${localRoadmap.title
      .replace(/\s+/g, "-")
      .toLowerCase()}-roadmap.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4" />;
      case "video":
        return <PlayCircle className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      case "practice":
        return <Code className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

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
            Back to Goals
          </button>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {localRoadmap.title} Roadmap
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {localRoadmap.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{localRoadmap.duration} months</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Target className="h-4 w-4" />
                    <span>{localRoadmap.difficulty} level</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>{localRoadmap.phases.length} phases</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {localRoadmap.progress}%
                </div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${localRoadmap.progress}%` }}
              ></div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                Save to Dashboard
              </button>
              <button
                onClick={onViewDashboard}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                View Dashboard
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-6">
          {localRoadmap.phases.map((phase, index) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              phaseNumber={index + 1}
              isExpanded={expandedPhase === phase.id}
              onToggle={() =>
                setExpandedPhase(expandedPhase === phase.id ? null : phase.id)
              }
              onToggleCompletion={() => togglePhaseCompletion(phase.id)}
              getResourceIcon={getResourceIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface PhaseCardProps {
  phase: Phase;
  phaseNumber: number;
  isExpanded: boolean;
  onToggle: () => void;
  onToggleCompletion: () => void;
  getResourceIcon: (type: string) => React.ReactNode;
}

function PhaseCard({
  phase,
  phaseNumber,
  isExpanded,
  onToggle,
  onToggleCompletion,
  getResourceIcon,
}: PhaseCardProps) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300 ${
        phase.completed ? "ring-2 ring-green-200" : ""
      }`}
    >
      <div
        className="p-6 cursor-pointer hover:bg-white/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                phase.completed
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {phase.completed ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                phaseNumber
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Phase {phaseNumber}: {phase.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{phase.duration} weeks</span>
                </div>
                <span>{phase.skills.length} skills</span>
                <span>{phase.resources.length} resources</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompletion();
            }}
            className={`p-2 rounded-full transition-all ${
              phase.completed
                ? "bg-green-100 text-green-600 hover:bg-green-200"
                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
          >
            {phase.completed ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-6 bg-white/50">
          {/* Skills */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Skills You'll Learn
            </h4>
            <div className="flex flex-wrap gap-2">
              {phase.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Learning Resources
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {phase.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 truncate">
                        {resource.title}
                      </h5>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="capitalize">{resource.type}</span>
                        {resource.duration && (
                          <>
                            <span>•</span>
                            <span>{resource.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Project */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              Milestone Project
            </h4>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="text-gray-700 mb-2">{children}</p>
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
                {phase.project}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function generateMarkdownExport(roadmap: LearningPath): string {
  return `# ${roadmap.title} Learning Roadmap

**Duration:** ${roadmap.duration} months  
**Difficulty:** ${roadmap.difficulty}  
**Progress:** ${roadmap.progress}%

## Description
${roadmap.description}

## Learning Phases

${roadmap.phases
  .map(
    (phase, index) => `
### Phase ${index + 1}: ${phase.title}

**Duration:** ${phase.duration} weeks  
**Status:** ${phase.completed ? "✅ Completed" : "⏳ In Progress"}

#### Skills You'll Learn
${phase.skills.map((skill) => `- ${skill}`).join("\n")}

#### Learning Resources
${phase.resources
  .map(
    (resource) =>
      `- [${resource.title}](${resource.url}) (${resource.type}${
        resource.duration ? ` - ${resource.duration}` : ""
      })`
  )
  .join("\n")}

#### Milestone Project
${phase.project}

---
`
  )
  .join("")}

Generated by LearnPath AI - ${new Date().toLocaleDateString()}
`;
}
