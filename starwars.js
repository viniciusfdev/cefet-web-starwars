import { play } from "./music.js";

const API_ENDPOINT = "https://swapi.dev/api";

play({
  audioUrl: "audio/tema-sw.mp3",
  title: "Star Wars Theme",
  artist: "Unknow",
  coverImageUrl: "./imgs/logo.svg",
}, document.body)

