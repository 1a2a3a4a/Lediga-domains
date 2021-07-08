import dataCache from '$lib/dataCacheSingleton';

export const get = (request) => {
	const start = request.query.get('startIndex');
	const end = request.query.get('endIndex');
	const searchQuery = request.query.get('searchQuery');
	
	if (dataCache.domainData.length >= end && start > -1) {
		let domains = dataCache.domainData;
		if (searchQuery?.length > 1) {
			const regex = new RegExp(searchQuery, 'gi');
			domains = domains.filter((x) => x.name.match(regex));
		}
		domains = domains.slice(start, end);
		return {
			status: 200,
			body: {
				domains: domains,
				canLoadMore: end < domains.length
			}
		};
	} else {
		return {
			status: 400,
			body: {
				error: 'bad params'
			}
		};
	}
};
