import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { Profile } from '../models/Profile.js';
import { Skill } from '../models/Skill.js';
import { Education } from '../models/Education.js';
import { Experience } from '../models/Experience.js';
import { Project } from '../models/Project.js';
import { Certification } from '../models/Certification.js';
import { Achievement } from '../models/Achievement.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { SiteSettings } from '../models/SiteSettings.js';

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing collections...');
    await Admin.deleteMany({});
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await Certification.deleteMany({});
    await Achievement.deleteMany({});
    await ContactMessage.deleteMany({});
    await SiteSettings.deleteMany({});

    // 1. Seed Admin
    console.log('Seeding Admin account...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.local';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await Admin.create({
      username: 'admin',
      email: adminEmail,
      passwordHash,
    });
    console.log(` Admin created: ${adminEmail} (password: ${adminPassword})`);

    // 2. Seed Profile
    console.log('Seeding Student Profile...');
    await Profile.create({
      fullName: 'Aarav Sharma',
      tagline: 'Aspiring Software Engineer & Full-Stack Developer',
      headline: '3rd Year Information Technology Undergrad specializing in resilient web platforms, cloud computing & distributed systems.',
      roles: [
        'Full Stack Web Developer',
        '3rd-Year B.Tech IT Student',
        'Cloud & DevOps Enthusiast',
        'Competitive Programmer & Open Source Contributor',
      ],
      bio: 'Enthusiastic and analytical 3rd-year Information Technology engineering student with a solid foundation in Data Structures, Algorithms, Full-Stack Web Development, and Cloud infrastructure. Eager to solve real-world problems by building high-performance, accessible, and scalable digital solutions.',
      aboutStory: 'Currently in my 6th semester of B.Tech in Information Technology. My coding journey started with C++ and object-oriented design, progressing into modern web ecosystems with React, TypeScript, Node.js, and cloud deployments. I enjoy optimizing algorithms (solved 400+ problems across LeetCode & Codeforces), collaborating on open-source repositories, and turning innovative engineering concepts into tangible web applications.',
      careerGoals: 'Actively seeking Software Development Engineer (SDE) Internships & Summer 2026 roles where I can contribute to mission-critical systems, collaborate with engineering leaders, and deepen my expertise in cloud-native architectures.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      resumeUrl: '/sample-resume.pdf',
      email: 'aarav.sharma.it@example.com',
      phone: '+91 98765 43210',
      location: 'Bengaluru, India',
      collegeName: 'National Institute of Technology Karnataka (NITK)',
      department: 'Department of Information Technology',
      graduationYear: 2027,
      currentYear: '3rd Year B.Tech (6th Semester)',
      socialLinks: {
        github: 'https://github.com/aaravsharma-it',
        linkedin: 'https://linkedin.com/in/aaravsharma-it',
        twitter: 'https://x.com/aarav_dev',
        instagram: 'https://instagram.com/aarav_codes',
        leetcode: 'https://leetcode.com/aarav_codes',
        codechef: 'https://codechef.com/users/aarav_nitk',
        hackerrank: 'https://hackerrank.com/aarav_sharma',
      },
      stats: {
        projectsCount: 6,
        certificationsCount: 4,
        solvedProblemsCount: 420,
        gpa: '8.92 / 10.0 CGPA',
      },
      availableForHire: true,
    });

    // 3. Seed Skills
    console.log('Seeding Skills...');
    const skillsData = [
      { name: 'React.js', category: 'Frontend', proficiency: 92, iconName: 'Atom', featured: true, order: 1 },
      { name: 'TypeScript', category: 'Frontend', proficiency: 88, iconName: 'FileCode2', featured: true, order: 2 },
      { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 94, iconName: 'Code', featured: true, order: 3 },
      { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 95, iconName: 'Palette', featured: true, order: 4 },
      { name: 'Node.js', category: 'Backend', proficiency: 90, iconName: 'Server', featured: true, order: 5 },
      { name: 'Express.js', category: 'Backend', proficiency: 88, iconName: 'Layers', featured: true, order: 6 },
      { name: 'RESTful API Architecture', category: 'Backend', proficiency: 92, iconName: 'Network', featured: true, order: 7 },
      { name: 'Java', category: 'Backend', proficiency: 85, iconName: 'Coffee', featured: true, order: 8 },
      { name: 'Python', category: 'Backend', proficiency: 82, iconName: 'Terminal', featured: false, order: 9 },
      { name: 'MongoDB & Mongoose', category: 'Database', proficiency: 89, iconName: 'Database', featured: true, order: 10 },
      { name: 'PostgreSQL & SQL', category: 'Database', proficiency: 84, iconName: 'Database', featured: true, order: 11 },
      { name: 'Redis (Caching)', category: 'Database', proficiency: 75, iconName: 'Cpu', featured: false, order: 12 },
      { name: 'Docker & Containers', category: 'DevOps & Cloud', proficiency: 80, iconName: 'Box', featured: true, order: 13 },
      { name: 'AWS (S3, EC2, Lambda)', category: 'DevOps & Cloud', proficiency: 78, iconName: 'Cloud', featured: true, order: 14 },
      { name: 'CI/CD (GitHub Actions)', category: 'DevOps & Cloud', proficiency: 76, iconName: 'Workflow', featured: false, order: 15 },
      { name: 'Data Structures & Algorithms', category: 'Core CS', proficiency: 90, iconName: 'Binary', featured: true, order: 16 },
      { name: 'Object-Oriented Programming (OOP)', category: 'Core CS', proficiency: 92, iconName: 'Blocks', featured: true, order: 17 },
      { name: 'Database Management Systems (DBMS)', category: 'Core CS', proficiency: 87, iconName: 'HardDrive', featured: false, order: 18 },
      { name: 'Git & GitHub', category: 'Tools & Other', proficiency: 93, iconName: 'GitBranch', featured: true, order: 19 },
      { name: 'Linux / Bash Scripting', category: 'Tools & Other', proficiency: 82, iconName: 'Terminal', featured: false, order: 20 },
    ];
    await Skill.insertMany(skillsData);

    // 4. Seed Education
    console.log('Seeding Education...');
    const educationData = [
      {
        degree: 'Bachelor of Technology (B.Tech)',
        department: 'Information Technology',
        college: 'National Institute of Technology Karnataka (NITK), Surathkal',
        university: 'National Institute of Technology Karnataka',
        location: 'Mangaluru, Karnataka, India',
        startYear: 2023,
        endYear: 2027,
        current: true,
        score: '8.92 / 10 CGPA (Up to 5th Sem)',
        relevantCoursework: [
          'Data Structures & Algorithms',
          'Database Management Systems',
          'Computer Networks',
          'Operating Systems',
          'Object-Oriented Analysis & Design',
          'Web Technologies',
          'Cloud Computing',
        ],
        description: 'Elected Technical Lead at Web Enthusiasts Club. Active member of ACM Student Chapter. Maintained top academic standing across core technical curricula.',
        order: 1,
      },
      {
        degree: 'Senior Secondary Education (Class XII - CBSE)',
        department: 'Science (Physics, Chemistry, Mathematics, CS)',
        college: 'Delhi Public School (DPS), R.K. Puram',
        university: 'Central Board of Secondary Education (CBSE)',
        location: 'New Delhi, India',
        startYear: 2021,
        endYear: 2023,
        current: false,
        score: '96.4% in Board Examinations',
        relevantCoursework: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science (Python & SQL)', 'English Core'],
        description: 'Ranked in the top 1% nationwide. Won 1st place in Regional Inter-School IT Olympiad 2022.',
        order: 2,
      },
    ];
    await Education.insertMany(educationData);

    // 5. Seed Experience
    console.log('Seeding Experience...');
    const experienceData = [
      {
        company: 'Innovatech Labs',
        position: 'Software Engineering Intern',
        startDate: 'May 2025',
        endDate: 'July 2025',
        isCurrent: false,
        location: 'Bengaluru, India (Hybrid)',
        description: 'Engineered performant full-stack features using React, TypeScript, and Node.js. Optimized MongoDB queries reducing page latency by 35%. Implemented automated unit tests with Jest and integrated CI/CD workflows.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Jest'],
        order: 1,
      },
      {
        company: 'Web Enthusiasts Club (WEC - NITK)',
        position: 'Full-Stack Technical Lead',
        startDate: 'August 2024',
        endDate: 'Present',
        isCurrent: true,
        location: 'NITK Surathkal',
        description: 'Mentored 60+ junior engineering students in modern JavaScript, TypeScript, and API architectures. Architected the annual national hackathon registration portal handling 2,500+ student registrations.',
        technologies: ['TypeScript', 'React', 'Tailored CSS', 'Node.js', 'PostgreSQL', 'Socket.io'],
        order: 2,
      },
    ];
    await Experience.insertMany(experienceData);

    // 6. Seed Projects
    console.log('Seeding Projects...');
    const projectsData = [
      {
        title: 'CampusHub - Student Portal & Resource Hub',
        tagline: 'Comprehensive academic collaboration portal with notes sharing, peer tutoring, and event scheduling.',
        description: 'A full-stack campus collaboration platform developed for university students. Features role-based access for students and faculty, course material exchange with tag search, real-time study group chat, and an interactive timetable viewer.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/aaravsharma-it/campus-hub-portal',
        liveUrl: 'https://campushub-demo.vercel.app',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
        featured: true,
        highlights: [
          'Implemented real-time messaging using Socket.io with sub-second latency across 100+ simulated users.',
          'Designed granular Role-Based Access Control (RBAC) separating student and faculty permissions.',
          'Indexed course materials with MongoDB text queries for instant multi-tag filtering.',
        ],
        order: 1,
      },
      {
        title: 'CloudPulse - Distributed System Health Monitor',
        tagline: 'Lightweight agent and dashboard for monitoring microservices health, CPU, and memory metrics.',
        description: 'Engineered a telemetry dashboard that ingests real-time metrics from background server agents. Visualizes CPU utilization, memory thresholds, response latencies, and service heartbeats with customizable alerts.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Chart.js'],
        category: 'Systems / DevOps',
        githubUrl: 'https://github.com/aaravsharma-it/cloudpulse-monitor',
        liveUrl: 'https://cloudpulse.preview.io',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        featured: true,
        highlights: [
          'Engineered lightweight polling agents reporting container metrics every 5 seconds.',
          'Built responsive visual dashboards using pure CSS layouts and animated metric charts.',
        ],
        order: 2,
      },
      {
        title: 'SecureVault - Zero-Knowledge Encrypted Storage',
        tagline: 'Client-side AES-GCM encrypted file sharing platform with time-decaying access links.',
        description: 'A privacy-first cloud storage prototype that guarantees zero-knowledge encryption. Files are encrypted in the browser before upload, ensuring the server only ever handles encrypted ciphertext.',
        technologies: ['React', 'TypeScript', 'Web Crypto API', 'Express', 'MongoDB', 'AWS S3'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/aaravsharma-it/securevault-crypt',
        liveUrl: 'https://securevault.example.com',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        featured: true,
        highlights: [
          'Applied Web Cryptography API AES-GCM 256-bit client-side encryption keys.',
          'Designed self-destructing access tokens with MongoDB TTL indices.',
        ],
        order: 3,
      },
      {
        title: 'CodeLens - Algorithmic Complexity Visualizer',
        tagline: 'Interactive sandbox visualizing time complexities and memory execution paths of algorithms.',
        description: 'Educational web tool built for computer science students to visualize sorting algorithms, graph traversals, and dynamic programming tables step-by-step with adjustable playback speed.',
        technologies: ['React', 'TypeScript', 'Plain CSS Animations', 'Canvas API'],
        category: 'Frontend',
        githubUrl: 'https://github.com/aaravsharma-it/codelens-visualizer',
        liveUrl: 'https://codelens-algo.vercel.app',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        featured: true,
        highlights: ['Visualizes 12 fundamental sorting and graph traversal algorithms in real-time.'],
        order: 4,
      },
    ];
    await Project.insertMany(projectsData);

    // 7. Seed Certifications
    console.log('Seeding Certifications...');
    const certsData = [
      {
        title: 'AWS Certified Cloud Practitioner (CLF-C02)',
        issuer: 'Amazon Web Services (AWS)',
        issueDate: 'October 2025',
        credentialId: 'AWS-CCP-98745210',
        credentialUrl: 'https://aws.amazon.com/verification',
        badgeImageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=300&q=80',
        skillsCovered: ['Cloud Architecture', 'AWS S3 & EC2', 'IAM & Cloud Security', 'Serverless Basics'],
        featured: true,
        order: 1,
      },
      {
        title: 'Meta Front-End Developer Professional Certificate',
        issuer: 'Meta (via Coursera)',
        issueDate: 'July 2025',
        credentialId: 'META-FED-883921',
        credentialUrl: 'https://coursera.org/verify/professional-cert',
        badgeImageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=300&q=80',
        skillsCovered: ['React.js', 'JavaScript (ES6)', 'Responsive Web Design', 'Version Control & UX Principles'],
        featured: true,
        order: 2,
      },
      {
        title: 'MongoDB Certified Developer Associate',
        issuer: 'MongoDB University',
        issueDate: 'December 2025',
        credentialId: 'MDB-DEV-432109',
        credentialUrl: 'https://university.mongodb.com/credentials',
        badgeImageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=300&q=80',
        skillsCovered: ['Aggregation Framework', 'Schema Design & Data Modeling', 'Indexing & Performance', 'Mongoose ODM'],
        featured: true,
        order: 3,
      },
      {
        title: 'Oracle Certified Associate: Java SE 11 Programmer',
        issuer: 'Oracle University',
        issueDate: 'March 2025',
        credentialId: 'ORCL-JAVA11-77215',
        credentialUrl: 'https://catalog-education.oracle.com/pls/certview',
        badgeImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&q=80',
        skillsCovered: ['Java SE 11', 'Object-Oriented Programming', 'Exception Handling', 'Collections & Generics'],
        featured: true,
        order: 4,
      },
    ];
    await Certification.insertMany(certsData);

    // 8. Seed Achievements
    console.log('Seeding Achievements...');
    const achievementsData = [
      {
        title: 'Winner - National Smart Campus Hackathon 2025',
        description: 'Secured 1st Place out of 180+ university teams for building CampusHub, an offline-resilient campus academic collaboration platform.',
        date: 'March 2025',
        category: 'Hackathon Award',
        awarder: 'IEEE Computer Society & NITK',
        proofUrl: 'https://hackathon.example.com/winners/2025',
        order: 1,
      },
      {
        title: 'Top 1% Global Rank - LeetCode Biweekly Contest',
        description: 'Achieved a peak contest rating of 1892 (Knight rank) and solved 400+ problems across algorithmic paradigms.',
        date: 'January 2026',
        category: 'Coding Contest',
        awarder: 'LeetCode',
        proofUrl: 'https://leetcode.com/aarav_codes',
        order: 2,
      },
      {
        title: 'Academic Merit Scholar Award',
        description: 'Awarded full tuition merit scholarship for maintaining a cumulative GPA > 8.85 across consecutive semesters in Information Technology.',
        date: 'November 2024',
        category: 'Academic Honor',
        awarder: 'Department of Information Technology',
        proofUrl: '',
        order: 3,
      },
    ];
    await Achievement.insertMany(achievementsData);

    // 9. Seed SiteSettings
    console.log('Seeding SiteSettings...');
    await SiteSettings.create({
      navbar: {
        logoText: 'Aarav.dev',
        items: [
          { id: 'home', label: 'Home', href: '#home', isVisible: true, order: 1 },
          { id: 'about', label: 'About', href: '#about', isVisible: true, order: 2 },
          { id: 'skills', label: 'Skills', href: '#skills', isVisible: true, order: 3 },
          { id: 'education', label: 'Education', href: '#education', isVisible: true, order: 4 },
          { id: 'experience', label: 'Experience', href: '#experience', isVisible: true, order: 5 },
          { id: 'projects', label: 'Projects', href: '#projects', isVisible: true, order: 6 },
          { id: 'certifications', label: 'Certifications', href: '#certifications', isVisible: true, order: 7 },
          { id: 'achievements', label: 'Achievements', href: '#achievements', isVisible: true, order: 8 },
          { id: 'resume', label: 'Resume', href: '#resume', isVisible: true, order: 9 },
          { id: 'contact', label: 'Contact', href: '#contact', isVisible: true, order: 10 },
        ],
      },
      home: {
        name: 'Aarav Sharma',
        title: 'Aspiring Software Engineer & Full-Stack Developer',
        introduction: '👋 Hello World, I am',
        description:
          '3rd Year Information Technology Undergrad specializing in resilient web platforms, cloud computing & distributed systems.',
        profilePhotoUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        resumeButtonText: 'Download Resume',
        resumeUrl: '/sample-resume.pdf',
        githubUrl: 'https://github.com/aaravsharma-it',
        linkedinUrl: 'https://linkedin.com/in/aaravsharma-it',
        otherSocials: {
          twitter: 'https://x.com/aarav_dev',
          instagram: 'https://instagram.com/aarav_codes',
          leetcode: 'https://leetcode.com/aarav_codes',
          website: 'https://aaravsharma.dev',
        },
      },
      about: {
        title: 'Driven by Curiosity & Code',
        description:
          'Currently in my 6th semester of B.Tech in Information Technology. My coding journey started with C++ and object-oriented design, progressing into modern web ecosystems with React, TypeScript, Node.js, and cloud deployments.',
        imageUrl:
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        personalInfo: [
          { label: 'Degree', value: 'B.Tech Information Technology' },
          { label: 'College', value: 'NITK Surathkal' },
          { label: 'Year', value: '3rd Year (Batch of 2027)' },
          { label: 'CGPA', value: '8.92 / 10' },
          { label: 'Location', value: 'Bengaluru / Mangaluru, India' },
          { label: 'Email', value: 'aarav.sharma.it@example.com' },
        ],
      },
      resume: {
        resumeUrl: '/sample-resume.pdf',
        fileName: 'Aarav_Sharma_Resume.pdf',
        buttonText: 'Download Full Resume',
        lastUpdated: 'October 2026',
      },
      contact: {
        email: 'aarav.sharma.it@example.com',
        phone: '+91 98765 43210',
        location: 'Bengaluru, India',
        description:
          'I am actively looking for Summer 2026 SDE Internship roles, hackathon collaborations, and open-source opportunities. My inbox is always open!',
        github: 'https://github.com/aaravsharma-it',
        linkedin: 'https://linkedin.com/in/aaravsharma-it',
        instagram: 'https://instagram.com/aarav_codes',
        twitter: 'https://x.com/aarav_dev',
      },
      footer: {
        description:
          '3rd-year Information Technology engineering undergrad passionate about building reliable software, web systems, and cloud infrastructure.',
        copyrightText: '© 2026 Aarav Sharma. All rights reserved.',
        links: [
          { label: 'Home', url: '#home' },
          { label: 'About', url: '#about' },
          { label: 'Skills', url: '#skills' },
          { label: 'Experience', url: '#experience' },
          { label: 'Projects', url: '#projects' },
          { label: 'Contact', url: '#contact' },
        ],
      },
    });

    // 10. Seed Sample Contact Messages
    console.log('Seeding Sample Contact Messages...');
    const messagesData = [
      {
        name: 'Siddharth Roy',
        email: 'siddharth.roy@techinnovate.com',
        subject: 'Inquiry regarding SDE Summer 2026 Internship',
        message: 'Hi Aarav, I came across your CampusHub and SecureVault projects on GitHub. Impressive architecture and clean code! We are hiring Software Engineering interns at TechInnovate and would love to review your application.',
        isRead: false,
        ipAddress: '127.0.0.1',
      },
      {
        name: 'Prof. K. Venkatesh',
        email: 'venkatesh.k@nitk.edu.in',
        subject: 'Invitation to give guest workshop on Modern React & TypeScript',
        message: 'Hello Aarav, The IT department faculty was discussing your recent technical session at WEC. We would like you to conduct a hands-on introductory session on TypeScript and REST APIs for the 2nd-year batch.',
        isRead: true,
        ipAddress: '127.0.0.1',
      },
    ];
    await ContactMessage.insertMany(messagesData);

    console.log('Database seeded successfully with all 3rd-year IT student portfolio data!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
