import { filmList, intro } from './elements.js';
import { play } from './music.js';
import { restartAnimation } from './restart-animation.js';
import { romanize } from './roman.js';

const API_ENDPOINT = 'https://swapi.dev/api';
let films = [];

play(
  {
    audioUrl: 'audio/tema-sw.mp3',
    title: 'Star Wars Theme',
    artist: 'Unknow',
    coverImageUrl: './imgs/logo.svg',
  },
  document.body
);

function FilmItem(film, index) {
  const el = document.createElement('li');
  el.innerHTML = `Episode ${romanize(film.episode_id)} - ${film.title}`;
  el.onclick = () => loadIntroduction(film);
  return el;
}

async function fillFilmList() {
  filmList.innerHTML = '';

  if (Array.isArray(films)) {
    films
      .sort((a, b) => (a.episode_id < b.episode_id ? -1 : 1))
      .forEach((film, index) => filmList.appendChild(FilmItem(film, index)));
  }
  
  restartAnimation(intro);
}

async function loadFilms() {
  films = (
    await fetch(`${API_ENDPOINT}/films`)
      .then((response) => response.json())
      .then(({ results }) => results)
  );

  console.log(films); 
}

function loadIntroduction(film) {
  intro.innerHTML =
    `Episode ${film.episode_id}\r` +
    `${film.title}\r` +
    `\r${film.opening_crawl}\r`;
  restartAnimation(intro);
}

loadFilms().then(() => {
  fillFilmList();
});
