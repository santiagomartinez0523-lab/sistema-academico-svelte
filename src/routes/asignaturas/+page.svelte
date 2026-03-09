<script>
  import Modal from '$lib/components/Modal.svelte';

  let subjects = [
    { id: 'ASIG-101', name: 'Matemáticas I', credits: 4, program: 'Ingeniería de Sistemas', type: 'Obligatoria' },
    { id: 'ASIG-102', name: 'Física I', credits: 4, program: 'Ingeniería de Sistemas', type: 'Obligatoria' },
    { id: 'ASIG-201', name: 'Programación I', credits: 3, program: 'Ingeniería de Sistemas', type: 'Obligatoria' },
    { id: 'ASIG-301', name: 'Base de Datos', credits: 3, program: 'Ingeniería de Sistemas', type: 'Obligatoria' },
    { id: 'ASIG-401', name: 'Inteligencia Artificial', credits: 3, program: 'Ingeniería de Sistemas', type: 'Electiva' },
    { id: 'ASIG-501', name: 'Ética Profesional', credits: 2, program: 'General', type: 'Humanidades' }
  ];

  let searchQuery = '';
  let viewMode = 'table';
  let showModal = false;
  let showEditModal = false;
  let showDeleteModal = false;
  let selectedSubject = null;

  const openEdit = (sub) => { 
    selectedSubject = JSON.parse(JSON.stringify(sub)); 
    showEditModal = true; 
  };

  const openDelete = (sub) => { 
    selectedSubject = sub; 
    showDeleteModal = true; 
  };
</script>

<svelte:head>
  <title>Gestión de Asignaturas</title>
</svelte:head>

