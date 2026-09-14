/**
 * Africa Inland Mission partnership. Public-facing facts only; anything from
 * planning meetings that isn't settled stays out.
 */
export const aim = {
  name: "Africa Inland Mission",
  short: "AIM",
  logo: "/aim-logo.png",
  website: "https://aimint.org/",
  founded: 1895,
  summary:
    "Africa Inland Mission is a Christian mission organization founded in 1895. It works in more than 20 countries across Africa, with about 1,000 missionaries and a support hub in Nairobi that runs aviation, IT, housing, and finance for the field.",
  why: "This year every ACM | TEC division is building project work for AIM. Members get a real outside stakeholder with real constraints instead of a simulated one, and AIM gets software, security work, and training tools it would not otherwise have budget for.",

  /** What each division is doing. Keyed by team id. */
  byTeam: {
    set: "Software and internal tools, built to whatever AIM needs next. First candidates are administrative workflows that are still done by hand.",
    ccdc: "A security audit and white-hat testing pass on AIM's live systems.",
    gd: "Training simulations, including a pilot training sim for AIM's aviation program.",
    icpc: "The algorithm-heavy pieces of AIM's projects, the logic the other divisions build around.",
  } as Record<string, string>,

  /** Problem areas on the table. Not commitments. */
  areas: [
    {
      title: "Field tools that work offline",
      text: "Much of AIM's work happens where connectivity is limited. An offline-capable assistant for field staff, along the lines of the model SET built for the Navy at NSWC Corona, is one of the first ideas being scoped.",
    },
    {
      title: "Unfinished admin workflows",
      text: "Things like a luggage and freight barcode tracking system that was started and never completed. Small, bounded, and immediately useful to someone in Nairobi.",
    },
    {
      title: "Security review",
      text: "An audit of infrastructure that people depend on, with the findings written up so AIM's IT team can act on them.",
    },
    {
      title: "Simulation and training",
      text: "3D airfield previews for pilots flying into unfamiliar strips, and educational games for missionaries who teach in schools.",
    },
  ],

  /** How the partnership is run. */
  principles: [
    "Ship something into someone's hands within six months, even if it is rough.",
    "Two or three scoped deliverables per team, not one huge project.",
    "Prefer new, well-defined problems over inheriting legacy systems.",
    "Every project has a field champion at AIM who will use it and give feedback.",
    "This is meant to be a multi-year relationship, not a one-off.",
  ],

  /** Travel and exchange ideas being explored. */
  travel: [
    "AIM's annual conference in Nairobi each November, as a possible site visit and on-site tech support event.",
    "A longer field visit for students, with summer 2028 as the target.",
    "A semester-abroad option through Africa International University in Nairobi.",
  ],
} as const;
