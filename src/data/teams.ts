export type TeamLead = {
  name: string;
  role: string;
  classOf?: string;
  email: string;
};

export type Team = {
  id: "icpc" | "ccdc" | "set" | "gd";
  short: string;
  name: string;
  tagline: string;
  logo: string;
  summary: string;
  about: string[];
  skills: string[];
  facts: { label: string; value: string }[];
  highlight?: { label: string; text: string };
  leads: TeamLead[];
  joinNote: string;
};

export const teams: Team[] = [
  {
    id: "icpc",
    short: "ICPC",
    name: "Competitive Programming",
    tagline: "International Collegiate Programming Contest",
    logo: "/icpc.png",
    summary:
      "Algorithm practice and team contests against universities around the world.",
    about: [
      "The ICPC team represents ACM in the International Collegiate Programming Contest, one of the most prestigious competitive programming competitions in the world. Teams of three tackle algorithmic problems against the clock and against universities globally.",
    ],
    skills: [
      "Algorithms and data structures",
      "Competitive programming techniques",
      "Problem solving under time pressure",
      "Team strategy and communication",
      "Code optimization and debugging",
    ],
    facts: [
      { label: "Format", value: "3-person teams" },
      { label: "Focus", value: "Algorithmic problem solving" },
      { label: "Scope", value: "Regional and global contests" },
    ],
    highlight: {
      label: "Why join",
      text: "The problems you practice here are the same kind that show up in technical interviews.",
    },
    leads: [
      {
        name: "Joshua Baeza",
        role: "Team lead",
        email: "JoshuaAlexander.Baeza@calbaptist.edu",
      },
    ],
    joinNote:
      "You don't need contest experience. If you can write a loop you can start. Practice sessions are open to everyone.",
  },
  {
    id: "ccdc",
    short: "CCDC",
    name: "Cyber Defense",
    tagline: "Collegiate Cyber Defense Competition",
    logo: "/ccdc.png",
    summary:
      "Defend a live corporate network against professional red-team attackers.",
    about: [
      "The CCDC team is ACM's competitive cybersecurity branch, representing CBU in the Collegiate Cyber Defense Competition. The team defends network infrastructure against professional red-team hackers while keeping business services running, which is the same job a company security team has.",
      "Founded in 2023, the team competes against universities across the Western Region. During competition the team secures and maintains ten virtual machines in a fictional corporate environment under constant attack.",
    ],
    skills: [
      "Network defense and incident response",
      "System hardening and security monitoring",
      "Keeping services available under pressure",
      "Windows and Linux administration",
      "Team coordination and communication",
    ],
    facts: [
      { label: "Team size", value: "12 to 15 members" },
      { label: "Practice", value: "3 days a week" },
      { label: "Current goal", value: "Top 10 in the region" },
    ],
    highlight: {
      label: "Progress",
      text: "First year: 21st of 22 teams. Last year: 19th of 27. The team is moving up and needs new members to keep going.",
    },
    leads: [
      {
        name: "Joshua Gomez",
        role: "Team lead",
        classOf: "2026",
        email: "Joshua.Gomez@calbaptist.edu",
      },
    ],
    joinNote:
      "All skill levels are welcome. Tryouts and practice details are posted in the CCDC channel on Teams.",
  },
  {
    id: "set",
    short: "SET",
    name: "Software Engineering",
    tagline: "Software Engineering Team",
    logo: "/set.png",
    summary:
      "Ship real software: this website, AI tooling for campus, and full-stack projects.",
    about: [
      "The Software Engineering Team is where ACM builds things. Projects have included training language models from scratch and production web apps. The point is to get real experience with repositories, code review, and deadlines before you graduate.",
      "SET combines applied AI research with practical software development to build tools that serve the CBU community.",
    ],
    skills: [
      "Full-stack web development (React, Next.js)",
      "AI and machine learning development",
      "Transformer model training from the ground up",
      "Production-level software engineering",
      "Project design and architecture",
    ],
    facts: [
      { label: "Team size", value: "About 10 members" },
      { label: "Meets", value: "Mondays, 4:30 to 5:30 PM" },
      { label: "Where", value: "Room 203" },
    ],
    highlight: {
      label: "Current projects",
      text: "GUTT (Ground-Up-Trained Transformer), an AI framework that trains models on any campus dataset, starting with a front-desk helper for clubs, offices, and food. Plus this website.",
    },
    leads: [
      {
        name: "Joshua Gomez",
        role: "Team lead",
        classOf: "2026",
        email: "joshuahernando.gomez@calbaptist.edu",
      },
      {
        name: "Andrew Willis",
        role: "Team lead",
        classOf: "2025",
        email: "AndrewWillis771@outlook.com",
      },
      {
        name: "Joey Russell",
        role: "Co-lead, website manager",
        email: "Josephbernard.russell@calbaptist.edu",
      },
    ],
    joinNote:
      "Come to a Monday meeting in Room 203 or say hi in the SET channel on Teams. Beginners get paired with someone on an active project.",
  },
  {
    id: "gd",
    short: "GD",
    name: "Game Design",
    tagline: "Game Design Team",
    logo: "/GD.png",
    summary:
      "Build original games, enter game jams, and collaborate across art, music, and code.",
    about: [
      "The Game Design team is ACM's creative hub for aspiring game developers and designers. Members build engaging, original games through hands-on development and collaborative projects.",
      "The team develops both the technical and creative skills needed to design and ship games, participates in game jams, and works across disciplines to expand its range.",
    ],
    skills: [
      "Game mechanics and level design",
      "Unity and Unreal Engine development",
      "Rapid prototyping in game jams",
      "Project management",
      "Cross-disciplinary collaboration (art, music, narrative)",
    ],
    facts: [
      { label: "Team size", value: "6 or more members" },
      { label: "Focus", value: "Game development" },
      { label: "Current goal", value: "Game jam placements" },
    ],
    highlight: {
      label: "Mission",
      text: "Compete in campus and public game jams while building games that push creative boundaries.",
    },
    leads: [
      {
        name: "Diego Patterson",
        role: "Team lead",
        classOf: "2026",
        email: "diegochristopher.patterson@calbaptist.edu",
      },
      {
        name: "Darrin Moss",
        role: "Co-lead",
        email: "darrinjames.moss@calbaptist.edu",
      },
    ],
    joinNote:
      "The team needs artists, writers, musicians, and programmers, at any skill level.",
  },
];

export const teamById = (id: string) => teams.find((t) => t.id === id);
