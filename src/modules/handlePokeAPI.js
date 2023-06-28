import { getPokemonComment } from './crudInvolvementAPI.js';
import getPokemon from './crudPokeAPI.js';

export const addPokeImg = () => {
  const pokeImg = document.querySelectorAll('.img');

  pokeImg.forEach(async (item) => {
    const { id } = item.parentElement.parentElement;
    const pokeData = await getPokemon(id);
    const pokeImg = pokeData.data.sprites.versions['generation-v']['black-white'].animated.front_default;
    item.src = pokeImg;
  });
};

export const addPokeName = () => {
  const name = document.querySelectorAll('.name');

  name.forEach(async (item) => {
    const { id } = item.parentElement.parentElement;
    const pokeData = await getPokemon(id);
    const pokeName = pokeData.data.name[0].toUpperCase() + pokeData.data.name.substring(1);
    item.innerText = pokeName;
  });
};

export const addPopupPokeData = async () => {
  const popupImg = document.querySelector('.popupImg');
  const popupName = document.querySelector('.popupName');
  const beItem = document.querySelector('.beItem');
  const ptItem = document.querySelector('.ptItem');
  const pwItem = document.querySelector('.pwItem');
  const phItem = document.querySelector('.phItem');
  const titleCounter = document.querySelector('.titleComment');
  const comments = document.querySelector('.comments');
  const { id } = popupImg.parentElement.parentElement;
  const pokeData = await getPokemon(id);
  const pokeImg = pokeData.data.sprites.versions['generation-v']['black-white'].animated.front_default;
  const pokeName = pokeData.data.name[0].toUpperCase() + pokeData.data.name.substring(1);
  const baseExperience = pokeData.data.base_experience;
  const pokemonType = pokeData.data.types.map((item) => item.type.name).join(', ');
  const pokemonWeight = pokeData.data.weight;
  const pokemonHeight = pokeData.data.height;
  const userdata = await getPokemonComment(id);
  const arrComments = userdata.data;
  const numComments = userdata.data.length;

  beItem.innerText = `Base experience: ${baseExperience}`;
  ptItem.innerText = `Pokemon type: ${pokemonType}`;
  pwItem.innerText = `Pokemon weight: ${pokemonWeight}`;
  phItem.innerText = `Pokemon height: ${pokemonHeight}`;

  titleCounter.innerHTML = `Comments ( ${numComments} )`;
  arrComments.forEach((e) => {
    const comment = document.createElement('p');
    comment.textContent = `${e.creation_date} - ${e.username}: ${e.comment}`;
    comments.appendChild(comment);
  });

  popupImg.src = pokeImg;
  popupName.innerText = pokeName;
};