import { play } from './music.js'
import { toRoman } from './roman.js'
import { restartAnimation } from './restart-animation.js'
import { friendlyFetch } from './friendly-fetch.js'

const API_ENDPOINT = 'https://swapi.info/api'

// exercício 1
play(
  {
    audioUrl: 'audio/tema-sw.mp3',
    coverImageUrl: 'imgs/logo.svg',
    title: 'Intro',
    artist: 'John Williams'
  },
  document.body
)

// exercício 2
async function carregarFilmes() {
  const filmes = await friendlyFetch(`${API_ENDPOINT}/films`)

  // opcional 4
  filmes.sort((a, b) => a.episode_id - b.episode_id)

  const ul = document.querySelector('#filmes ul')
  ul.innerHTML = ''

  for (const filme of filmes) {
    const romano = toRoman(filme.episode_id).padEnd(4, ' ')
    const li = document.createElement('li')
    li.textContent = `Episode ${romano} - ${filme.title}`
    li.addEventListener('click', () => mostrarIntro(filme))
    ul.appendChild(li)
  }
}

// exercício 3
function mostrarIntro(filme) {
  const intro = document.querySelector('pre.introducao')
  const romano = toRoman(filme.episode_id)
  intro.textContent = `Episode ${romano}\n${filme.title}\n\n${filme.opening_crawl}`
  restartAnimation(intro)
}

carregarFilmes()
