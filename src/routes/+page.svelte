<script>
  const metrics = [
    { title: 'Total Aulas', value: 24, icon: 'building', available: 12, busy: 12 },
    { title: 'Docentes Activos', value: 48, icon: 'users', available: 22, busy: 26 },
    { title: 'Asignaturas', value: 35, icon: 'book' },
    { title: 'Clases Hoy', value: 67, icon: 'calendar' }
  ];

  const activities = [
    { title: 'Nueva programacion registrada', details: 'Matematicas I - Aula 301 - Lunes 8:00 AM' },
    { title: 'Docente actualizado', details: 'Prof. Garcia - Ingenieria de Sistemas' },
    { title: 'Aula modificada', details: 'Aula 205 - Capacidad actualizada a 40' }
  ];

  const alerts = [
    { title: 'Cruce de horarios detectado', details: 'Prof. Martinez - Martes 10:00 AM', tone: 'danger' },
    { title: 'Aula sin asignar', details: 'Aula 410 - Sin uso programado esta semana', tone: 'warning' },
    { title: 'Docente con baja disponibilidad', details: 'Prof. Lopez - Solo 2 horas disponibles', tone: 'warning' }
  ];
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<section class="rounded-xl bg-[#f6f7f9] p-5 dark:bg-[#1e293b] transition-colors duration-200">
  <div>
    <h2 class="text-[31px] font-bold leading-[1.1] dark:text-white transition-colors">Bienvenido al Dashboard</h2>
    <p class="mt-1 text-[18px] text-[#374151] dark:text-gray-400 transition-colors">Gestion y control universitario</p>
  </div>

  <div class="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
    {#each metrics as item}
      <article class="rounded-[10px] border border-[#d7dce1] bg-white px-4 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.08)] dark:border-[#334155] dark:bg-[#0f172a] dark:text-gray-100 transition-colors duration-200">
        <div class="flex items-start justify-between">
          <div class="pt-1 text-[#ef4444]">
            {#if item.icon === 'users'}
              <svg viewBox="0 0 24 24" class="h-[30px] w-[30px] fill-none stroke-current" stroke-width="1.8"><circle cx="8" cy="8" r="3"></circle><circle cx="16" cy="9" r="3"></circle><path d="M2.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"></path><path d="M13.5 19c0-2.2 1.8-4 4-4 2.2 0 4 1.8 4 4"></path></svg>
            {:else if item.icon === 'book'}
              <svg viewBox="0 0 24 24" class="h-[30px] w-[30px] fill-none stroke-current" stroke-width="1.8"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H11v16H5.5A2.5 2.5 0 0 0 3 21V5.5Z"></path><path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H13v16h5.5A2.5 2.5 0 0 1 21 21V5.5Z"></path></svg>
            {:else if item.icon === 'calendar'}
              <svg viewBox="0 0 24 24" class="h-[30px] w-[30px] fill-none stroke-current" stroke-width="1.8"><rect x="3" y="4" width="18" height="17" rx="2"></rect><path d="M8 2v4M16 2v4M3 10h18"></path></svg>
            {:else}
              <svg viewBox="0 0 24 24" class="h-[30px] w-[30px] fill-none stroke-current" stroke-width="1.8"><path d="M4 20V6a2 2 0 0 1 2-2h8v16"></path><path d="M14 20V10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10"></path><path d="M9 8h.01M9 12h.01M9 16h.01"></path></svg>
            {/if}
          </div>
          <span class="text-[30px] font-bold leading-none">{item.value}</span>
        </div>

        <p class="mt-2.5 text-[20px] font-medium leading-tight">{item.title}</p>
        {#if item.available !== undefined}
          <p class="mt-2 text-[14px]">
            <span class="text-emerald-600 dark:text-emerald-400">Disponible: {item.available}</span>
            <span class="ml-4 text-red-500 dark:text-red-400">Ocupado: {item.busy}</span>
          </p>
        {/if}
      </article>
    {/each}
  </div>

  <div class="mt-5 grid gap-4 xl:grid-cols-2">
    <section class="rounded-[10px] border border-[#d7dce1] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.08)] dark:border-[#334155] dark:bg-[#0f172a] transition-colors duration-200">
      <h3 class="mb-4 text-[24px] font-semibold dark:text-gray-100">Actividad Reciente</h3>
      <div class="space-y-3">
        {#each activities as item}
          <article class="rounded-lg bg-[#f2f4f6] px-4 py-3 dark:bg-[#1e293b] transition-colors">
            <p class="flex items-center gap-3 text-[17px] font-medium dark:text-gray-200">
              <span class="h-2.5 w-2.5 rounded-full bg-[#dc2626]"></span>
              {item.title}
            </p>
            <p class="pl-6 text-[13px] text-[#374151] dark:text-gray-400">{item.details}</p>
          </article>
        {/each}
      </div>
    </section>

    <section class="rounded-[10px] border border-[#d7dce1] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.08)] dark:border-[#334155] dark:bg-[#0f172a] transition-colors duration-200">
      <h3 class="mb-4 text-[24px] font-semibold dark:text-gray-100">Alertas del Sistema</h3>
      <div class="space-y-3">
        {#each alerts as item}
          <article
            class={`rounded-lg border px-4 py-3 transition-colors ${
              item.tone === 'danger'
                ? 'border-[#f5b1b7] bg-[#fff3f4] text-[#c81e2f] dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400'
                : 'border-[#f4dc8c] bg-[#fff9e8] text-[#a05c00] dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-400'
            }`}
          >
            <p class="flex items-center gap-3 text-[17px] font-medium">
              <span class={`h-2.5 w-2.5 rounded-full ${item.tone === 'danger' ? 'bg-[#dc2626]' : 'bg-[#d18a00]'}`}></span>
              {item.title}
            </p>
            <p class="pl-6 text-[13px]">{item.details}</p>
          </article>
        {/each}
      </div>
    </section>
  </div>
</section>
