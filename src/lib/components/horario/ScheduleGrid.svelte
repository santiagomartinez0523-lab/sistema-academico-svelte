<script>
  import TimeColumn from './TimeColumn.svelte';
  import DayHeader from './DayHeader.svelte';
  import ScheduleEvent from './ScheduleEvent.svelte';

  export let days = [];
  export let hours = [];
  export let events = [];
  export let slotHeight = 68;
  export let startHour = 7;
  export let formatHour = (h) => `${h}:00`;
</script>

<div class="overflow-hidden rounded-xl border border-[#d7dce1] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] dark:border-[#334155] dark:bg-[#0f172a] transition-colors duration-200">
  <div class="grid grid-cols-[88px_repeat(5,minmax(0,1fr))] border-b border-[#e5e7eb] bg-[#f8f9fb] dark:border-[#334155] dark:bg-[#1e293b] transition-colors">
    <div class="border-r border-[#e5e7eb] px-3 py-3 text-[13px] font-medium text-[#1f2937] dark:border-[#334155] dark:text-gray-300 transition-colors">Hora</div>
    {#each days as day}
      <DayHeader label={day} />
    {/each}
  </div>

  <div class="flex">
    <TimeColumn {hours} {slotHeight} {formatHour} />

    <div class="grid flex-1 grid-cols-5">
      {#each days as _, dayIndex}
        <div class="relative border-r border-[#e5e7eb] last:border-r-0 dark:border-[#334155] transition-colors" style={`height: ${hours.length * slotHeight}px;`}>
          {#each hours as _}
            <div class="grid place-items-center border-b border-[#eef0f3] text-[20px] text-[#d1d5db] last:border-b-0 dark:border-[#334155] dark:text-[#334155]/60 transition-colors" style={`height:${slotHeight}px;`}>+</div>
          {/each}

          {#each events.filter((c) => c.day === dayIndex) as event}
            <ScheduleEvent {event} {slotHeight} {startHour} />
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>
