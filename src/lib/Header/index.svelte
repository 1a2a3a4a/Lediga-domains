<script lang="ts">
	import { page } from '$app/stores';
	let path = '';
	page.subscribe((p) => {
		path = p.path;
	});
</script>

<header>
	<a class="skip-to-content-link" href="#main"> Skippa till huvudinnehåll </a>

	<nav aria-label="huvudmeny">
		<ul>
			<li>
				<a
					class={path == '/' ? 'current' : ' '}
					aria-current={path == '/' ? 'page' : 'false'}
					href="/">Hem</a
				>
			</li>
			<li>
				<a
					class={path == '/about' ? 'current' : ' '}
					aria-current={path == '/about' ? 'page' : 'false'}
					href="/about">Om webbplatsen</a
				>
			</li>
		</ul>
	</nav>
</header>

<style>
	.skip-to-content-link {
		background-color: var(--bg-color);
		height: 2rem;
		left: 50%;
		padding: 8px;
		position: absolute;
		transform: translateY(-110%);
		transition: transform 0s;
		text-transform: uppercase;
	}

	.skip-to-content-link:focus {
		transform: translateY(0%);
	}

	header {
		display: flex;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
	}

	li {
		position: relative;
		height: 100%;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		margin: 0 0.5rem;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
	}
	.current {
		border-bottom: 1px solid var(--pure-white);
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
