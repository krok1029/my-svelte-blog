export type BlogCard = {
  id: number;
  title: string;
  brief: string;
  createdAt: Date;
  image?: string;
  tags: string[];
}

export type PracticeCard = {
  id: number;
  title: string;
  type: 'css';
  image?: string;
}