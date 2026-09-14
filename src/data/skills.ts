/**
 * Skill taxonomy for the join form. Grouped so freshmen can browse instead of
 * guessing what to type. Keep labels short and searchable.
 */
export type SkillGroup = { id: string; label: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      "Python", "Java", "C", "C++", "C#", "JavaScript", "TypeScript", "Go",
      "Rust", "Swift", "Kotlin", "SQL", "HTML & CSS", "Bash", "MATLAB", "R",
    ],
  },
  {
    id: "web",
    label: "Web",
    skills: [
      "React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Vue",
      "Angular", "Django", "Flask", "REST APIs", "GraphQL", "Firebase",
      "Supabase", "WordPress",
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    skills: ["iOS (Swift)", "Android (Kotlin)", "React Native", "Flutter"],
  },
  {
    id: "data-ai",
    label: "Data & AI",
    skills: [
      "Machine learning", "Deep learning", "PyTorch", "TensorFlow", "Pandas",
      "NumPy", "Data visualization", "LLMs & prompt engineering", "Computer vision",
      "Statistics", "Jupyter",
    ],
  },
  {
    id: "security",
    label: "Cybersecurity",
    skills: [
      "Linux administration", "Windows Server", "Active Directory", "Networking",
      "Firewalls", "Wireshark", "Penetration testing", "Incident response",
      "Security monitoring", "CTF competitions", "Cryptography",
    ],
  },
  {
    id: "games",
    label: "Game development",
    skills: [
      "Unity", "Unreal Engine", "Godot", "Blender", "Pixel art", "3D modeling",
      "Level design", "Game audio", "Narrative design", "Aseprite",
    ],
  },
  {
    id: "tools",
    label: "Tools & infrastructure",
    skills: [
      "Git & GitHub", "Docker", "AWS", "Azure", "Google Cloud", "Linux CLI",
      "CI/CD", "VS Code", "Figma", "Postman", "Vim",
    ],
  },
  {
    id: "competitive",
    label: "Competitive programming",
    skills: [
      "Algorithms", "Data structures", "LeetCode", "Codeforces", "Dynamic programming",
      "Graph theory", "Discrete math",
    ],
  },
  {
    id: "other",
    label: "Design & other",
    skills: [
      "UI/UX design", "Graphic design", "Video editing", "Technical writing",
      "Public speaking", "Project management", "Marketing & social media",
      "Photography", "Music production", "Hardware & electronics", "Arduino",
      "Raspberry Pi", "3D printing",
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.skills);

export const majors = [
  "Computer Science",
  "Software Engineering",
  "Cybersecurity",
  "Computer Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Data Science",
  "Information Technology",
  "Mathematics",
  "Business",
  "Graphic Design",
  "Other / Undecided",
];

export const years = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"];

export const experienceLevels = [
  { id: "new", label: "Brand new", help: "Never coded, or only a little. That is where most of us started." },
  { id: "some", label: "Some experience", help: "A class or two, a tutorial, a small project." },
  { id: "confident", label: "Confident", help: "Built things on my own; comfortable in at least one language." },
] as const;
