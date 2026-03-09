<script>
  import Modal from '$lib/components/Modal.svelte';

  let teachers = [
    { id: 'DOC-001', name: 'Carlos', surname: 'García', program: 'Ingeniería de Sistemas', schedule: 'L-M-V: 8AM-12PM' },
    { id: 'DOC-002', name: 'María', surname: 'Martínez', program: 'Administración', schedule: 'L-M-J: 2PM-6PM' },
    { id: 'DOC-003', name: 'José', surname: 'López', program: 'Derecho', schedule: 'M-J-V: 10AM-2PM' },
    { id: 'DOC-004', name: 'Ana', surname: 'Rodríguez', program: 'Medicina', schedule: 'L-M-M-J-V: 8AM-10AM' },
    { id: 'DOC-005', name: 'Pedro', surname: 'Fernández', program: 'Ingeniería Civil', schedule: 'L-M-V: 3PM-7PM' },
    { id: 'DOC-006', name: 'Laura', surname: 'Sánchez', program: 'Psicología', schedule: 'L-M-V: 2PM-5PM' },
    { id: 'DOC-007', name: 'Miguel', surname: 'Torres', program: 'Contaduría', schedule: 'M-J-V: 8AM-11AM' },
    { id: 'DOC-008', name: 'Carmen', surname: 'Ramírez', program: 'Ingeniería Industrial', schedule: 'L-M-V: 9AM-1PM' }
  ];

  let searchQuery = '';
  let viewMode = 'table';
  let showModal = false;
  let showEditModal = false;
  let showDeleteModal = false;
  let selectedTeacher = null;

  const openEdit = (teacher) => {
    selectedTeacher = JSON.parse(JSON.stringify(teacher));
    showEditModal = true;
  };

  const openDelete = (teacher) => {
    selectedTeacher = teacher;
    showDeleteModal = true;
  };
</script>

<svelte:head>
  <title>Gestión de Docentes</title>
</svelte:head>

