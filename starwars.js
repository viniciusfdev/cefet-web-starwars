import { filmList } from './elements.js';
import { play } from './music.js';
import { romanize } from './roman.js';

const API_ENDPOINT = 'https://swapi.dev/api';

play(
  {
    audioUrl: 'audio/tema-sw.mp3',
    title: 'Star Wars Theme',
    artist: 'Unknow',
    coverImageUrl: './imgs/logo.svg',
  },
  document.body
);

function FilmItem(film) {
  const el = document.createElement("li");
  el.innerHTML = `Episode ${romanize(film.episode_id)} - ${film.title}`
  return el;
}

async function fillFilmList() {
  filmList.innerHTML = '';

  const films = await fetch(`${API_ENDPOINT}/films`)
    .then((response) => response.json())
    .then(({ results }) => results);

  if (Array.isArray(films)) {
    films.forEach((film) => {
      filmList.appendChild(FilmItem(film));
    });
  }
}

fillFilmList();
