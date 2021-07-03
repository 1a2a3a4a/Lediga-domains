import type { DomainData } from '$lib/types';
// GET domains
export const get: any = () => {
	const seUrl = 'https://data.internetstiftelsen.se/bardate_domains.json';
	const nuUrl = 'https://data.internetstiftelsen.se/bardate_domains_nu.json';
	const result = Promise.all(
		[seUrl, nuUrl].map((url) =>
			fetch(url)
				.then((r) => r.json() as Promise<DomainData[]>)
				.catch((error) => error)
		)
	)
    return result;
};


