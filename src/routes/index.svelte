<script context="module" lang="ts">
	import { dev } from '$app/env';
	import type { DomainData } from '$lib/types';
	import { data } from './domains/dev-data';
	export const prerender = true;

	export async function load({ page, fetch, session, context }) {
		let result = [];
		try {
			if (dev) {
				result = data;
			} else {
				const seUrl = 'https://data.internetstiftelsen.se/bardate_domains.json';
				const nuUrl = 'https://data.internetstiftelsen.se/bardate_domains_nu.json';
				result = await Promise.all(
					[seUrl, nuUrl].map((url) =>
						fetch(url)
							.then((r) => (r.json()))
							.catch((error) => error)
					).flat()
				);
				result = (result[0].data).concat(result[1].data)
			}

			if (result.length > 0) {
				return {
					status: 200,
					maxage: 86400,
					props: {
						domains: result
					}
				};
			}
		} catch (error) {
			return {
				status: 500,
				error: new Error(`Could not fetch domain data ${error}`)
			};
		}
	}
</script>

<script lang="ts">
	export let domains: DomainData[];
</script>

<svelte:head>
	<title>Lediga Domäner</title>
</svelte:head>

<div>
	<ul>
		{#each domains.slice(0, 10) as domain}
			<li>
				<span>
					{domain.name}
				</span>
				<span>
					{domain.release_at}
				</span>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
