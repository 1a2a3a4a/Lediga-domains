import type { DomainData } from './types';
import { data } from './dev-data';
import { dev } from '$app/env';
//Holds the data as a cache in memory on server
//We don't want to request the json data every page request
class DataCache {
	public domainData: DomainData[] = [];
	constructor() {}

	async fetchData() {
		let result;
		if (dev) {
            this.domainData = data.map(x => ({name: x.name, release_at: new Date(x.release_at)}));
		} else {
			const seUrl = 'https://data.internetstiftelsen.se/bardate_domains.json';
			const nuUrl = 'https://data.internetstiftelsen.se/bardate_domains_nu.json';
			result = await Promise.all(
				[seUrl, nuUrl]
					.map((url) =>
						fetch(url)
							.then((r) => r.json())
							.catch((error) => error)
					)
					.flat()
			);
            this.domainData = result[0].data.concat(result[1].data);
		}
	}
}

export default new DataCache();
