<script>
  export let hours = [];
  export let slotHeight = 68;
  export let formatHour = (h) => `${h}:00`;
</script>

<div class="w-[88px] border-r border-[#e5e7eb] bg-[#fcfcfd] dark:border-[#334155] dark:bg-[#0f172a] transition-colors">
  {#each hours as h}
    <div
      class="flex items-start border-b border-[#eef0f3] px-3 py-2 text-[13px] text-[#374151] last:border-b-0 dark:border-[#334155] dark:text-gray-400 transition-colors"
      style={`height:${slotHeight}px;`}
    >
      {formatHour(h)}
    </div>
  {/each}
</div>
