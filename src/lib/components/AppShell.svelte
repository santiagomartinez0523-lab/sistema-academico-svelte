<script>
  import { page } from '$app/stores';

  let profileMenuOpen = false;
  let notificationMenuOpen = false;
  let isDarkMode = false;
  
  import { onMount } from 'svelte';
  
  onMount(() => {
    isDarkMode = document.documentElement.classList.contains('dark');
  });

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }

  const menu = [
    { label: 'Inicio', icon: 'home', href: '/' },
    { label: 'Aulas', icon: 'door', href: '/aulas' },
    { label: 'Docentes', icon: 'users', href: '/docentes' },
    { label: 'Asignaturas', icon: 'book', href: '/asignaturas' },
    { label: 'Horario', icon: 'calendar', href: '/horario' },
    { label: 'Reportes', icon: 'file', href: '/reportes' },
    { label: 'Credenciales', icon: 'key', href: '/credenciales' }
  ];

  const notifications = [
    {
      title: 'Nueva solicitud de clase',
      description: 'Carlos Garcia solicita aula 201 para Matematicas I',
      time: 'Hace 5 minutos',
      isNew: true
    },
    {
      title: 'Cruce de horario detectado',
      description: 'Conflicto en Aula 102 - Martes 10:00 AM',
      time: 'Hace 15 minutos',
      isNew: true
    },
    {
      title: 'Horario aprobado',
      description: 'Se aprobo la programacion de Ingenieria Civil',
      time: 'Hace 1 hora',
      isNew: false
    },
    {
      title: 'Cambio en disponibilidad',
      description: 'Aula 301 ahora esta disponible',
      time: 'Hace 2 horas',
      isNew: false
    }
  ];

  const isActive = (href, pathname) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const newNotificationsCount = notifications.filter((item) => item.isNew).length;

</script>

<svelte:window
  on:click={() => {
    profileMenuOpen = false;
    notificationMenuOpen = false;
  }}
/>

