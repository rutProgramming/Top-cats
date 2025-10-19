// const BASE = import.meta.env.VITE_API_BASE
const BASE = 'https://top-cats-server.onrender.com';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Fetches JSON data from the server.
 * @param {string} path - The path to fetch from.
 * @returns {Promise<T>} - A promise that resolves to the fetched JSON data.
 * @throws {Error} - If the server returns an error.
 * @example
 * const data = await fetchJson('/api/data');
 * console.log(data);
 */
/*******  be1c6e80-a671-4bd9-92f5-a8f8387bf9b6  *******/
export async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
