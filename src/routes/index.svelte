<script context="module" lang="ts">
	import type { DomainData } from '$lib/types';
	const start = 0;
	const end = 10;
	export async function load({ page, fetch, session, context }) {
		try {
			const res = await fetch(`/domains.json?startIndex=${start}&endIndex=${end}`);
			if (res.ok) {
				const data = await res.json();
				if (data.domains.length > 0) {
					return {
						status: 200,
						maxage: 72000,
						props: {
							domains: data.domains,
							start: start,
							end: end
						}
					};
				}
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
	export let start: number;
	export let end: number;
	let canLoadMore = true;
	let filterDomain = 'Alla';
	let sortNameclick = false;
	let sortReleaseDateClick = false;
	let searchQuery = '';
	let filteredDomains = domains;
	let pressedLoadMore = false;

	function sortDate() {
		filteredDomains = sortReleaseDateClick
			? filteredDomains.sort(
					(a, b) => new Date(a.release_at).getTime() - new Date(b.release_at).getTime()
			  )
			: filteredDomains.sort(
					(a, b) => new Date(b.release_at).getTime() - new Date(a.release_at).getTime()
			  );
		sortReleaseDateClick = !sortReleaseDateClick;
	}

	function sortName() {
		filteredDomains = sortNameclick
			? filteredDomains.sort((a, b) => (a.name < b.name ? 1 : -1))
			: filteredDomains.sort((a, b) => (a.name > b.name ? 1 : -1));
		sortNameclick = !sortNameclick;
	}

	async function loadMore() {
		start += 10;
		end += 10;

		pressedLoadMore = true;
		const res = await fetch(
			`/domains.json?startIndex=${start}&endIndex=${end}&searchQuery=${searchQuery}`
		);
		if (res.ok) {
			const data = await res.json();
			filteredDomains = filteredDomains.concat(data.domains);
			if (data.domains.length == 0) {
				canLoadMore = false;
			}
		}
	}

	async function autoComplete() {
		start = 0;
		end = 10;
		pressedLoadMore = false;
		if (searchQuery.length > 0) {
			const res = await fetch(`/domains/autocomplete.json?searchQuery=${searchQuery}`);
			if (res.ok) {
				const data = await res.json();
				filteredDomains = data.domains;
				canLoadMore = data.canLoadMore;
			}
		} else {
			//reset
			filteredDomains = domains;
		}
	}
</script>

<svelte:head>
	<title>Lediga Domäner</title>
</svelte:head>

<div>
	<h1>Hitta domäner</h1>
	<p>
		Tabellen visar .se- och .nu-domäner som snart kan bli lediga. Använd sök och andra funktioner
		för att filtrera och hitta domäner.
	</p>
	<div class="options-container">
		<div class="search-container">
			<label class="search-label" for="search">Sök på domän</label>
			<input
				on:keyup={() => autoComplete()}
				bind:value={searchQuery}
				class="search-input"
				id="search"
				type="search"
			/>
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

	<table class="domains-table">
		<caption>Domäner och deras förfallodatum</caption>
		<tr>
			<th scope="col"
				><button class="filter-button" on:click={sortName}
					><span class={sortNameclick ? 'filter-button-up' : 'filter-button-down'}>Domännamn</span
					><span class="sr-only">, sorterad på {sortNameclick ? 'stigande' : 'fallande'}</span
					></button
				></th
			>
			<th scope="col"
				><button class="filter-button" on:click={sortDate}
					><span class={sortReleaseDateClick ? 'filter-button-down' : 'filter-button-up'}
						>Förfallodatum</span
					><span class="sr-only"
						>, sorterad på {sortReleaseDateClick ? 'fallande' : 'stigande'}</span
					></button
				></th
			>
			<th scope="col"><span>Läs mer om siten</span></th>
		</tr>

		{#each filteredDomains as domain}
			{#if domain.name.includes(filterDomain) || filterDomain == 'Alla'}
				<tr>
					<td class="relative">
						<a href="//{domain.name}" target="_blank">{domain.name}</a>
					</td>
					<td>
						{domain.release_at}
					</td>
					<td>
						<a href="/domain/{domain.name}">Mer info</a>
					</td>
				</tr>
			{/if}
		{/each}
	</table>
	{#if filteredDomains.length == 0}
		<p>Hittade inte eller kunde inte ladda in data.</p>
	{/if}
	{#if canLoadMore && filteredDomains.length > 0}
		<button class="load-more-button" on:click={loadMore}>Ladda fler</button>
	{/if}
	{#if pressedLoadMore && !canLoadMore}
		<p aria-live="polite">Hittade inte mer data.</p>
	{/if}
</div>

<style>
	.options-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.domains-table {
		margin: 1rem 0;
	}
	.search-container {
		padding: 0 10%;
		margin: 1rem 0;
	}
	.search-label {
		font-size: 1.6rem;
	}
	.search-input {
		width: 100%;
		padding: 0.5rem;
		font-size: 1.5rem;
	}
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
		text-decoration: underline;
	}

	.filter-button:hover {
		color: var(--accent-color);
	}
	.filter-button:focus {
		color: var(--accent-color);
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

	.load-more-button {
		padding: 0.6rem 1.3rem;
		font-size: 1.2rem;
		font-weight: bold;
		cursor: pointer;
	}
	.load-more-button:hover {
		background-color: #fff600;
	}
	.load-more-button:focus {
		background-color: #fff600;
	}
	.load-more-button:hover:focus {
		text-decoration: underline;
	}
</style>
