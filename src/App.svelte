<script lang="ts">
  import GunGraphAverage from "./lib/GunGraphAverage.svelte";
  import GunGraphSimulated from "./lib/GunGraphSimulated.svelte";
</script>

<div class="bg-gray-100 @dark:bg-gray-800 text-black @dark:text-white flex min-w-screen min-h-screen">
  <div class="max-w-prose mx-auto my-36 font-mono">
    <h1 class="text-2xl font-black">Gunstat v0.1</h1>

    <p>
      A gun statistcs generator for the open source video game <a
        href="https://suroi.io">Suroi.io</a
      >
      <br />
      Gunstat can be used to calculate gun graphs for now. This program is in its
      early stages and will have updates.
    </p>

    <a class="text-blue-500" href="#gun-graph">Open Gun Graph</a>

    <div id="gun-graph" class="hidden target:block">
      <GunGraphSimulated />
    </div>
    <hr />
    <p>
      Made by <a class="text-blue-500" href="https://kenos.codeberg.page"
        >Kenos</a
      >
    </p>
    <p class="text-sm text-gray-500">Built with Svelte, Vite, and Unocss</p>
  </div>
</div>
