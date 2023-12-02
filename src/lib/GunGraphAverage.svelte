<script lang="ts">
  import { Guns, type GunDefinition } from "@suroi/common/src/definitions/guns";
  import { averageDamage, averageDamageFromRanges } from "./calculators";
  import Graph from "./Graph.svelte";

  let gunID: string = "ak47";

  let dimensions = {
    x: 500,
    y: 500
  }

  let Gun = Guns.find((a) => {
    return gunID === a.idString;
  }) ?? Guns[0];

  const damages = averageDamageFromRanges(Gun, 500, 0, 20, 50);
</script>

<input type="text" bind:value={gunID}>

<Graph data={damages} title="Average damage of {Gun.name}" axis={{x: "Range (Game Units)", y: "Damage"}} />

<table>
  <thead>
    <tr>
      <th>Range</th>
      <th>Damage</th>
    </tr>
  </thead>
  <tbody>
    {#each damages as damage}
      <tr>
        <td>{damage.x}</td>
        <td>{damage.y}</td>
      </tr>
    {/each}
  </tbody>
</table>
