<script lang="ts">
interface SideNavBarLinkProps {
  label: string;
  path: string;
}

let { label, path }: SideNavBarLinkProps = $props();
</script>

<a href={path}>{label}</a>

<style>
a {
  display: block;
  padding: 0.5em 1em;
  text-decoration: none;
  color: var(--cds-text-01);
  font-size: 1.5em;
  position: relative;
  overflow: hidden;
  border-bottom: none;
}

a:hover {
  border-bottom: none;
}

a::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0.2em;
  transform: translateX(-50%) scaleX(0);
  transform-origin: left;
  width: 80%;
  height: 1px;
  background: currentColor;
  transition: transform 0.3s ease;
}

a:hover::after,
a:focus::after {
  transform: translateX(-50%) scaleX(1);
}
</style>
