import dataCache from '$lib/dataCache';

// GET /todos.json
export const get = (request) => {
	const start = request.query.get('startIndex');
	const end = request.query.get('endIndex');
	if (dataCache.domainData.length >= end && start > -1) {
		const data = dataCache.domainData.slice(start, end);
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
