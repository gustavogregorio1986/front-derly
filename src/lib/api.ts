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

export async function createPost(data: { title: string; content: string; authorId: number }) {
  const r = await fetch(`${BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return r.json();
}