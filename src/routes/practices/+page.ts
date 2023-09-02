import type { Practice } from '$lib/types/Practice';
import data from './practice.json'

export const load = async () => {

  const practice = data as Practice[]
  console.log(`Loading`, practice)
	return {practice};
};
