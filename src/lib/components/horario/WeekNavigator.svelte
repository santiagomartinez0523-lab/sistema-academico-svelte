<script>
  export let rangeLabel = '13-17 Enero 2025';
</script>

<div class="mb-4 flex items-center justify-between rounded-xl border border-[#d7dce1] bg-white px-5 py-4">
  <button type="button" aria-label="Semana anterior" class="rounded-lg p-1 text-[#6b7280] hover:bg-[#f3f4f6]">
    <svg viewBox="0 0 20 20" class="h-5 w-5 fill-none stroke-current" stroke-width="1.8"><path d="m12.5 5-5 5 5 5"></path></svg>
  </button>
  <p class="text-[16px] font-semibold text-[#111827]">{rangeLabel}</p>
  <button type="button" aria-label="Semana siguiente" class="rounded-lg p-1 text-[#6b7280] hover:bg-[#f3f4f6]">
    <svg viewBox="0 0 20 20" class="h-5 w-5 fill-none stroke-current" stroke-width="1.8"><path d="m7.5 5 5 5-5 5"></path></svg>
  </button>
</div>
