/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	userid: string;
}

export interface DomainData {
	name: string;
	release_at: string;
}

export interface DomainPage {
	state: string;
	domain: string;
	holder: string;
	adminc: string;
	techc: string;
	billingc: string;
	created: string;
	modified: string;
	expires: string;
	transferred: string;
	deactivationdate: string;
	date_to_delete: string;
	date_to_release: string;
	dnssec: string;
	registrylock: string;
	status: string;
	registrar: string;
	nserver: string;
}
