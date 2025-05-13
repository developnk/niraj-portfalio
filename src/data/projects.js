// data/projects.js
export const projects = [
  {
    title: 'Smart Task Tracker',
    tagline: 'AI-powered task management app that prioritizes your work intelligently.',
    image: '/images/task-tracker-hero.png',
    demoLink: 'https://your-live-demo.com',
    codeLink: 'https://github.com/yourusername/project-repo',
    overview:
      'Helps users manage tasks using intelligent prioritization. Built with a modern tech stack...',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express', 'Docker'],
    features: [
      '🧠 AI-based task prioritization',
      '📱 Responsive UI with drag-and-drop',
      '🔒 User authentication and secure API',
      '📅 Reminders and due date notifications',
    ],
    challenges: [
      'Implementing drag-and-drop for mobile and desktop using react-beautiful-dnd.',
      'Integrating a simple ML model using a Python microservice for task ranking.',
    ],
    learnings: [
      'Integrating Python services with a Node.js backend',
      'Designing responsive UIs with Tailwind',
      'Handling auth securely with JWT',
    ],
  },

  // Add more project objects here
];
