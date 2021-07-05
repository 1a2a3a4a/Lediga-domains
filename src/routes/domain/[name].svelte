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
				error: new Error(`Could not load ${url}`),
                props: {
                    domain: null
                }
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
    function isFish(pet: DomainPage): pet is DomainPage {
   return (<DomainPage>pet).domain !== undefined;
}

</script>

<div>
    <h1>Domäninformation</h1>
    <div class="center">För mer information, sök på domänen på 
        <a href="https://internetstiftelsen.se/sok-doman/?domain={domain.domain}">internetstiftelsen</a>
    </div>
    {#if domain == null}
         <div>
            Vi kunde inte ladda datat.
         </div>
    {/if}
	<table>
        <caption>Information om domänen {domain.domain}</caption>
        <tr>
            <th scope="row">Domännamn</th>
            <td>{domain.domain}</td>
        </tr>
        <tr>
            <th scope="row">Innehavare (kontakt-ID)
            </th>
            <td>{domain.holder}</td>
        </tr>
        <tr>
            <th scope="row">Administrativ kontakt (kontakt-ID)</th>
            <td>{domain.adminc}</td>
        </tr>
        <tr>
            <th scope="row">Teknisk kontakt (kontakt-ID)	</th>
            <td>{domain.techc}</td>
        </tr>
        <tr>
            <th scope="row">Avimottagare (kontakt-ID)</th>
            <td>{domain.billingc}</td>
        </tr>
        <tr>
            <th scope="row">Domänstatus</th>
            <td>{domain.state}</td>
        </tr>
        <tr>
            <th scope="row">Skapad
            </th>
            <td>{domain.created}</td>
        </tr>
        <tr>
            <th scope="row">Senast ändrad
            </th>
            <td>{domain.modified}</td>
        </tr>
        <tr>
            <th scope="row">Förfallodatum
            </th>
            <td>{domain.expires}</td>
        </tr>
        <tr>
            <th scope="row">Deaktiveringsdatum
            </th>
            <td>{domain.deactivationdate}</td>
        </tr>
        <tr>
            <th scope="row">Avregistreringsdatum</th>
            <td>{domain.date_to_delete}</td>
        </tr>
        <tr>
            <th scope="row">Datum för frisläppande
            </th>
            <td>{domain.date_to_release}</td>
        </tr>
        <tr>
            <th scope="row">Namnserver
            </th>
            <td>{domain.nserver}</td>
        </tr>
        <tr>
            <th scope="row">DNSSEC</th>
            <td>{domain.dnssec}</td>
        </tr>
        <tr>
            <th scope="row">Status</th>
            <td>{domain.status}</td>
        </tr>
        <tr>
            <th scope="row">Registrar</th>
            <td>{domain.registrar}</td>
        </tr>
       
</div>


<style>
    .center {
        text-align: center;
    }
</style>