<script lang="ts">
  import { Guns, type GunDefinition } from "@suroi/common/src/definitions/guns";
  import { averageDamage, averageDamageFromRanges } from "./calculators";
  import Graph from "./Graph.svelte";

  let gunID: string = "ak47";

  let dimensions = {
    x: 500,
    y: 500,
  };

  $: Gun = Guns.find((a) => {
    return gunID === a.idString;
  });

  $: damages = averageDamageFromRanges(Gun ?? Guns[0], 500, 0, 50, 100);
</script>

<div class="flex flex-row gap-2 border-black border">
  <p>Gun ID:</p>
  <input type="text" bind:value={gunID} class="grow" />
</div>

<div class="mx-auto">
  {#if Gun}
    <Graph
      data={damages}
      title="Average damage of {Gun.name}"
      axis={{ x: "Range (Game Units)", y: "Damage" }}
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
