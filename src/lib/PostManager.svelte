<script lang="ts">
  import { onMount } from 'svelte';
  import { getUsers, getPosts, createPost } from './api';

  let users = [];
  let posts = [];

  let title = '';
  let content = '';
  let authorId: number;
  let search = ''; // campo de busca

  onMount(async () => {
    users = await getUsers();
    if (users.length > 0) authorId = users[0].id;
    await loadPosts();
  });

  async function loadPosts() {
    posts = await getPosts();
  }

  async function submit() {
    await createPost({ title, content, authorId });
    title = '';
    content = '';
    await loadPosts();
  }

  function getAuthorName(id: number) {
    const user = users.find(u => u.id === id);
    return user ? user.name : 'Desconhecido';
  }

  // Filtra posts conforme o texto digitado
  $: filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.content.toLowerCase().includes(search.toLowerCase()) ||
    getAuthorName(p.authorId).toLowerCase().includes(search.toLowerCase())
  );
</script>

<h2>Criar Post</h2>
<form on:submit|preventDefault={submit}>
  <input bind:value={title} placeholder="Título" />
  <textarea bind:value={content} placeholder="Conteúdo"></textarea>

  {#if users.length > 0}
    <label for="author">Autor</label>
    <select id="author" bind:value={authorId}>
      {#each users as u}
        <option value={u.id}>{u.name}</option>
      {/each}
    </select>
  {:else}
    <p>Carregando autores...</p>
  {/if}

  <button type="submit">Salvar</button>
</form>

<hr />

<!-- Campo de busca -->
<input
  type="text"
  placeholder="Buscar posts..."
  bind:value={search}
  style="margin-bottom: 1rem; padding: 0.75rem; width: 100%; border: 1px solid #ccc; border-radius: 6px;"
/>

<h2>Posts</h2>
<div class="cards">
  {#each filteredPosts as p}
    <div class="card">
      <h3>{p.title}</h3>
      <p>{p.content}</p>
      <small>Autor: {getAuthorName(p.authorId)}</small>
    </div>
  {/each}
</div>

<style>
  body {
    font-family: Arial, sans-serif;
    background: #f4f6f8;
    margin: 0;
    padding: 2rem;
    color: #333;
  }

  h2 {
    margin-bottom: 1rem;
    color: #222;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    max-width: 500px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  }

  input, textarea, select {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    font-family: inherit;
    width: 100%;
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
  }

  button:hover {
    background: #0056b3;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    transition: transform 0.2s ease;
  }

  .card:hover {
    transform: translateY(-3px);
  }

  .card h3 {
    margin: 0 0 0.5rem;
    color: #222;
  }

  .card p {
    margin: 0 0 0.75rem;
    color: #555;
  }

  .card small {
    color: #888;
    font-size: 0.85rem;
  }
</style>