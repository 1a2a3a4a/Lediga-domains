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
					[seUrl, nuUrl]
						.map((url) =>
							fetch(url)
								.then((r) => r.json())
								.catch((error) => error)
						)
						.flat()
				);
				result = result[0].data.concat(result[1].data);
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
	export let filterDomain = "Alla";
	$: filteredDomains = filterDomain == "Alla" ? domains : domains.filter(x => x.name.includes(filterDomain));
	
</script>

<svelte:head>
	<title>Lediga Domäner</title>
</svelte:head>

<div>
	<h1>Hitta domäner</h1>
	<div>
		<fieldset>
			<legend>Välj domän filter</legend>
			<div>
				<label for="choice0">Alla</label>
				<input
				bind:group={filterDomain}
				value={"Alla"}
				type="radio"
				id="choice0"
				name="site"
				checked
			  />
			  <input
				bind:group={filterDomain}
				value={".se"}
				type="radio"
				id="choice1"
				name="site"
			  />
			  <label for="choice1">.se</label>
			  <input
				bind:group={filterDomain}
				value={".nu"}
				type="radio"
				id="choice2"
				name="site"
			  />
			  <label for="choice2">.nu</label>
			</div>
		  </fieldset>
	</div>
	<table>
		<caption>Domäner och deras releasedatum</caption>
		<tr>
			<th scope="col"><button>Domännamn</button></th>
			<th scope="col"><button>Releasedatum</button></th>
		</tr>
		{#each filteredDomains.slice(0, 10) as domain}
			<tr>
				<td>
					{domain.name}
				</td>
				<td>
					{domain.release_at}
				</td>
			</tr>
		{/each}
	</table>
	<ul />
</div>

<style>
</style>
