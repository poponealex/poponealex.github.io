/**
 * Non-engineering roles, most recent first.
 *
 * The home page shows the first three; /experience carries the full list.
 */

export interface LeadershipRole {
  title: string;
  org: string;
  period: string;
  /** One entry per paragraph, so a long role can breathe instead of running on. */
  summary: readonly string[];
  href?: string;
}

export const leadership: readonly LeadershipRole[] = [
  {
    title: 'President',
    org: 'Kayak Club de Metz',
    period: '2024 — present',
    summary: [
      'Run the number-one kayak club in France: up to 6 staff, a 12-member committee, a 5-person board and 200+ members. Led an IT modernisation that cut administrative workload by ~40%. Management, HR, strategy, finance and project delivery — the job is running a business.',
      'Organised the 2026 French Canoe-Kayak Championships in Metz — slalom, kayak cross and freestyle over one week, with 600+ athletes, 1,200 boat entries, 10,000+ spectators and 100 volunteers a day.',
    ],
    href: 'https://kcmetz.fr',
  },
  {
    title: 'Founder & president',
    org: '{rootmim}',
    period: '2021 — 2024',
    summary: [
      'Founded a cybersecurity nonprofit and launched an online training platform with CTFs and hands-on labs, building academic and industry partnerships around it.',
    ],
  },
  {
    title: 'Founder & president',
    org: 'Collectif Poncelet',
    period: '2022 — 2024',
    summary: [
      'Built a residents’ association from nothing and federated 70+ neighbours to campaign against night-time disturbances in central Metz, representing them to local institutions.',
    ],
  },
  {
    title: 'Vice-president',
    org: 'Association Générale des Étudiants de Paris',
    period: '2017 — 2018',
    summary: [
      'Coordinated the member associations, represented students locally and nationally, and rebuilt the association’s IT. Arrived as a service civique volunteer running Agoraé Paris, a solidarity grocery for students in difficulty.',
    ],
  },
];
