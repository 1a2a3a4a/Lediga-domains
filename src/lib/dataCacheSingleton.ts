import type { DomainData } from './types';
import { data } from './dev-data';
import { dev } from '$app/env';
import schedule from 'node-schedule';

//This works as a singleton
//Holds the data as a cache in memory on server
//We don't want to request the json data every page request
class DataCache {
	public domainData: DomainData[] = [];
	constructor() {
		//Fetch new data everyday 6AM
		const job = schedule.scheduleJob('* * 6 * *', this.fetchData);
		this.fetchData()
	}

	async fetchData() {
		let result;
		if (dev) {
			this.domainData = data
				.map((x) => ({ name: x.name, release_at: x.release_at }))
				.sort((a, b) => new Date(a.release_at).getTime() - new Date(b.release_at).getTime());
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
			this.domainData = result[0].data
				.concat(result[1].data)
				.sort((a, b) => new Date(a.release_at).getTime() - new Date(b.release_at).getTime());
		}
	}
}

export default new DataCache();
