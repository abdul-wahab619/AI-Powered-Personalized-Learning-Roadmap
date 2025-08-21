import type { LearningPath, CareerGoal } from '../types';

export const generateMockRoadmap = (goal: CareerGoal): LearningPath => {
  const roadmaps: Record<string, Omit<LearningPath, 'id' | 'createdAt' | 'updatedAt'>> = {
    'frontend-developer': {
      title: 'Frontend Developer',
      description: 'Master modern web development with React, TypeScript, and cutting-edge tools',
      duration: 6,
      difficulty: 'Intermediate',
      phases: [
        {
          id: 'phase-1',
          title: 'HTML, CSS & JavaScript Fundamentals',
          duration: 6,
          skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'DOM Manipulation', 'Responsive Design'],
          resources: [
            { title: 'MDN Web Docs - HTML', type: 'documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', duration: '2 hours' },
            { title: 'CSS Grid & Flexbox Course', type: 'course', url: 'https://cssgrid.io/', duration: '4 hours' },
            { title: 'JavaScript30 Challenge', type: 'practice', url: 'https://javascript30.com/', duration: '30 days' },
            { title: 'Responsive Web Design Principles', type: 'article', url: 'https://web.dev/responsive-web-design-basics/', duration: '45 min' }
          ],
          project: 'Build a responsive portfolio website with interactive elements and smooth animations',
          completed: false
        },
        {
          id: 'phase-2',
          title: 'React & Component Architecture',
          duration: 8,
          skills: ['React', 'JSX', 'State Management', 'Props', 'React Hooks', 'Component Patterns'],
          resources: [
            { title: 'React Official Documentation', type: 'documentation', url: 'https://react.dev/', duration: '6 hours' },
            { title: 'React Hooks in Depth', type: 'video', url: 'https://youtube.com/watch?v=dpw9EHDh2bM', duration: '2 hours' },
            { title: 'Component Design Patterns', type: 'article', url: 'https://kentcdodds.com/blog/compound-components', duration: '30 min' },
            { title: 'React Testing Library', type: 'course', url: 'https://testing-library.com/docs/react-testing-library/intro/', duration: '3 hours' }
          ],
          project: 'Create a task management app with full CRUD operations and local storage',
          completed: false
        },
        {
          id: 'phase-3',
          title: 'TypeScript & Advanced React',
          duration: 4,
          skills: ['TypeScript', 'Type Safety', 'Advanced Hooks', 'Context API', 'Custom Hooks'],
          resources: [
            { title: 'TypeScript Handbook', type: 'documentation', url: 'https://www.typescriptlang.org/docs/', duration: '4 hours' },
            { title: 'React + TypeScript Cheatsheet', type: 'documentation', url: 'https://github.com/typescript-cheatsheets/react', duration: '2 hours' },
            { title: 'Advanced React Patterns', type: 'course', url: 'https://kentcdodds.com/workshops/advanced-react-patterns', duration: '8 hours' }
          ],
          project: 'Refactor previous projects to TypeScript with proper typing and error handling',
          completed: false
        },
        {
          id: 'phase-4',
          title: 'State Management & API Integration',
          duration: 6,
          skills: ['Redux Toolkit', 'React Query', 'REST APIs', 'GraphQL', 'Async/Await', 'Error Handling'],
          resources: [
            { title: 'Redux Toolkit Tutorial', type: 'course', url: 'https://redux-toolkit.js.org/tutorials/quick-start', duration: '4 hours' },
            { title: 'React Query Guide', type: 'documentation', url: 'https://tanstack.com/query/latest', duration: '3 hours' },
            { title: 'GraphQL with React', type: 'video', url: 'https://graphql.org/learn/', duration: '5 hours' }
          ],
          project: 'Build a social media dashboard with real-time data fetching and optimistic updates',
          completed: false
        }
      ],
      progress: 0
    },
    'data-analyst': {
      title: 'Data Analyst',
      description: 'Transform data into actionable insights using Python, SQL, and visualization tools',
      duration: 8,
      difficulty: 'Beginner',
      phases: [
        {
          id: 'phase-1',
          title: 'Statistics & Excel Mastery',
          duration: 4,
          skills: ['Descriptive Statistics', 'Excel Functions', 'Data Cleaning', 'Pivot Tables', 'Charts & Graphs'],
          resources: [
            { title: 'Khan Academy Statistics', type: 'course', url: 'https://www.khanacademy.org/math/statistics-probability', duration: '20 hours' },
            { title: 'Excel Data Analysis Toolkit', type: 'course', url: 'https://support.microsoft.com/en-us/office/introduction-to-data-analysis-using-excel', duration: '6 hours' },
            { title: 'Statistical Thinking for Data Science', type: 'article', url: 'https://towardsdatascience.com/statistical-thinking-for-data-science', duration: '1 hour' }
          ],
          project: 'Analyze quarterly sales data and create an executive dashboard in Excel with key insights',
          completed: false
        },
        {
          id: 'phase-2',
          title: 'SQL for Data Analysis',
          duration: 6,
          skills: ['SQL Queries', 'Joins', 'Aggregations', 'Window Functions', 'CTEs', 'Database Design'],
          resources: [
            { title: 'W3Schools SQL Tutorial', type: 'course', url: 'https://www.w3schools.com/sql/', duration: '10 hours' },
            { title: 'SQLBolt Interactive Lessons', type: 'practice', url: 'https://sqlbolt.com/', duration: '5 hours' },
            { title: 'Advanced SQL for Data Analysis', type: 'course', url: 'https://mode.com/sql-tutorial/', duration: '8 hours' }
          ],
          project: 'Build a comprehensive customer analytics report using complex SQL queries and joins',
          completed: false
        },
        {
          id: 'phase-3',
          title: 'Python for Data Analysis',
          duration: 8,
          skills: ['Python Basics', 'Pandas', 'NumPy', 'Data Manipulation', 'Data Cleaning', 'Jupyter Notebooks'],
          resources: [
            { title: 'Python for Everybody', type: 'course', url: 'https://www.coursera.org/specializations/python', duration: '40 hours' },
            { title: 'Pandas Documentation', type: 'documentation', url: 'https://pandas.pydata.org/docs/', duration: '10 hours' },
            { title: 'Data Analysis with Python', type: 'course', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', duration: '300 hours' }
          ],
          project: 'Create a data pipeline to process and analyze customer behavior patterns from raw CSV files',
          completed: false
        },
        {
          id: 'phase-4',
          title: 'Data Visualization & Storytelling',
          duration: 6,
          skills: ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau', 'Data Storytelling', 'Dashboard Creation'],
          resources: [
            { title: 'Tableau Public Training', type: 'course', url: 'https://public.tableau.com/app/learn/how-to-videos', duration: '12 hours' },
            { title: 'Python Visualization Guide', type: 'documentation', url: 'https://matplotlib.org/stable/tutorials/index.html', duration: '8 hours' },
            { title: 'Data Storytelling Masterclass', type: 'video', url: 'https://www.storytellingwithdata.com/', duration: '4 hours' }
          ],
          project: 'Present insights from a real-world dataset with compelling visualizations and actionable recommendations',
          completed: false
        }
      ],
      progress: 0
    },
    'cloud-engineer': {
      title: 'Cloud Engineer',
      description: 'Design, deploy, and manage scalable cloud infrastructure on AWS/Azure',
      duration: 10,
      difficulty: 'Advanced',
      phases: [
        {
          id: 'phase-1',
          title: 'Cloud Fundamentals & Networking',
          duration: 6,
          skills: ['Cloud Computing Basics', 'Networking', 'Security Fundamentals', 'AWS/Azure Basics'],
          resources: [
            { title: 'AWS Cloud Practitioner Essentials', type: 'course', url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/', duration: '6 hours' },
            { title: 'Cloud Computing Concepts', type: 'video', url: 'https://www.youtube.com/watch?v=M988_fsOSWo', duration: '2 hours' }
          ],
          project: 'Set up a basic cloud infrastructure with VPC, subnets, and security groups',
          completed: false
        },
        {
          id: 'phase-2',
          title: 'Infrastructure as Code',
          duration: 8,
          skills: ['Terraform', 'CloudFormation', 'ARM Templates', 'Infrastructure Automation'],
          resources: [
            { title: 'Terraform Documentation', type: 'documentation', url: 'https://www.terraform.io/docs', duration: '10 hours' },
            { title: 'Infrastructure as Code Best Practices', type: 'article', url: 'https://cloud.google.com/docs/terraform/best-practices', duration: '1 hour' }
          ],
          project: 'Deploy a multi-tier application using Infrastructure as Code principles',
          completed: false
        }
      ],
      progress: 0
    }
  };

  const baseRoadmap = roadmaps[goal.id] || roadmaps['frontend-developer'];
  
  return {
    id: `${goal.id}-${Date.now()}`,
    ...baseRoadmap,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};