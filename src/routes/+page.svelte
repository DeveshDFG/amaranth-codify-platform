<script lang="ts">
import { Button } from "carbon-components-svelte";
import Line from "$lib/components/Line.svelte";
import { sleep } from "$lib/util";

let headlineElement: HTMLHeadingElement;

const headlines = [
  "Spark Interest, Drive Real Results",
  "Transform Leads into Loyal Customers",
  "Empower Your Sales Journey",
  "Unlock Your Marketing Potential",
];

let currentHeadlineIndex = 0;
let currentHeadline = headlines[currentHeadlineIndex];
let currentMessage = "";

async function animateHeadlines() {
  while (true) {
    const headline = headlines[currentHeadlineIndex];
    // Type out headline
    for (let i = 1; i <= headline.length; i++) {
      currentMessage = headline.slice(0, i);
      await sleep(50);
    }
    await sleep(1200);
    // Delete headline
    for (let i = headline.length; i >= 0; i--) {
      currentMessage = headline.slice(0, i);
      await sleep(30);
    }
    await sleep(300);
    // Move to next headline
    currentHeadlineIndex = (currentHeadlineIndex + 1) % headlines.length;
  }
}

animateHeadlines();
</script>

<div class="container">
    <h1>We Coach, <strong>You Close</strong></h1>
    <h3 bind:this={headlineElement}>{currentMessage}<span class="cursor">|</span></h3>
    <Line thickness={1} style="dotted"/>
    <a href="/sign-up"><h2>Get Started</h2></a>
</div>

<style>
    @keyframes blink {
        50% {
            opacity: 0;
        }
    }

    * {
        text-align: center;
    }
    div.container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 10em);
        gap: 1em;
    }

    h3 > .cursor {
        animation: blink 1s step-start 0s infinite;
    }

    a {
        text-decoration: none;
        display: inline-block;
        background: var(--cds-text-primary);
        padding: 0.5em 1em;
        color: var(--cds-ui-background);
        transition: transform 0.2s ease;
    }

    a:hover {
        transform: scale(1.05);
    }

    h2 {
        cursor: pointer;
    }

</style>