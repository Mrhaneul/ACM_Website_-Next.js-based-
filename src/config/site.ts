/**
 * Single source of truth for every external link and contact used on the
 * public site. Update here, not in components.
 */
export const site = {
  name: "ACM @ CBU",
  university: "California Baptist University",
  /** Registered name on CBU Connect. */
  registeredAs: "ACM | TEC (Technology Engineering Club)",

  /** Chapter contact. Goes to the president. */
  email: "Eli.Manning@calbaptist.edu",
  instagram: "https://www.instagram.com/acm_cbu/",

  /** All the links in one place; this is what "Join on Teams" buttons open. */
  linktree: "/linktree",
  /** Microsoft Teams: join code for the ACM team (Teams → Join a team with a code). */
  teamsJoinCode: "7KC58D5",
  /** Channels in the ACM team, in the order they matter to a new member. */
  teamsChannels: ["General", "Introductions", "ICPC", "Cybersecurity", "SET", "Game Dev"],

  /** App store links for the Teams mobile app. */
  teamsIos: "https://apps.apple.com/app/microsoft-teams/id1113153706",
  teamsAndroid: "https://play.google.com/store/apps/details?id=com.microsoft.teams",
  teamsDesktop: "https://www.microsoft.com/microsoft-teams/download-app",

  meeting: {
    when: "Mondays at 4:30 PM",
    where: "TEGR (Engineering Building), Room 203",
  },

  officers: [
    { name: "Eli Manning", role: "President", email: "Eli.Manning@calbaptist.edu" },
    { name: "William Anklam", role: "Vice President", email: "WilliamJames.Anklam@calbaptist.edu" },
  ],
  advisor: { name: "Prof. Larry Clement", role: "Faculty advisor" },
} as const;
