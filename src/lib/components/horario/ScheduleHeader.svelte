<script>
  export let title = 'Horario de Clases';
  export let subtitle = 'Calendario semanal de programaciones';
  export let actionLabel = 'Nueva Programacion';
</script>

<div class="mb-5 flex flex-wrap items-start justify-between gap-3">
  <div>
    <h2 class="text-[31px] font-bold leading-[1.1] text-[#111827]">{title}</h2>
    <p class="mt-1 text-[18px] text-[#374151]">{subtitle}</p>
  </div>

  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-xl bg-[#ea0010] px-5 py-2.5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#d1000f]"
  >
    <svg viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor"><path d="M9 4a1 1 0 1 1 2 0v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4Z" /></svg>
    {actionLabel}
  </button>
</div>
