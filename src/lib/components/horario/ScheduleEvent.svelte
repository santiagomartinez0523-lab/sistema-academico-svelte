<script>
  export let event;
  export let slotHeight = 68;
  export let startHour = 7;
</script>

<article
  class="absolute left-0.5 right-0.5 overflow-hidden rounded-r-md border-l-[3px] border-[#ea0010] bg-[#fff7f8] px-3 py-2 shadow-[0_1px_1px_rgba(15,23,42,0.06)] dark:bg-[#3f1d24] dark:shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-colors"
  style={`top:${(event.start - startHour) * slotHeight + 4}px; height:${(event.end - event.start) * slotHeight - 8}px;`}
>
  <h4 class="text-[15px] font-semibold leading-tight text-[#111827] dark:text-gray-100 transition-colors">{event.name}</h4>
  <p class="mt-0.5 text-[12px] text-[#374151] dark:text-gray-300 transition-colors">{event.code}</p>
  <p class="mt-1 flex items-center gap-1.5 text-[12px] text-[#1f2937] dark:text-gray-300 transition-colors">
    <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 fill-none stroke-current" stroke-width="1.8">
      <circle cx="12" cy="7.5" r="3.5"></circle>
      <path d="M5 19c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5"></path>
    </svg>
    {event.teacher}
  </p>
  <p class="flex items-center gap-1.5 text-[12px] text-[#1f2937] dark:text-gray-300 transition-colors">
    <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 fill-none stroke-current" stroke-width="1.8">
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"></path>
      <circle cx="12" cy="10" r="2.5"></circle>
    </svg>
    {event.room}
  </p>
  <p class="mt-1 text-[12px] font-medium text-[#ea0010] dark:text-[#f87171] transition-colors">{event.time}</p>
  <p class="text-[12px] text-[#374151] dark:text-gray-400 transition-colors">{event.week}</p>
</article>
