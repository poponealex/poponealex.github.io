/**
 * Capability groups shown in the "What I do" section.
 *
 * Deliberately few rows: the full tool inventory belongs on a CV, not a home
 * page. Depth is evidenced by the certifications and project sections instead.
 */

export interface SkillGroup {
  /** Short label rendered in the mono gutter. */
  label: string;
  items: readonly string[];
}

export const skills: readonly SkillGroup[] = [
  {
    label: 'Cloud',
    items: ['AWS', 'Azure', 'landing zones', 'EKS / AKS', 'serverless'],
  },
  {
    label: 'Platform & IaC',
    items: ['Kubernetes', 'OpenShift', 'Terraform', 'Ansible', 'Linux', 'Python'],
  },
  {
    label: 'Security & reliability',
    items: [
      'IAM & workload identity',
      'Vault',
      'policy-as-code',
      'disaster recovery',
      'observability',
    ],
  },
  {
    label: 'Software design',
    items: ['Clean Architecture', 'DDD', 'TDD'],
  },
];