<section class="rounded-xl bg-[#f6f7f9] p-5 dark:bg-[#1e293b] transition-colors duration-200">
  <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    <div>
      <h2 class="text-[31px] font-bold leading-[1.1] text-[#111827] dark:text-white transition-colors">Gestión de Docentes</h2>
      <p class="mt-1 text-[18px] text-[#374151] dark:text-gray-400 Transition-colors">Administra la información de los profesores</p>
    </div>
    <button
      on:click={() => (showModal = true)}
      class="inline-flex items-center gap-2 rounded-xl bg-[#ea0010] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d1000f]"
    >
      <svg viewBox="0 0 20 20" class="h-5 w-5" fill="currentColor">
        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
      </svg>
      Nuevo Docente
    </button>
  </div>

  <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
    <div class="relative flex-1">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg class="h-5 w-5 text-[#9ca3af]" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="9" r="6" />
          <path d="m14 14 4 4" />
        </svg>
      </div>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Buscar docente por nombre, código o programa..."
        class="block w-full rounded-xl border border-[#d7dce1] bg-white py-3 pl-10 pr-4 text-sm text-[#111827] placeholder-[#9ca3af] outline-none transition-colors focus:border-[#ea0010] dark:border-[#334155] dark:bg-[#1e293b] dark:text-white dark:placeholder-gray-500"
      />
    </div>
    <div class="inline-flex gap-2 rounded-xl border border-[#d7dce1] bg-white p-1.5 dark:border-[#334155] dark:bg-[#0f172a] transition-colors duration-200">
      <button
        on:click={() => (viewMode = 'table')}
        class="grid h-10 w-10 place-items-center rounded-lg border transition-all {viewMode === 'table' ? 'bg-[#ea0010] border-[#ea0010] text-white' : 'bg-white border-[#d7dce1] text-[#6b7280] dark:bg-[#1e293b] dark:border-[#334155]'}"
        aria-label="Vista de lista"
      >
        <svg viewBox="0 0 24 24" class="h-6 w-6 fill-none stroke-current" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 3v18" />
        </svg>
      </button>
      <button
        on:click={() => (viewMode = 'grid')}
        class="grid h-10 w-10 place-items-center rounded-lg border transition-all {viewMode === 'grid' ? 'bg-[#ea0010] border-[#ea0010] text-white' : 'bg-white border-[#d7dce1] text-[#6b7280] dark:bg-[#1e293b] dark:border-[#334155]'}"
        aria-label="Vista de tarjetas"
      >
        <svg viewBox="0 0 24 24" class="h-6 w-6 fill-none stroke-current" stroke-width="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      </button>
    </div>
  </div>

  {#if viewMode === 'table'}
    <div class="overflow-hidden rounded-xl border border-[#d7dce1] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] dark:border-[#334155] dark:bg-[#0f172a] transition-colors duration-200">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-[#e5e7eb] bg-white text-sm font-semibold text-[#374151] dark:border-[#334155] dark:bg-[#1e293b] dark:text-gray-300 Transition-colors">
              <th class="px-6 py-4">Código</th>
              <th class="px-6 py-4">Nombre</th>
              <th class="px-6 py-4">Apellido</th>
              <th class="px-6 py-4">Programa</th>
              <th class="px-6 py-4 text-center">Disponibilidad Horaria</th>
              <th class="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef0f3] dark:divide-[#334155] transition-colors">
            {#each teachers as teacher}
              <tr class="transition-colors hover:bg-[#f9fafb] dark:hover:bg-[#334155]/20">
                <td class="px-6 py-4 text-sm text-[#374151] dark:text-gray-300">{teacher.id}</td>
                <td class="px-6 py-4 text-sm font-medium text-[#111827] dark:text-white">{teacher.name}</td>
                <td class="px-6 py-4 text-sm font-medium text-[#111827] dark:text-white">{teacher.surname}</td>
                <td class="px-6 py-4 text-sm text-[#4b5563] dark:text-gray-400">{teacher.program}</td>
                <td class="px-6 py-4 text-center">
                  <span class="inline-flex rounded-full bg-[#f3f4f6] px-4 py-1.5 text-xs font-medium text-[#4b5563] dark:bg-[#334155] dark:text-gray-300">
                    {teacher.schedule}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center justify-center gap-3 text-[#ea0010]">
                    <button 
                      on:click={() => openEdit(teacher)}
                      class="transition-colors hover:text-[#c4000d] dark:text-gray-400 dark:hover:text-white"
                      title="Editar"
                    >
                      <svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current" stroke-width="2">
                        <path d="m11 4 7 7m-1.5-5.5a2.121 2.121 0 0 1 3 3L7 21l-4 1 1-4 12.5-12.5Z" />
                      </svg>
                    </button>
                    <button 
                      on:click={() => openDelete(teacher)}
                      class="grid h-8 w-8 place-items-center rounded-lg bg-[#ea0010] text-white transition-colors hover:bg-[#d1000f]"
                      title="Eliminar"
                    >
                      <svg viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current" stroke-width="2">
                        <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6" />
                      </svg>
                    </button>
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
      {#each teachers as teacher}
        <article class="flex flex-col justify-between rounded-2xl border border-[#d7dce1] bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-[#334155] dark:bg-[#1e293b] dark:text-white">
          <div class="mb-4">
            <h3 class="text-xl font-bold text-[#111827] dark:text-white">{teacher.name} {teacher.surname}</h3>
            <p class="text-sm font-semibold text-[#ea0010] dark:text-[#f87171]">{teacher.id}</p>
            <p class="mt-1 text-sm text-[#4b5563] dark:text-gray-400">{teacher.program}</p>
          </div>
          
          <div class="mb-6">
            <p class="text-[12px] font-medium uppercase tracking-wider text-[#9ca3af] dark:text-gray-500">Disponibilidad Horaria</p>
            <div class="mt-2">
              <span class="inline-flex rounded-full bg-[#f3f4f6] px-4 py-1.5 text-xs font-medium text-[#4b5563] dark:bg-[#334155] dark:text-gray-300">
                {teacher.schedule}
              </span>
            </div>
          </div>

          <div class="flex gap-3 border-t border-[#eef0f3] pt-4 dark:border-[#334155]">
            <button 
              on:click={() => openEdit(teacher)}
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#fff1f2] py-2 text-sm font-semibold text-[#ea0010] transition-colors hover:bg-[#ffe4e6] dark:bg-rose-900/10 dark:text-[#f87171] dark:hover:bg-rose-900/20"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current" stroke-width="2">
                <path d="m11 4 7 7m-1.5-5.5a2.121 2.121 0 0 1 3 3L7 21l-4 1 1-4 12.5-12.5Z" />
              </svg>
              Editar
            </button>
            <button 
              on:click={() => openDelete(teacher)}
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ea0010] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#d1000f]"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current" stroke-width="2">
                <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6" />
              </svg>
              Eliminar
            </button>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</section>

<!-- Create Modal -->
<Modal
  show={showModal}
  title="Registrar Nuevo Docente"
  size="lg"
  on:close={() => (showModal = false)}
>
  <form slot="body" class="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <div class="space-y-2">
      <label for="reg-name" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Nombre</label>
      <input id="reg-name" type="text" placeholder="Ej. Carlos" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
    </div>
    <div class="space-y-2">
      <label for="reg-surname" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Apellido</label>
      <input id="reg-surname" type="text" placeholder="Ej. García" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
    </div>
    <div class="space-y-2">
      <label for="reg-id" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Código de Docente</label>
      <input id="reg-id" type="text" placeholder="Ej. DOC-009" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
    </div>
    <div class="space-y-2">
      <label for="reg-program" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Programa Académico</label>
      <select id="reg-program" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white">
        <option value="">Seleccionar</option>
        <option>Ingeniería de Sistemas</option>
        <option>Administración</option>
        <option>Derecho</option>
        <option>Medicina</option>
      </select>
    </div>
    <div class="col-span-full space-y-2">
      <label for="reg-schedule" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Disponibilidad Horaria</label>
      <input id="reg-schedule" type="text" placeholder="Ej. L-M-V: 8AM-12PM" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
    </div>
  </form>
  <div slot="footer" class="flex w-full justify-end gap-3">
    <button on:click={() => (showModal = false)} class="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">Cancelar</button>
    <button on:click={() => (showModal = false)} class="rounded-xl bg-[#ea0010] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d1000f]">Guardar Docente</button>
  </div>
</Modal>

<!-- Edit Modal -->
<Modal
  show={showEditModal}
  title="Editar Información del Docente"
  size="lg"
  on:close={() => (showEditModal = false)}
>
  <div slot="body">
    <div class="mb-4 flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
      <svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
      </svg>
      <p class="text-sm font-medium">Estás editando la información de <strong>{selectedTeacher?.name} {selectedTeacher?.surname}</strong>.</p>
    </div>
    <form class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div class="space-y-2">
        <label for="edit-name" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Nombre</label>
        <input id="edit-name" type="text" bind:value={selectedTeacher.name} class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
      </div>
      <div class="space-y-2">
        <label for="edit-surname" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Apellido</label>
        <input id="edit-surname" type="text" bind:value={selectedTeacher.surname} class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
      </div>
      <div class="space-y-2">
        <label for="edit-id" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Código</label>
        <input id="edit-id" type="text" value={selectedTeacher?.id} class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400" readonly />
      </div>
      <div class="space-y-2">
        <label for="edit-program" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Programa</label>
        <select id="edit-program" bind:value={selectedTeacher.program} class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-[#ea0010] dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          <option>Ingeniería de Sistemas</option>
          <option>Administración</option>
          <option>Derecho</option>
          <option>Medicina</option>
        </select>
      </div>
    </form>
  </div>
  <div slot="footer" class="flex w-full justify-end gap-3">
    <button on:click={() => (showEditModal = false)} class="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">Cancelar</button>
    <button on:click={() => { alert('¡Cambios guardados exitosamente!'); showEditModal = false; }} class="rounded-xl bg-[#ea0010] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d1000f]">Confirmar Cambios</button>
  </div>
</Modal>

<!-- Delete Modal -->
<Modal
  show={showDeleteModal}
  title="Confirmar Eliminación"
  size="md"
  on:close={() => (showDeleteModal = false)}
>
  <div slot="body" class="text-center">
    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-500">
      <svg viewBox="0 0 24 24" class="h-10 w-10 fill-none stroke-current" stroke-width="2">
        <path d="M12 9v2m0 4h.01M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z"/>
      </svg>
    </div>
    <h4 class="text-lg font-bold text-slate-900 dark:text-white">¿Estás seguro?</h4>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
      Estás a punto de eliminar al docente <strong>{selectedTeacher?.name} {selectedTeacher?.surname}</strong>. Esta acción no se puede deshacer.
    </p>
  </div>
  <div slot="footer" class="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
    <button on:click={() => (showDeleteModal = false)} class="flex-1 rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">Cancelar</button>
    <button on:click={() => (showDeleteModal = false)} class="flex-1 rounded-xl bg-[#ea0010] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d1000f]">Sí, Eliminar Docente</button>
  </div>
</Modal>
