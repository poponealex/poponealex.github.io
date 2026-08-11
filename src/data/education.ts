/** Education and languages, shown on /experience only. */

export interface Study {
  degree: string;
  school: string;
  location: string;
  period: string;
  /** Distinction or ranking, where there is one worth stating. */
  note?: string;
}

export interface Language {
  name: string;
  level: string;
}

export const studies: readonly Study[] = [
  {
    degree: 'BSc Computer Science',
    school: 'Université de Lorraine',
    location: 'Metz, France',
    period: '2020 — 2023',
    note: 'Top of the cohort, highest distinction',
  },
  {
    degree: 'International Business',
    school: 'University of Westminster',
    location: 'London, United Kingdom',
    period: '2015 — 2017',
  },
  {
    degree: 'International Baccalaureate',
    school: 'École Jeannine Manuel',
    location: 'Paris, France',
    period: '2013 — 2015',
  },
  {
    degree: 'Kindergarten to high school',
    school: 'École Alsacienne',
    location: 'Paris, France',
    period: '2000 — 2013',
  },
];

export const languages: readonly Language[] = [
  { name: 'French', level: 'native' },
  { name: 'English', level: 'fluent, professional' },
  { name: 'Mandarin Chinese', level: 'conversational' },
];
