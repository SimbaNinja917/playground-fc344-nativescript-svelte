<frame>
  {#if ready}
    <Home />
  {/if}
</frame>

<script lang="ts">
  import { onMount } from 'svelte';
  import Home from './components/Home.svelte';

  let ready = false;

  onMount(() => {
    setTimeout(() => {
      ready = true;
    }, 200); // Adjust the delay as needed for a smooth transition
  });
</script>