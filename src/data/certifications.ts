/**
 * Certifications, ordered professional tier first then by recency.
 *
 * Rendered as native cards rather than Credly iframes: the embeds are slow,
 * light-mode only, and inconsistent with the rest of the type. Individual badge
 * URLs are not tracked, so the section links to the public profile instead.
 */

export interface Certification {
  name: string;
  issuer: string;
  /** Credential tier, or the discipline where the issuer does not use tiers. */
  level: string;
  year: number;
  /** Flags the most recent addition so it can be called out. */
  isNew?: boolean;
}

export const credlyProfile = 'https://www.credly.com/users/aperlmutter/badges';

export const certifications: readonly Certification[] = [
  {
    name: 'Terraform Authoring and Operations Professional',
    issuer: 'HashiCorp',
    level: 'Professional',
    year: 2026,
    isNew: true,
  },
  {
    name: 'AWS Certified DevOps Engineer – Professional',
    issuer: 'Amazon Web Services',
    level: 'Professional',
    year: 2025,
  },
  {
    name: 'Certified Kubernetes Administrator',
    issuer: 'CNCF',
    level: 'Administrator',
    year: 2025,
  },
  {
    name: 'Certified Kubernetes Application Developer',
    issuer: 'CNCF',
    level: 'Application developer',
    year: 2026,
  },
  {
    name: 'Microsoft Certified: Azure Administrator Associate',
    issuer: 'Microsoft',
    level: 'Associate',
    year: 2026,
  },
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    level: 'Associate',
    year: 2024,
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    level: 'Foundational',
    year: 2024,
  },
];
