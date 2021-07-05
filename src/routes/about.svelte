<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div>
	<h1>Om webbplatsen</h1>
	<p>
		Denna webbplats plockar data från <a href="https://internetstiftelsen.se/">internetstiftelsen</a
		>
	</p>
	<p>
		Data för domäner som kommer att förfallas kommer från deras <a
			href="https://internetstiftelsen.se/domaner/registrera-ett-domannamn/se-och-nu-domaner-som-snart-kan-bli-lediga/"
			>data</a
		>
	</p>
	<p>
		För att hämta data för enskild domän skickas ett POST anrop till <strong
			>https://internetstiftelsen.se/wp-json/iis/v1/free/whois</strong
		>
		där paramatern <code>domain</code> är satt till domännamnet som man söker efter.
	</p>
</div>

<style>
</style>
