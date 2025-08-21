import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export interface GeneratedRoadmap {
  goal: string;
  duration_months: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  phases: {
    title: string;
    duration_weeks: number;
    skills: string[];
    resources: {
      title: string;
      type: 'video' | 'article' | 'course' | 'documentation' | 'practice';
      url: string;
      duration?: string;
    }[];
    project: string;
  }[];
}

export async function generateLearningPath(goal: string): Promise<GeneratedRoadmap> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are an expert career learning path generator. Create a comprehensive, step-by-step learning roadmap for someone who wants to become a "${goal}".

Generate a detailed roadmap in JSON format with the following structure:

{
  "goal": "${goal}",
  "duration_months": number (realistic timeline, typically 6-12 months),
  "difficulty": "Beginner|Intermediate|Advanced",
  "description": "A compelling 2-sentence description of what they'll achieve",
  "phases": [
    {
      "title": "Phase Name (descriptive and specific)",
      "duration_weeks": number (realistic weekly duration),
      "skills": ["skill1", "skill2", "skill3"] (3-6 key skills per phase),
      "resources": [
        {
          "title": "Resource Name",
          "type": "video|article|course|documentation|practice",
          "url": "https://actual-working-url.com",
          "duration": "estimated time (e.g., '2 hours', '1 week')"
        }
      ] (3-5 high-quality, free resources per phase),
      "project": "Specific, practical project idea that demonstrates the skills learned"
    }
  ] (4-6 phases total)
}

Requirements:
- Make it practical and actionable for beginners
- Include only real, accessible URLs (MDN, official docs, Khan Academy, Coursera, YouTube, GitHub, etc.)
- Progress from fundamentals to advanced concepts
- Each phase should build upon the previous one
- Projects should be portfolio-worthy
- Focus on in-demand, current industry skills
- Provide realistic timelines

Return ONLY the JSON object, no additional text or formatting.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response to extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    const roadmapData = JSON.parse(jsonMatch[0]);
    return roadmapData;
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw new Error('Failed to generate learning path. Please try again.');
  }
}

export async function generateChatResponse(message: string, context?: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are an AI learning assistant specializing in career development and educational guidance. 
${context ? `Context: ${context}` : ''}

User message: "${message}"

Provide a helpful, encouraging, and informative response. If the user is asking about:
- Career paths: Suggest specific roles and skills needed
- Learning resources: Recommend high-quality, free resources
- Study strategies: Give practical, actionable advice
- Technical concepts: Explain clearly with examples
- Progress tracking: Offer motivation and next steps

Keep responses conversational, supportive, and under 200 words unless more detail is specifically requested.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating chat response:', error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
}