// Sample data structure for internships
export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "remote" | "onsite" | "hybrid";
  duration: string;
  description: string;
  requirements: string[];
  tags: string[];
}

export const sampleInternships: Internship[] = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company: "Tech Corp",
    location: "San Francisco, CA",
    type: "hybrid",
    duration: "3 months",
    description: "Work on cutting-edge web applications",
    requirements: ["React", "TypeScript", "Node.js"],
    tags: ["Engineering", "Full-Stack", "Web Development"],
  },
];
