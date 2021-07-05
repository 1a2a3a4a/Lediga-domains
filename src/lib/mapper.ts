import type { DomainPage } from "./types"

export function mapDomainPage(page: any): DomainPage  {
    return {
        state: page.state,
        domain: page.domain,
        holder: page.holder,
        adminc: page["admin-c"],
        techc: page["tech-c"],
        billingc: page["billing-c"],
        created: page.created,
        modified: page.modified,
        expires: page.expires,
        transferred: page.transferred,
        deactivationdate: page.deactivationdate,
        date_to_delete: page.date_to_delete,
        date_to_release: page.date_to_release,
        dnssec: page.dnssec,
        registrylock: page.registrylockm,
        status: page.status,
        registrar: page.registrar,
        nserver: page.nserver
    }
}