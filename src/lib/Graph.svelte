<script lang="ts">
  export let data: any[];
  export let title: string;
  export let axis: any = { x: "x", y: "y" };
  export let lines: boolean = true;

  let max = {
    x: Math.max(...data.map((o) => o.x)),
    y: Math.max(...data.map((o) => o.y)),
  };

  let padding = 30;

  let dimensions = {
    x: 500,
    y: 500,
  };

  let scale = {
    x: (dimensions.x - padding * 2) / max.x - Math.min(...data.map((o) => o.x)),
    y: ((dimensions.y - padding * 2) / max.y) * -1,
  };
</script>

<svg
  width={dimensions.x}
  height={dimensions.y}
  style="max-width: {dimensions.x}; max-height: {dimensions.y}"
>
  <!--- Plot -->
  <g fill="red" stroke="red">
    {#each data as point, i}
      {#if lines}
        {#if i > 0}
          <line
            x1={data[i - 1].x * scale.x + padding}
            x2={point.x * scale.x + padding}
            y1={data[i - 1].y * scale.y - padding + dimensions.y}
            y2={point.y * scale.y - padding + dimensions.y}
          />
        {/if}
      {:else}
        <circle
          cx={point.x * scale.x + padding}
          cy={point.y * scale.y - padding + dimensions.y}
          r="1"
        />
      {/if}
    {/each}
  </g>
  <!-- Axis Text-->
  <g fill="gray" text-anchor="middle" class="font-mono">
    <text x={dimensions.x / 2} y={padding / 2}>{title}</text>
    <text
      x={padding / 2}
      y={dimensions.y / 2}
      style="transform-box: fill-box"
      class="origin-center rotate-90">{axis.y}</text
    >
    <text
      x={dimensions.x / 2}
      y={dimensions.y - padding / 2}
      class="text-lg text-center align-middle">{axis.x}</text
    >
    <text x={padding} y={padding - 5}>
      {max.y.toFixed(2)}
    </text>
    <text
      text-anchor="start"
      x={dimensions.x - padding + 5}
      y={dimensions.y - padding}>{max.x.toFixed(2)}</text
    >
  </g>
  <!-- Axis -->
  <g stroke="gray" stroke-width="2" stroke-linecap="round">
    <line x1={padding} y1={padding} x2={padding} y2={dimensions.y - padding} />
    <line
      x1={padding}
      y1={dimensions.y - padding}
      x2={dimensions.x - padding}
      y2={dimensions.y - padding}
    />
  </g>
  <!-- Hover Text -->
  <g text-anchor="middle" class="text-[15px]">
    {#each data as point}
      <g>
        <line
          x1={point.x * scale.x + padding}
          x2={point.x * scale.x + padding}
          y1={padding}
          y2={dimensions.y - padding}
          stroke-width="5"
          class="peer stroke-white opacity-0 hover:stroke-gray hover:opacity-100"
        />
        <rect
          x={point.x * scale.x + padding - 150 / 2}
          y={point.y * scale.y - padding + dimensions.y - 45 / 2}
          width="150"
          height="45"
          fill="black"
          class="opacity-0 peer-hover:opacity-100"
        />
        <text
          x={point.x * scale.x + padding}
          y={point.y * scale.y - padding + dimensions.y}
          fill="white"
          class="opacity-0 peer-hover:opacity-100"
        >
          {axis.x}: {point.x.toFixed(2)}
        </text>
        <text
          x={point.x * scale.x + padding}
          y={point.y * scale.y - padding + dimensions.y + 15}
          fill="white"
          class="opacity-0 peer-hover:opacity-100"
        >
          {axis.y}: {point.y.toFixed(2)}
        </text>
      </g>
    {/each}
  </g>
</svg>
