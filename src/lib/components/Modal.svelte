<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  export let show = false;
  export let title = '';
  export let size = 'md'; // md, lg, xl

  const dispatch = createEventDispatcher();

  const close = () => {
    dispatch('close');
  };

  const sizes = {
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  // Prevent scrolling when modal is open
  $: if (typeof document !== 'undefined') {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  const handleKeydown = (e) => {
    if (e.key === 'Escape' && show) close();
  };
</script>

<svelte:window on:keydown={handleKeydown} />

{#if show}
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    transition:fade={{ duration: 200 }}
  >
    <!-- Backdrop -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] dark:bg-black/60"
      on:click={close}
    ></div>

    <!-- Modal Content -->
    <div
      class="relative w-full {sizes[size]} transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all dark:bg-[#1e293b]"
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h3>
        <button
          on:click={close}
          class="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6 fill-none stroke-current" stroke-width="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <slot name="body" />
      </div>

      <!-- Footer -->
      {#if $$slots.footer}
        <div class="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/50">
          <slot name="footer" />
        </div>
      {/if}
    </div>
  </div>
{/if}
