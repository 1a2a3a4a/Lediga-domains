import dataCache from '$lib/dataCacheSingleton';

export const get = (request) => {
	const query = request.query.get('searchQuery');
	const regex = new RegExp(query, 'gi');
	const domains = dataCache.domainData.filter((x) => x.name.match(regex));
    const sliced = domains.slice(0, 10);
	return {
		status: 200,
		body: {
            domains: sliced,
            canLoadMore: domains.length > 10
        }
	};
};
