export type Card = {
  id: number;
  title: string;
  brief: string;
  createdAt: Date;
  image?: string;
  tags: string[];
}