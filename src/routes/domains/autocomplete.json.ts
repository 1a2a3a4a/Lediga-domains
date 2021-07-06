import dataCache from '$lib/dataCacheSingleton';

export const get = (request) => {
	const query = request.query.get('q');
	const regex = new RegExp(query, 'gi');
	const data = dataCache.domainData.filter((x) => x.name.match(regex));
	return {
		status: 200,
		body: data
	};
};
