export function mapUserRow(r) {
  return {
    id: r.id,
    name: r.name,
    image_url: r.image_url,
    score: Number(r.score),
  };
}
