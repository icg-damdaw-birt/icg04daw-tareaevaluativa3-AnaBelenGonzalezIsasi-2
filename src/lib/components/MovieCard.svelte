<script lang="ts">
  import type { Movie } from '$lib/types';
  import { moviesStore } from '$lib/movies.store.svelte';

  let { movie }: { movie: Movie } = $props<{ movie: Movie }>();

  const handleFavorite = () => {
    if (!movie.id) {
      console.error('Intento de marcar como favorito con ID indefinido. Abortando.');
      return;
    }
    moviesStore.toggleFavorite(movie.id);
  };
</script>

<div
  class="movie-card group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-transform duration-300 ease-in-out hover:-translate-y-2"
>
  <div class="relative">
    <img
      src={movie.posterUrl || 'https://placehold.co/400x600?text=No+Image'}
      alt="Póster de {movie.title}"
      class="h-auto w-full object-cover"
    />
    <button
      onclick={handleFavorite}
      class="absolute top-2 right-2 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-red-600"
      aria-label="Marcar como favorita"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={movie.isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class={movie.isFavorite ? 'text-red-500' : 'text-white'}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
  </div>
  <div class="flex flex-1 flex-col p-4">
    <h3 class="text-lg font-semibold">{movie.title}</h3>
    <p class="text-sm text-muted-foreground">
      {movie.director || 'Director no disponible'} ({movie.year || 'Año desconocido'})
    </p>
  </div>
  <div
    class="absolute inset-0 flex translate-y-full flex-col items-center justify-center bg-black/70 p-4 text-center text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
  >
    <h3 class="text-xl font-bold">{movie.title}</h3>
    <p class="mb-4">
      {movie.director || 'Director no disponible'} ({movie.year || 'Año desconocido'})
    </p>
    <div class="flex gap-2">
      <button class="rounded-md bg-primary px-4 py-2 text-primary-foreground">Editar</button>
      <button class="rounded-md bg-destructive px-4 py-2 text-destructive-foreground"
        >Eliminar</button>
    </div>
  </div>
</div>
