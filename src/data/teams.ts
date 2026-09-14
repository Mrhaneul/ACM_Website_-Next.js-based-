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
  /** Channel name inside the ACM team on Microsoft Teams. */
  channel: string;
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
      "The algorithm work every other division builds around, plus weekly problem sets and contests.",
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
      { label: "Practice", value: "Check the ICPC channel on Teams" },
    ],
    highlight: {
      label: "Why join",
      text: "The problems you practice here are the same kind that show up in technical interviews.",
    },
    leads: [],
    channel: "ICPC",
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
      "Audit systems that are actually in use, not a solvable-by-Friday CTF. Plus CCDC if you want the competition side.",
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
      { label: "Practice", value: "3 days a week; times in the Cybersecurity channel on Teams" },
      { label: "Current goal", value: "Top 10 in the region" },
    ],
    highlight: {
      label: "Progress",
      text: "First year: 21st of 22 teams. Last year: 19th of 27. The team is moving up and needs new members to keep going.",
    },
    leads: [
      {
        name: "Caleb Van Randwyk",
        role: "Team lead",
        email: "CalebJohn.VanRandwyk@calbaptist.edu",
      },
    ],
    channel: "Cybersecurity",
    joinNote:
      "All skill levels are welcome. Tryouts and practice details are posted in the Cybersecurity channel on Teams.",
  },
  {
    id: "set",
    short: "SET",
    name: "Software Engineering",
    tagline: "Software Engineering Team",
    logo: "/set.png",
    summary:
      "Ship real software on a real team, not a class assignment. Standups, PRs, code review.",
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
      { label: "Where", value: "TEGR (Engineering Building), Room 203" },
    ],
    highlight: {
      label: "Current projects",
      text: "GUTT (Ground-Up-Trained Transformer), an AI framework that trains models on any campus dataset, starting with a front-desk helper for clubs, offices, and food. Plus this website.",
    },
    leads: [
      {
        name: "Andrew Willis",
        role: "Team lead",
        email: "AndrewWillis771@outlook.com",
      },
      {
        name: "Brandon Magana",
        role: "Team lead",
        email: "Brandon.Magana@calbaptist.edu",
      },
    ],
    channel: "SET",
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
      "Build something people actually play. Weekend jams, real engines.",
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
      { label: "Meets", value: "Check the Game Dev channel on Teams" },
    ],
    highlight: {
      label: "Mission",
      text: "Compete in campus and public game jams while building games that push creative boundaries.",
    },
    leads: [
      {
        name: "Jeremy Freeman",
        role: "Team lead",
        email: "JeremyMatthew.Freeman@calbaptist.edu",
      },
    ],
    channel: "Game Dev",
    joinNote:
      "The team needs artists, writers, musicians, and programmers, at any skill level.",
  },
];

export const teamById = (id: string) => teams.find((t) => t.id === id);
