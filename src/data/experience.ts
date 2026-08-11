/**
 * Employment history, most recent first.
 *
 * These are the rows the home page leads with: the employer and the mandate,
 * not the client logo. Per-client delivery detail lives in `projects.ts`.
 */

export interface Role {
  title: string;
  org: string;
  /** Office the role is based out of. */
  location: string;
  period: string;
  summary: string;
  stack: readonly string[];
  /** Employer's site. Feeds the JSON-LD `worksFor` node, which needs a URL to
   * disambiguate the organisation from same-named ones. Omitted where there is
   * no canonical URL to point at. */
  orgUrl?: string;
}

export const roles: readonly Role[] = [
  {
    title: 'Cloud, Platform & DevSecOps Engineer',
    org: 'Delaware Consulting',
    location: 'Belval, Luxembourg',
    period: '2024 — present',
    summary:
      'Cloud-native infrastructure and platform engineering for enterprise clients — migrations to AWS and Azure, landing zones, GitOps delivery and production support. Led the firm’s applications for the AWS Digital Sovereignty and AWS SAP Competencies, and built its AI-assisted development offering for Luxembourg.',
    stack: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Python'],
    orgUrl: 'https://www.delaware.pro',
  },
  {
    title: 'Kubernetes Engineer',
    org: 'ITs4U',
    location: 'Fentange, Luxembourg',
    period: '2023 — 2024',
    summary:
      'Designed, deployed and secured production Kubernetes and OpenShift clusters for client environments. Owned disaster recovery and backup strategy, automated operational processes, and wrote the Rust operator that brought OpenShift Routes support to cert-manager.',
    stack: ['Kubernetes', 'OpenShift', 'Rust', 'Vault', 'Helm'],
  },
];
