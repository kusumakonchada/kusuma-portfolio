export interface NavItem {
  name: string;
  href: string;
}

export interface SkillItem {
  name: string;
  level?: string;
  category: 'Frontend' | 'Backend' | 'Tools & Methods';
  iconName: string;
  tag: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline?: string;
  headline?: string;
  featured?: boolean;
  isAiFeatured?: boolean;
  badge?: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  skillsCovered: string[];
  description: string;
  verifyUrl: string;
  image: string;
  hours?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
