import { ProjectItem, CertificateItem, SkillItem } from '../types';
import kusumaAvatar from '../assets/images/kusu.jpeg';
import aerovisionPreview from '../assets/images/aerovision-dashboard.png';
import simpliCertificate from '../assets/images/simpli.jpeg';
import pythonCertificate from '../assets/images/python.jpeg';
import cssCertificate from '../assets/images/css.jpeg';
import frontendCertificate from '../assets/images/frontend.jpeg';
export const PERSONAL_INFO = {
  name: 'Kusuma Konchada',
  shortName: 'Kusuma',
  brandName: 'Kusuma.Konchada',
  role: 'Aspiring Full Stack Developer',
  badge: 'B.Tech 3rd Year Student',
  location: 'JNTUGV Student, Vizianagaram',
  fullLocation: 'Vizianagaram, Andhra Pradesh, India',
  email: 'kusumakonchada123@gmail.com',
  phone: '+91 73822 16107',
  degree: 'B.Tech in Computer Science & Engineering (3rd Year)',
  institution: 'JNTU-GV College of Engineering, Vizianagaram',
  github: 'https://github.com/kusumakonchada',
  linkedin: 'https://linkedin.com/in/kusumakonchada',
  avatar: kusumaAvatar,
  heroIntro:
    "I'm a B.Tech 3rd-year student passionate about building modern web applications and continuously improving my skills in Full Stack Development, Python, SQL, Prompt Engineering, and DSA. I enjoy creating clean, responsive, and user-friendly digital experiences while learning new technologies every day.",
  aboutText:
    "I'm Kusuma, a passionate B.Tech 3rd-year student who loves learning and building practical projects. My goal is to become a skilled Full Stack Developer by strengthening my knowledge in Frontend, Backend, Python, SQL, Prompt Engineering, and Data Structures & Algorithms. I enjoy solving problems, creating responsive interfaces, and continuously improving through projects and certifications.",
};

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact Me', href: '#contact' },
];

export const SKILLS: Record<'frontend' | 'backend', SkillItem[]> = {
  frontend: [
    {
      name: 'HTML5',
      category: 'Frontend',
      iconName: 'Code2',
      tag: 'Semantic Markup',
      description: 'Clean semantic structure, modern accessibility standards, and SEO best practices.',
    },
    {
      name: 'CSS3',
      category: 'Frontend',
      iconName: 'Palette',
      tag: 'Styling & Flex/Grid',
      description: 'Modern flexbox, grid layouts, fluid typography, and custom CSS animations.',
    },
    {
      name: 'JavaScript',
      category: 'Frontend',
      iconName: 'FileCode2',
      tag: 'ES6+ & DOM',
      description: 'Modern asynchronous JavaScript, API integration, closures, and interactive DOM.',
    },
    {
      name: 'Responsive Design',
      category: 'Frontend',
      iconName: 'Smartphone',
      tag: 'Mobile First',
      description: 'Pixel-perfect mobile, tablet, and ultra-wide desktop layouts with fluid scaling.',
    },
  ],
  backend: [
    {
      name: 'Python',
      category: 'Backend',
      iconName: 'Terminal',
      tag: 'Core & Scripting',
      description: 'Clean procedural & object-oriented programming, data scripts, and backend logic.',
    },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'aerovision-ai',
    title: 'AeroVision AI',
    tagline: 'AI-Driven Computer Vision Project',
    headline: 'Real-time AI-powered Virtual Drone Guidance System',
    description:
      'AeroVision AI is a modern computer vision project that demonstrates AI-powered virtual drone guidance using real-time object detection, computer vision, and an interactive flight simulator. The project showcases how AI can analyze visual input, detect objects, estimate navigation paths, and simulate autonomous drone guidance without requiring a physical drone.',
    tags: [
      'Python',
      'OpenCV',
      'Computer Vision',
      'AI',
      'Object Detection',
      'Flight Simulation',
    ],
    image: aerovisionPreview,
    liveUrl: '#demo-aerovision',
    githubUrl: 'https://github.com/kusumakonchada/AeroVision-AI',
    featured: true,
    isAiFeatured: true,
    badge: 'AI Powered',
    highlights: [
      'Real-time object detection',
      'AI-powered virtual drone guidance',
      'Interactive flight simulator',
      'Computer vision-based scene analysis',
      'Navigation path visualization',
      'Responsive and modern interface',
    ],
  },
];

export const CERTIFICATIONS: CertificateItem[] = [
  {
    id: 'generative-ai-for-everyone',
    title: 'Generative AI for Everyone',
    issuer: 'Simplilearn SkillUp',
    issueDate: '2026',
    credentialId: '10220229',
    image: simpliCertificate,
    skillsCovered: ['Generative AI', 'LLMs', 'Prompt Engineering', 'AI Applications'],
    description: 'Certified completion demonstrating core generative AI understanding, prompt design frameworks, and practical AI implementations.',
    verifyUrl: 'https://www.simplilearn.com/skillup-certificate',
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    issuer: 'Microsoft (Skill India Digital Hub)',
    issueDate: '2026',
    hours: '40 Hours',
    credentialId: 'SIDH-MSFT-030626',
    image: pythonCertificate,
    skillsCovered: ['Python Programming', 'Data Structures', 'OOP', 'Problem Solving'],
    description: '40-hour comprehensive course offered by Microsoft through Skill India Digital Hub validating algorithmic problem solving and Python programming.',
    verifyUrl: 'https://www.skillindiadigital.gov.in',
  },
  {
    id: 'introduction-to-css',
    title: 'Introduction to CSS',
    issuer: 'Sololearn',
    issueDate: '2026',
    credentialId: 'CC-I11VN2OO',
    image: cssCertificate,
    skillsCovered: ['CSS3', 'Responsive Layouts', 'Flexbox', 'Web Styling'],
    description: 'Course certificate demonstrating theoretical and practical mastery of modern CSS styling, web layout systems, and responsive design.',
    verifyUrl: 'https://www.sololearn.com/certificates',
  },
  {
    id: 'frontend-web-development',
    title: 'Front-end Web Development',
    issuer: 'Reliance Foundation Skilling Academy (Skill India Digital)',
    issueDate: '2026',
    hours: '240 Hours',
    credentialId: 'RFSA-SIDH-300526',
    image: frontendCertificate,
    skillsCovered: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Front-end Architecture'],
    description: 'Extensive 240-hour professional skilling program in front-end development, responsive UI engineering, and web applications through Skill India Digital.',
    verifyUrl: 'https://www.skillindiadigital.gov.in',
  },
];
