<script lang="ts">
  import { onMount } from 'svelte';
  import { getUsers, getPosts, createPost } from './api';

  let users = [];
  let posts = [];

  let title = '';
  let content = '';
  let authorId: number;

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
    await loadPosts(); // atualiza lista após criar
  }

  function getAuthorName(id: number) {
    const user = users.find(u => u.id === id);
    return user ? user.name : 'Desconhecido';
  }
</script>

<h2>Criar Post</h2>
<form on:submit|preventDefault={submit}>
  <input bind:value={title} placeholder="Título" />
  <textarea bind:value={content} placeholder="Conteúdo"></textarea>

  <select bind:value={authorId}>
    {#each users as u}
      <option value={u.id}>{u.name}</option>
    {/each}
  </select>

  <button type="submit">Salvar</button>
</form>

<hr />

<h2>Posts</h2>
<div class="cards">
  {#each posts as p}
    <div class="card">
      <h3>{p.title}</h3>
      <p>{p.content}</p>
      <small>Autor: {getAuthorName(p.authorId)}</small>
    </div>
  {/each}
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  .cards {
    display: grid;
    gap: 1rem;
  }
  .card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 6px;
    background: #fafafa;
  }
</style>