<div class="min-h-screen bg-[#f2f3f5] text-[#111827] dark:bg-[#0f172a] dark:text-gray-100 transition-colors duration-200">
  <div class="mx-auto flex min-h-screen w-full max-w-[1365px]">
    <aside class="hidden w-[214px] self-stretch py-6 lg:block">
      <div class="flex h-full flex-col rounded-2xl bg-white/80 px-3 py-5 shadow-[0_2px_10px_rgba(15,23,42,0.05)] dark:bg-[#1e293b]/90 dark:shadow-none transition-colors duration-200">
        <div class="mb-7 mt-1 grid h-20 place-items-center rounded-lg">
          <img src="/logo-unisinu.png" alt="Universidad del Sinu" class="h-14 w-auto object-contain" />
        </div>

        <nav class="space-y-2">
          {#each menu as item}
            <a
              href={item.href}
              class={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] font-medium transition-colors ${
                isActive(item.href, $page.url.pathname)
                  ? 'bg-[#f7e7e9] text-[#e11d2e] dark:bg-[#e11d2e]/10 dark:text-[#f87171]'
                  : 'text-[#1f2937] hover:bg-[#ebeef2] dark:text-gray-300 dark:hover:bg-[#334155]/50 dark:hover:text-white'
              }`}
            >
              {#if item.icon === 'home'}
                <svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-none stroke-current" stroke-width="1.8"><path d="M4 10.7L12 4l8 6.7V20a1 1 0 0 1-1 1h-4.8v-6h-4.4v6H5a1 1 0 0 1-1-1v-9.3Z" /></svg>
              {:else if item.icon === 'door'}
                <svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-none stroke-current" stroke-width="1.8"><path d="M4 20h16" /><path d="M7 20V5a1 1 0 0 1 1-1h6v16" /><path d="M14 7h3v13" /></svg>
              {:else if item.icon === 'users'}
                <svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-none stroke-current" stroke-width="1.8"><circle cx="8" cy="8" r="3" /><circle cx="16" cy="9" r="2.5" /><path d="M2.5 19c0-2.7 2.4-4.7 5.5-4.7s5.5 2 5.5 4.7" /><path d="M13.5 19c0-2 1.7-3.6 3.8-3.6 2.1 0 3.8 1.6 3.8 3.6" /></svg>
              {:else if item.icon === 'book'}
                <svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-none stroke-current" stroke-width="1.8"><path d="M3 6a2.5 2.5 0 0 1 2.5-2.5H11v16H5.5A2.5 2.5 0 0 0 3 22V6Z" /><path d="M21 6a2.5 2.5 0 0 0-2.5-2.5H13v16h5.5A2.5 2.5 0 0 1 21 22V6Z" /></svg>
              {:else if item.icon === 'calendar'}
                <svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-none stroke-current" stroke-width="1.8"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></svg>
              {:else if item.icon === 'file'}
                <svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-none stroke-current" stroke-width="1.8"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>
              {:else}
                <svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-none stroke-current" stroke-width="1.8"><path d="M20 7 9.5 17.5 6 14l2-2 1.5 1.5L18 5l2 2Z" /><circle cx="7" cy="17" r="3" /></svg>
              {/if}
              <span>{item.label}</span>
            </a>
          {/each}
        </nav>


      </div>
    </aside>

    <main class="flex-1 px-5 py-6 md:px-6">
      <header class="mb-5 flex items-start justify-between rounded-xl bg-white/80 px-4 py-3 shadow-[0_1px_6px_rgba(15,23,42,0.04)] dark:bg-[#1e293b]/90 dark:shadow-none transition-colors duration-200">
        <div>
          <h1 class="text-[17px] font-bold leading-tight dark:text-white transition-colors">Universidad del Sinu</h1>
          <p class="mt-0.5 text-[13px] text-[#4b5563] dark:text-gray-400 transition-colors">Sistema de Gestion Academica</p>
        </div>

        <div class="flex items-center gap-3">
          
          <button
            type="button"
            on:click={toggleTheme}
            class="relative grid h-9 w-9 place-items-center rounded-lg text-[#6b7280] transition hover:bg-[#f3f4f6] dark:text-gray-400 dark:hover:bg-[#334155] dark:hover:text-gray-200"
            aria-label="Alternar tema"
          >
            {#if isDarkMode}
              <svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current" stroke-width="1.8">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            {:else}
              <svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current" stroke-width="1.8">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            {/if}
          </button>

          <div class="relative">
            <button
              type="button"
              on:click|stopPropagation={() => {
                notificationMenuOpen = !notificationMenuOpen;
                profileMenuOpen = false;
              }}
              class="relative grid h-9 w-9 place-items-center rounded-lg text-[#6b7280] transition hover:bg-[#f3f4f6] dark:text-gray-400 dark:hover:bg-[#334155] dark:hover:text-gray-200"
              aria-label="Abrir notificaciones"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current" stroke-width="1.8">
                <path d="M15 18H5a1 1 0 0 1-1-1v-1l2-2V9a5 5 0 1 1 10 0v5l2 2v1a1 1 0 0 1-1 1h-2"></path>
                <path d="M9 18a3 3 0 0 0 6 0"></path>
              </svg>
              {#if newNotificationsCount > 0}
                <span class="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-[#ea0010] px-1 text-[11px] font-semibold text-white">
                  {newNotificationsCount}
                </span>
              {/if}
            </button>

            {#if notificationMenuOpen}
              <div class="absolute right-0 top-full z-20 mt-2 w-[300px] overflow-hidden rounded-xl border border-[#d7dce1] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.12)] dark:border-[#334155] dark:bg-[#1e293b] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <div class="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3 dark:border-[#334155]">
                  <p class="text-[14px] font-semibold text-[#111827] dark:text-gray-100">Notificaciones</p>
                  <span class="rounded-full bg-[#ea0010] px-2 py-0.5 text-[11px] font-medium text-white">
                    {newNotificationsCount} nuevas
                  </span>
                </div>

                <div class="max-h-72 overflow-y-auto">
                  {#each notifications as item}
                    <article class={`border-b border-[#eef0f3] px-4 py-3 last:border-b-0 dark:border-[#334155] ${item.isNew ? 'bg-[#fff7f8] dark:bg-[#3f1d24]' : 'bg-white dark:bg-[#1e293b]'}`}>
                      <p class="flex items-start gap-2 text-[14px] font-medium text-[#111827] dark:text-gray-100">
                        {#if item.isNew}
                          <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#ea0010]"></span>
                        {/if}
                        <span>{item.title}</span>
                      </p>
                      <p class="mt-1 text-[13px] text-[#374151] dark:text-gray-400">{item.description}</p>
                      <p class="mt-1 text-[12px] text-[#9ca3af] dark:text-gray-500">{item.time}</p>
                    </article>
                  {/each}
                </div>

                <button type="button" class="w-full border-t border-[#e5e7eb] px-4 py-3 text-[14px] font-medium text-[#ea0010] hover:bg-[#fff1f2] dark:border-[#334155] dark:text-[#f87171] dark:hover:bg-[#3f1d24]">
                  Ver todas las notificaciones
                </button>
              </div>
            {/if}
          </div>

          <div class="relative">
            <button
              type="button"
              on:click|stopPropagation={() => {
                profileMenuOpen = !profileMenuOpen;
                notificationMenuOpen = false;
              }}
              class="flex items-center gap-3 pr-1 rounded-lg p-1 hover:bg-[#f3f4f6] dark:hover:bg-[#334155] transition-colors"
              aria-label="Abrir menu de perfil"
            >
              <div class="h-10 w-10 rounded-full bg-[#d4d7dc] dark:bg-[#475569]"></div>
              <div class="text-left hidden sm:block">
                <p class="text-[17px] font-semibold leading-tight text-[#111827] dark:text-gray-100 transition-colors">Juan Perez</p>
                <span class="mt-1 inline-flex rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-[12px] font-medium text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 transition-colors">
                  Administrador
                </span>
              </div>
              <svg viewBox="0 0 20 20" class={`h-4 w-4 text-[#6b7280] dark:text-gray-400 transition ${profileMenuOpen ? 'rotate-180' : ''}`} fill="currentColor"><path d="M5.7 7.3a1 1 0 0 1 1.4 0L10 10.2l2.9-2.9a1 1 0 1 1 1.4 1.4l-3.6 3.6a1 1 0 0 1-1.4 0L5.7 8.7a1 1 0 0 1 0-1.4Z" /></svg>
            </button>

            {#if profileMenuOpen}
              <div class="absolute right-0 top-full z-20 mt-2 w-60 rounded-xl border border-[#d7dce1] bg-white p-2 shadow-[0_8px_24px_rgba(15,23,42,0.12)] dark:border-[#334155] dark:bg-[#1e293b] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-colors">
                <button type="button" class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[14px] text-[#1f2937] hover:bg-[#f3f4f6] dark:text-gray-300 dark:hover:bg-[#334155] dark:hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current" stroke-width="1.8"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.4l-1.1 1.1a1 1 0 0 1-1.4 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-1.6a1 1 0 0 1-1-1v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 1-1.4 0l-1.1-1.1a1 1 0 0 1 0-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1 1 0 0 1-1-1v-1.6a1 1 0 0 1 1-1h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 0 1 0-1.4l1.1-1.1a1 1 0 0 1 1.4 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a1 1 0 0 1 1-1h1.6a1 1 0 0 1 1 1v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.4 0l1.1 1.1a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a1 1 0 0 1 1 1v1.6a1 1 0 0 1-1 1h-.2a1 1 0 0 0-.9.6Z"></path></svg>
                  Configuracion
                </button>
                <button type="button" class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[14px] text-[#dc2626] hover:bg-[#fff1f2] dark:text-[#f87171] dark:hover:bg-[#3f1d24] transition-colors">
                  <svg viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current" stroke-width="1.8"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><path d="M10 17l5-5-5-5"></path><path d="M15 12H3"></path></svg>
                  Cerrar Sesion
                </button>
              </div>
            {/if}
          </div>
        </div>
      </header>

      <slot />
    </main>
  </div>
</div>
