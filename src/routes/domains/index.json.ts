import dataCache from '$lib/dataCacheSingleton';

// GET /todos.json
export const get = (request) => {
	const start = request.query.get('startIndex');
	const end = request.query.get('endIndex');
	const searchQuery = request.query.get('searchQuery');

	if (dataCache.domainData.length >= end && start > -1) {
		let data = dataCache.domainData;
		if (searchQuery?.length > 1) {
			const regex = new RegExp(searchQuery, 'gi');
			data = data.filter((x) => x.name.match(regex));
		}
		data = data.slice(start, end);
		return {
			status: 200,
			body: data
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
