const BASE = 'http://localhost:3000';

export async function getUsers() {
  const r = await fetch(`${BASE}/users`);
  return r.json();
}

export async function getPosts(authorId?: number) {
  const url = authorId ? `${BASE}/posts?authorId=${authorId}` : `${BASE}/posts`;
  const r = await fetch(url);
  return r.json();
}