// const BASE = import.meta.env.VITE_API_BASE
const BASE = 'https://top-cats-server.onrender.com';

export async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
