<script lang="ts">
  import { Guns, type GunDefinition } from "@suroi/common/src/definitions/guns";
  import {
    averageDamage,
    averageDamageFromRanges,
    shootGunFromRanges,
  } from "./calculators";
  import Graph from "./Graph.svelte";

  let trials = 1;
  let min = 0;
  let max = 50;
  let increments = 100;

  let gunID: string = "ak47";

  let dimensions = {
    x: 500,
    y: 500,
  };

  $: Gun = Guns.find((a) => {
    return gunID === a.idString;
  });

  $: damages = shootGunFromRanges(Gun ?? Guns[0], trials, min, max, increments);
</script>

<div class="flex flex-row gap-2 border-black border">
  <p>Gun ID:</p>
  <input type="text" bind:value={gunID} class="grow" />
</div>

<div class="mx-auto">
  {#if Gun}
    <p>Max Range: {max}</p>
    <input type="range" min="1" max="200" bind:value={max} />
    <p>Amount of trial shots (at each range): {trials}</p>
    <input type="range" min="1" max="500" bind:value={trials} />
    <p>Amount of ranges: {increments}</p>
    <input type="range" min="1" max="500" bind:value={increments} />
    <Graph
      data={damages}
      title="Real damage of {Gun.name}"
      axis={{ x: "Range", y: "Damage" }}
      lines={false}
    />

    <details>
      <summary>CSV</summary>
      <p>Click to select all</p>
      <div class="select-all p-4 text-xs bg-gray-800 text-gray-200">
        <code>
          {#each damages as damage}
            {damage.x},{damage.y}
            <br />
          {/each}
        </code>
      </div>
    </details>
  {:else}
    <p>Invalid gun id</p>
    <details>
      <summary>List of gun ids</summary>
      {#each Guns as gun}
        <li>{gun.idString}</li>
      {/each}
    </details>
  {/if}
</div>
