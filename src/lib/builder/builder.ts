export const blogBriefBuilder = (brief: string) => {
	const briefRegex = /#####\s+(.+)/g;
	const matches = [...brief.matchAll(briefRegex)];
	const h4Briefs = matches.map((match) => match[1].trim())[0];
	return h4Briefs;
};