<section class="rounded-xl bg-[#f6f7f9] p-5 dark:bg-[#1e293b] transition-colors duration-200">
  <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    <div>
      <h2 class="text-[31px] font-bold leading-[1.1] text-[#111827] dark:text-white transition-colors">Gestión de Asignaturas</h2>
      <p class="mt-1 text-[18px] text-[#374151] dark:text-gray-400 Transition-colors">Administra el catálogo de materias</p>
    </div>
    <button
      on:click={() => (showModal = true)}
      class="inline-flex items-center gap-2 rounded-xl bg-[#ea0010] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d1000f]"
    >
      <svg viewBox="0 0 20 20" class="h-5 w-5" fill="currentColor"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>
      Nueva Asignatura
    </button>
  </div>

  <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
    <div class="relative flex-1">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg class="h-5 w-5 text-[#9ca3af]" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="9" r="6" /><path d="m14 14 4 4" /></svg>
      </div>
      <input type="text" bind:value={searchQuery} placeholder="Buscar asignatura por nombre o código..." class="block w-full rounded-xl border border-[#d7dce1] bg-white py-3 pl-10 pr-4 text-sm text-[#111827] placeholder-[#9ca3af] outline-none transition-colors focus:border-[#ea0010] dark:border-[#334155] dark:bg-[#1e293b] dark:text-white dark:placeholder-gray-500" />
    </div>
    <div class="inline-flex gap-2 rounded-xl border border-[#d7dce1] bg-white p-1.5 dark:border-[#334155] dark:bg-[#0f172a] transition-colors duration-200">
      <button on:click={() => (viewMode = 'table')} aria-label="Vista de tabla" class="grid h-10 w-10 place-items-center rounded-lg border transition-all {viewMode === 'table' ? 'bg-[#ea0010] border-[#ea0010] text-white' : 'bg-white border-[#d7dce1] text-[#6b7280] dark:bg-[#1e293b] dark:border-[#334155]'}"><svg viewBox="0 0 24 24" class="h-6 w-6 fill-none stroke-current" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /></svg></button>
      <button on:click={() => (viewMode = 'grid')} aria-label="Vista de tarjetas" class="grid h-10 w-10 place-items-center rounded-lg border transition-all {viewMode === 'grid' ? 'bg-[#ea0010] border-[#ea0010] text-white' : 'bg-white border-[#d7dce1] text-[#6b7280] dark:bg-[#1e293b] dark:border-[#334155]'}"><svg viewBox="0 0 24 24" class="h-6 w-6 fill-none stroke-current" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg></button>
    </div>
  </div>

  {#if viewMode === 'table'}
    <div class="overflow-hidden rounded-xl border border-[#d7dce1] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] dark:border-[#334155] dark:bg-[#0f172a] transition-colors duration-200">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-[#e5e7eb] bg-white text-sm font-semibold text-[#374151] dark:border-[#334155] dark:bg-[#1e293b] dark:text-gray-300 transition-colors">
              <th class="px-6 py-4">Código</th>
              <th class="px-6 py-4">Asignatura</th>
              <th class="px-6 py-4 text-center">Créditos</th>
              <th class="px-6 py-4">Programa</th>
              <th class="px-6 py-4">Tipo</th>
              <th class="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef0f3] dark:divide-[#334155] transition-colors">
            {#each subjects as subject}
              <tr class="transition-colors hover:bg-[#f9fafb] dark:hover:bg-[#334155]/20">
                <td class="px-6 py-4 text-sm text-[#374151] dark:text-gray-300 font-medium">{subject.id}</td>
                <td class="px-6 py-4 text-sm font-semibold text-[#111827] dark:text-white">{subject.name}</td>
                <td class="px-6 py-4 text-center text-sm text-[#374151] dark:text-gray-300 font-medium">{subject.credits}</td>
                <td class="px-6 py-4 text-sm text-[#4b5563] dark:text-gray-400">{subject.program}</td>
                <td class="px-6 py-4 text-sm">
                  <span class="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">{subject.type}</span>
                </td>
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center justify-center gap-3">
                    <button on:click={() => openEdit(subject)} class="text-[#f87171] hover:text-[#ea0010] dark:text-gray-400 dark:hover:text-white transition-colors" title="Editar"><svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current" stroke-width="2"><path d="m11 4 7 7m-1.5-5.5a2.121 2.121 0 0 1 3 3L7 21l-4 1 1-4 12.5-12.5Z" /></svg></button>
                    <button on:click={() => openDelete(subject)} class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ea0010] text-white hover:bg-[#d1000f] transition-colors" title="Eliminar"><svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current" stroke-width="2"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6" /></svg></button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {:else}
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {#each subjects as subject}
        <article class="flex flex-col justify-between rounded-2xl border border-[#d7dce1] bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-[#334155] dark:bg-[#1e293b] dark:text-white">
          <div class="mb-4">
            <h3 class="text-xl font-bold text-[#111827] dark:text-white">{subject.name}</h3>
            <p class="text-sm font-bold text-[#ea0010] dark:text-[#f87171]">{subject.id}</p>
            <div class="mt-3 space-y-1.5">
              <p class="text-sm text-[#4b5563] dark:text-gray-400 flex items-center gap-2">
                <span class="font-semibold text-slate-700 dark:text-slate-300">Créditos:</span> {subject.credits}
              </p>
              <p class="text-sm text-[#4b5563] dark:text-gray-400 flex items-center gap-2">
                <span class="font-semibold text-slate-700 dark:text-slate-300">Programa:</span> {subject.program}
              </p>
              <div class="mt-2 text-xs flex items-center gap-2">
                <span class="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-medium">{subject.type}</span>
              </div>
            </div>
          </div>
          <div class="flex gap-3 border-t border-[#eef0f3] pt-4 dark:border-[#334155] mt-4">
            <button on:click={() => openEdit(subject)} class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#fff1f2] py-2 text-sm font-semibold text-[#ea0010] transition-colors hover:bg-[#ffe4e6] dark:bg-rose-900/10 dark:text-[#f87171] dark:hover:bg-rose-900/20">
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current" stroke-width="2"><path d="m11 4 7 7m-1.5-5.5a2.121 2.121 0 0 1 3 3L7 21l-4 1 1-4 12.5-12.5Z" /></svg>
              Editar
            </button>
            <button on:click={() => openDelete(subject)} class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ea0010] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#d1000f]">
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current" stroke-width="2"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6" /></svg>
              Borrar
            </button>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</section>

<!-- Create Modal -->
<Modal show={showModal} title="Registrar Nueva Asignatura" size="lg" on:close={() => (showModal = false)}>
  <form slot="body" class="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <div class="col-span-full space-y-2">
      <label for="reg-name" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Nombre de la Asignatura</label>
      <input id="reg-name" type="text" placeholder="Ej. Cálculo Multivariado" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
    </div>
    <div class="space-y-2">
      <label for="reg-id" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Código</label>
      <input id="reg-id" type="text" placeholder="Ej. ASIG-601" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
    </div>
    <div class="space-y-2">
      <label for="reg-credits" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Créditos</label>
      <input id="reg-credits" type="number" placeholder="Ej. 4" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
    </div>
    <div class="space-y-2">
      <label for="reg-program" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Programa</label>
      <select id="reg-program" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white">
        <option value="">Seleccionar</option>
        <option>Ingeniería de Sistemas</option>
        <option>Medicina</option>
        <option>Derecho</option>
        <option>Administración</option>
      </select>
    </div>
    <div class="space-y-2">
      <label for="reg-type" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Tipo de Materia</label>
      <select id="reg-type" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white">
        <option>Obligatoria</option>
        <option>Electiva</option>
        <option>Humanidades</option>
      </select>
    </div>
  </form>
  <div slot="footer" class="flex w-full justify-end gap-3">
    <button on:click={() => (showModal = false)} class="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-400">Cancelar</button>
    <button on:click={() => (showModal = false)} class="rounded-xl bg-[#ea0010] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d1000f]">Guardar Asignatura</button>
  </div>
</Modal>

<!-- Edit Modal -->
<Modal show={showEditModal} title="Editar Asignatura" size="lg" on:close={() => (showEditModal = false)}>
  <div slot="body">
    <div class="mb-4 flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 transition-colors">
      <svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
      <p class="text-sm font-medium">Editando: <strong>{selectedSubject?.name}</strong></p>
    </div>
    <form class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div class="col-span-full space-y-2">
        <label for="edit-name" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Nombre</label>
        <input id="edit-name" type="text" bind:value={selectedSubject.name} class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
      </div>
      <div class="space-y-2">
        <label for="edit-credits" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Créditos</label>
        <input id="edit-credits" type="number" bind:value={selectedSubject.credits} class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
      </div>
      <div class="space-y-2">
        <label for="edit-type" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Tipo</label>
        <select id="edit-type" bind:value={selectedSubject.type} class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          <option>Obligatoria</option>
          <option>Electiva</option>
          <option>Humanidades</option>
        </select>
      </div>
    </form>
  </div>
  <div slot="footer" class="flex w-full justify-end gap-3">
    <button on:click={() => (showEditModal = false)} class="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-400">Cancelar</button>
    <button on:click={() => { alert('¡Materia actualizada!'); showEditModal = false; }} class="rounded-xl bg-[#ea0010] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d1000f]">Confirmar Cambios</button>
  </div>
</Modal>

<!-- Delete Modal -->
<Modal show={showDeleteModal} title="Eliminar Asignatura" size="md" on:close={() => (showDeleteModal = false)}>
  <div slot="body" class="text-center">
    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-500 transition-colors"><svg viewBox="0 0 24 24" class="h-10 w-10 fill-none stroke-current" stroke-width="2"><path d="M12 9v2m0 4h.01M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z"/></svg></div>
    <h4 class="text-lg font-bold text-slate-900 dark:text-white">¿Borrar esta materia?</h4>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">Borrarás <strong>{selectedSubject?.name}</strong> permanentemente.</p>
  </div>
  <div slot="footer" class="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
    <button on:click={() => (showDeleteModal = false)} class="flex-1 rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-400">Cancelar</button>
    <button on:click={() => (showDeleteModal = false)} class="flex-1 rounded-xl bg-[#ea0010] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d1000f]">Sí, Borrar</button>
  </div>
</Modal>
