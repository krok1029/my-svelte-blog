import type { PracticeCard } from '$lib/types/Card';
import data from './practice'

export const load = async () => {

  const practice = data as PracticeCard[]
  console.log(`Loading`, practice)
	return {practice};
};
