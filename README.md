#Lediga Domains

Visar upp alla .se- och .nu-domäner som snart kan bli lediga med data från [internetstiftelsen
](internetstiftelsen.se)

Byggd med SvelteKit.
Datat hämtas en gång från två json filer när servern startas och en gång per dag och lagras sedan i minnet som en cache. 

Datat till varje sida hämtas genom ett post anrop till https://internetstiftelsen.se/wp-json/iis/v1/free/whois