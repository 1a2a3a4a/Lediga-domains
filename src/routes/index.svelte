<script context="module" lang="ts">
	import { dev } from '$app/env';
	import type { DomainData } from '$lib/types';
	import { data } from './domains/dev-data';
	export const prerender = true;

	export async function load({ page, fetch, session, context }) {
		let result = [];
		if(!dev) {
			result = data;
		} else {
			result = await fetch('/domains/domains.json');
		}
		//TODO: Return status, return good error message
		//How to handle errors here?
		if (result.length > 0) {
			return {
				status: 200,
				maxage: 86400,
				props: {
					domains: result
				}
			};
		}

		return {
			status: 500,
			error: new Error(`Could not load url or urls`)
		};
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
			{domain.name}
		</li>
		{/each}
	</ul>
</div>


<style>
</style>
