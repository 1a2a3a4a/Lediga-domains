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
				result = result[0].data.concat(result[1].data)
			}

			if (result.length > 0) {
				return {
					status: 200,
					maxage: 86400,
					props: {
						domains: result.sort((a, b) => new Date(a.release_at).getTime() - new Date(b.release_at).getTime())
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
	export let filterDomain = 'Alla';
	export let sortNameclick = false;
	export let sortReleaseDateClick = false;
	let filteredDomains = domains;
	$: filteredDomains =
		filterDomain == 'Alla' ? domains : domains.filter((x) => x.name.includes(filterDomain));

	function sortDate() {
		filteredDomains = sortReleaseDateClick
			? filteredDomains.sort((a, b) => new Date(a.release_at).getTime() - new Date(b.release_at).getTime())
			: filteredDomains.sort((a, b) => new Date(b.release_at).getTime() - new Date(a.release_at).getTime());
		sortReleaseDateClick = !sortReleaseDateClick;
	}

	function sortName() {
		filteredDomains = sortNameclick
			? filteredDomains.sort((a, b) => (a.name < b.name ? 1 : -1))
			: filteredDomains.sort((a, b) => (a.name > b.name ? 1 : -1));
		sortNameclick = !sortNameclick;
	}

	$: sortName;
	$: sortDate;

</script>

<svelte:head>
	<title>Lediga Domäner</title>
</svelte:head>

<div>
	<h1>Hitta domäner</h1>
	<div>
		<div>
			<label for="search">Sök på domän</label>
			<input id="search" type="text" />
		</div>
		<fieldset>
			<legend>Välj domän filter</legend>
			<div>
				<label for="choice0">Alla</label>
				<input
					bind:group={filterDomain}
					value={'Alla'}
					type="radio"
					id="choice0"
					name="site"
					checked
				/>
				<input bind:group={filterDomain} value={'.se'} type="radio" id="choice1" name="site" />
				<label for="choice1">.se</label>
				<input bind:group={filterDomain} value={'.nu'} type="radio" id="choice2" name="site" />
				<label for="choice2">.nu</label>
			</div>
		</fieldset>
	</div>
	<table>
		<caption>Domäner och deras releasedatum</caption>
		<tr>
			<th scope="col"><button class="filter-button" on:click={sortName}><span class="{sortNameclick ? 'filter-button-up' : 'filter-button-down'}">Domännamn</span></button></th>
			<th scope="col"><button class="filter-button" on:click={sortDate}><span class="{sortReleaseDateClick ? 'filter-button-down' : 'filter-button-up'}">Releasedatum</span></button></th>
			<th scope="col"><span>Läs mer om siten</span></th>
		</tr>
		{#each filteredDomains.slice(0, 10) as domain}
			<tr>
				<td class="relative">
					<a href=//{domain.name} target="_blank">{domain.name}</a>
				</td>
				<td>
					{domain.release_at}
				</td>
				<td>
					<a href=/domain/{domain.name}>Mer info</a>
				</td>
			</tr>
		{/each}
	</table>
	<ul />
</div>

<style>
	.relative {
		position: relative;
	}
	.filter-button {
		width: 100%;
		border: none;
		padding: 0.1rem;
		background: none;
		cursor: pointer;
		color: white;
		font-weight: bold;
	}

	.filter-button:hover {
		text-decoration: underline;
	}
	.filter-button:focus {
		text-decoration: underline;
	}
	.filter-button:focus:hover {
		background-color: #2d2d2d;
	}

	.filter-button-up::after {
		content: '\1F815';
		margin-left: 0.2rem;
	}

	.filter-button-down::after {
		content: '\1F817';
		margin-left: 0.2rem;
	}

	fieldset {
		border: 5px solid white;
    	border-style: dotted;

		
	}
	label {
			font-size: 1.2rem;
		}
	table {
		width: 100%;
		border: 1px solid white;
		border-radius: 5px;
	}

	caption {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	td {
		font-size: 1.2rem;
		padding: 1rem;
	}

		
	
</style>
