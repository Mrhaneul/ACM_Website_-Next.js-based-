/**
 * Single source of truth for every external link and contact used on the
 * public site. Update here, not in components.
 */
export const site = {
  name: "ACM @ CBU",
  university: "California Baptist University",
  email: "softwaredevcbu@gmail.com",
  instagram: "https://www.instagram.com/acm_cbu/",

  /**
   * Microsoft Teams join link for the ACM team.
   * TODO: replace with the real link once it is pushed. Every "join Teams"
   * button on the site reads from this value.
   */
  teamsJoinUrl: "https://teams.microsoft.com/",

  /** App store links for the Teams mobile app. */
  teamsIos: "https://apps.apple.com/app/microsoft-teams/id1113153706",
  teamsAndroid:
    "https://play.google.com/store/apps/details?id=com.microsoft.teams",
  teamsDesktop: "https://www.microsoft.com/microsoft-teams/download-app",
} as const;
