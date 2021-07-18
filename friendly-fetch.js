const cache = {};

export const friendlyFetch = async (url) => {
  const cached = JSON.parse(localStorage.getItem(url));

  if (cached) {
    console.log('Got from cache');
    return cached;
  }

  const result = await fetch(url);
  const { results } = await result.json();
  localStorage.setItem(url, JSON.stringify(results));
  return results;
};
