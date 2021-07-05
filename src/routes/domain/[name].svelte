<script context="module">
	import { dev } from '$app/env';
import { mapDomainPage } from '$lib/mapper';
	export async function load({ page, fetch, session, context }) {
		const name = page.params.name;
		let data;
		if (!dev) {
			const url = `https://internetstiftelsen.se/wp-json/iis/v1/free/whois`;
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				body: new URLSearchParams({
					domain: name
				})
			});

			const data = await res.text();
			if (res.ok) {
				return {
					props: {
						domain: mapDomainPage(data)
					}
				};
			}

			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		} else {
			data = {
				state: 'quarantine',
				domain: '157solutions.se',
				holder: 'intern0000-00001',
				'admin-c': '',
				'tech-c': '',
				'billing-c': '',
				created: '2020-04-20',
				modified: '2021-06-29',
				expires: '2021-04-20',
				transferred: '',
				deactivationdate: '2021-04-30',
				date_to_delete: '2021-06-29',
				date_to_release: '2021-07-06',
				dnssec: 'signed delegation',
				'registry-lock': 'unlocked',
				status: 'inactive',
				registrar: 'CoreRegistry 2',
				nserver: ''
			};
			return {
				props: {
					domain: mapDomainPage(data)
				}
			};
		}
	}
</script>

<script lang="ts">
	import type { DomainPage } from '$lib/types';

	export let domain: DomainPage;
</script>

<div>
	{domain}
</div>
