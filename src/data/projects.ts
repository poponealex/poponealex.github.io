/**
 * Client and open-source engagements, most recent first.
 *
 * Clients are never named, and neither is anything that would narrow a sector to
 * one company: the engagements are covered by NDA and, for the regulated ones, by
 * professional secrecy. Security-sensitive delivery detail — recovery objectives,
 * secrets and identity configuration, account and network topology — is left out
 * rather than paraphrased. What stays is that the work happened, the capability it
 * delivered, and the decisions behind it.
 */

export interface Project {
  /** Sector descriptor for a client, or the repository name for open-source work. */
  title: string;
  /** The shape of the work, e.g. "on-prem → Kubernetes". */
  context: string;
  period: string;
  summary: string;
  stack: readonly string[];
  /** Only set when a real destination exists, so no row implies a dead link. */
  href?: string;
}

export const projects: readonly Project[] = [
  {
    title: 'An HR services provider',
    context: 'Redmine → Azure DevOps',
    period: '2026',
    summary:
      'Migrated tens of thousands of tickets and attachments into Azure DevOps with a Python toolchain written for the job — field mapping, attachment transfer and validation. Scoped at 14 days, delivered in 6 by driving the work with AI.',
    stack: ['Python', 'Azure DevOps', 'Redmine API', 'data migration'],
  },
  {
    title: 'A marine engineering group',
    context: 'Azure infrastructure-as-code',
    period: '2026',
    summary:
      'Architected, designed and deployed the Azure infrastructure behind an operational reporting platform as code.',
    stack: ['Azure', 'Bicep', 'IaC', 'networking'],
  },
  {
    title: 'A geospatial data company',
    context: 'on-prem Mesos → Kubernetes',
    period: '2025',
    summary:
      'The estate ran on Mesos on-prem. Migrated all 20+ Python microservices onto Kubernetes — designing the cluster and infrastructure, containerising and debugging the services, automating delivery — while keeping Mesos in the cloud for AI processing.',
    stack: ['Kubernetes', 'Mesos', 'Python', 'Helm', 'CI/CD'],
  },
  {
    title: 'An AI earth observation company',
    context: 'Kubernetes → GitOps',
    period: '2025',
    summary:
      'Deployed the platform on Kubernetes and introduced Helm charts, then made the case for ArgoCD and moved the team onto GitOps delivery.',
    stack: ['Kubernetes', 'Helm', 'ArgoCD', 'GitOps'],
  },
  {
    title: 'A manufacturing group',
    context: 'on-prem → AWS',
    period: '2025',
    summary:
      'Ran the migration end-to-end: delivered the assessment, built the landing zone, deployed three shared applications, and architected an image storage-and-query solution.',
    stack: ['AWS', 'Terraform', 'Landing Zone', 'SAP networking'],
  },
  {
    title: 'A manufacturing group',
    context: 'AWS landing zone',
    period: '2025',
    summary:
      'Implemented an AWS landing zone with Landing Zone Accelerator, delivering the baseline the client now builds on.',
    stack: ['AWS', 'Landing Zone Accelerator', 'multi-account', 'guardrails'],
  },
  {
    title: 'A real estate group',
    context: 'disaster recovery',
    period: '2024',
    summary:
      'Designed and tested a DR and backup strategy for business-critical workloads — validated by live failover, not on paper.',
    stack: ['OpenShift', 'Kubernetes', 'backup', 'DR'],
  },
  {
    title: 'A life insurance company',
    context: 'secrets platform migration',
    period: '2023 — 2024',
    summary:
      'Migrated the secrets platform without an availability gap, and delivered the training that went with it.',
    stack: ['HashiCorp Vault', 'OpenShift', 'secrets management'],
  },
  {
    title: 'cert-manager-routes-controller',
    context: 'Kubernetes operator',
    period: '2023',
    summary:
      'Authored a Rust operator bringing OpenShift Routes support to cert-manager, contributing issues and pull requests upstream to cert-manager/openshift-routes.',
    stack: ['Rust', 'OpenShift', 'Helm'],
    href: 'https://github.com/its4u/cert-manager-routes-controller',
  },
];

/** Built outside client work — own tools and the platforms behind the nonprofits. */
export const sideProjects: readonly Project[] = [
  {
    title: 'Suprenam',
    context: 'batch renaming tool',
    period: '2021 — 2023',
    summary:
      'A batch renaming utility that hands the job to the editor you already know: drop in a batch of files, edit the names as text, and the renames follow.',
    stack: ['Python'],
    href: 'https://github.com/poponealex/suprenam',
  },
  {
    title: '{rootmim}',
    context: 'CTF training platform',
    period: '2021',
    summary:
      'Built the ethical-hacking training platform behind the nonprofit — CTF challenges and hands-on labs, served from self-hosted infrastructure.',
    stack: ['React', 'Express.js', 'Docker', 'OpenVPN', 'Proxmox', 'C'],
  },
];
