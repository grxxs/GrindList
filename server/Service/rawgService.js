import * as dotenv from "dotenv";
dotenv.config();

async function searchRawg(title) {
  const params = new URLSearchParams({
    search: title,
    key: process.env.RAWG_API_KEY,
    page_size: 10,
  });

  const url = `${process.env.RAWG_URI}?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Nie udało się pobrać wyszukanej gry");
    }

    const data = await response.json();
    const results = data.results || [];
    const mapped = results.map((result) => ({
      rawgId: result.id,
      title: result.name,
      slug: result.slug,
      releaseDate: result.released,
      cover: result.background_image,
      rawgRating: result.rating,
      metacritic: result.metacritic,
    }));
    return mapped;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default searchRawg;
