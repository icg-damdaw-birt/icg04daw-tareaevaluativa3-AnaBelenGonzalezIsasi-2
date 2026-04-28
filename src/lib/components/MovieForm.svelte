<script lang="ts">
  import type { Movie, MovieFormSubmit } from '$lib/types';

  // Props con Svelte 5: callbacks en lugar de eventos y bindable para two-way binding
  let {
    isSubmitting = $bindable(false),
    initialMovie = $bindable<Movie | null>(null),
    submitLabel = 'Añadir película',
    showCancel = false,
    onsubmit,
    oncancel
  }: {
    isSubmitting?: boolean;
    initialMovie?: Movie | null;
    submitLabel?: string;
    showCancel?: boolean;
    onsubmit?: (data: MovieFormSubmit) => void;
    oncancel?: () => void;
  } = $props();

  // Estado interno del formulario con $state
  let title = $state('');
  let director = $state('');
  let year = $state<string | number>('');
  let posterUrl = $state('');
  let error = $state<string | null>(null);
  let lastInitialId = $state<string | null>(null);

  function resetForm() {
    title = '';
    director = '';
    year = '';
    posterUrl = '';
    error = null;
  }

  // Efecto reactivo: sincroniza el formulario cuando cambia initialMovie
  $effect(() => {
    if (initialMovie && initialMovie.id !== lastInitialId) {
      title = initialMovie.title ?? '';
      director = initialMovie.director ?? '';
      year = initialMovie.year != null ? String(initialMovie.year) : '';
      posterUrl = initialMovie.posterUrl ?? '';
      error = null;
      lastInitialId = initialMovie.id;
    } else if (!initialMovie && lastInitialId !== null) {
      resetForm();
      lastInitialId = null;
    }
  });

  function validateForm(): boolean {
    error = null;

    if (!title.trim()) {
      error = 'El título es obligatorio';
      return false;
    }

    if (!director.trim()) {
      error = 'El director es obligatorio';
      return false;
    }

    return true;
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    
    if (!validateForm()) return;

    const trimmedTitle = title.trim();
    const trimmedDirector = director.trim();
    const numericYear = Number(year);

    if (!trimmedTitle || !trimmedDirector || !numericYear) {
      error = 'Completa el título, el director y el año.';
      return;
    }

    const payload = {
      id: initialMovie?.id,
      title: trimmedTitle,
      director: trimmedDirector,
      year: numericYear,
      posterUrl: posterUrl.trim() || undefined
    };

    onsubmit?.(payload);

    if (!initialMovie) {
      resetForm();
    }
  }

  function handleCancel() {
    oncancel?.();
  }
</script>

<form class="space-y-4" onsubmit={handleSubmit}>
  <div class="grid gap-4 md:grid-cols-2">
    <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
      Título
      <input
        bind:value={title}
        class="rounded border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        name="title"
        placeholder="La Odisea Espacial"
        required
        type="text"
      />
    </label>
    <label for="director" class="mb-1 block text-sm font-medium text-slate-700">Director</label>
    <input
      type="text"
      id="director"
      class="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      bind:value={director}
    />
    <label for="year" class="mb-1 block text-sm font-medium text-slate-700">Año</label>
    <input
      type="number"
      id="year"
      class="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      bind:value={year}
      placeholder="Ej: 2023"
    />
    <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
      Póster (URL)
      <input
        bind:value={posterUrl}
        class="rounded border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        name="posterUrl"
        placeholder="https://..."
        type="url"
      />
    </label>
  </div>

  {#if error}
    <p class="text-sm text-red-600">{error}</p>
  {/if}

  <div class="flex flex-col gap-2 sm:flex-row">
    {#if showCancel}
      <button
        type="button"
        class="w-full rounded border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-50"
        onclick={handleCancel}
      >
        Cancelar
      </button>
    {/if}
    <button
      class="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isSubmitting}
      type="submit"
    >
      {#if isSubmitting}
        Guardando...
      {:else}
        {submitLabel}
      {/if}
    </button>
  </div>
</form>
