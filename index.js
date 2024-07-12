async function fetchData() {
    try {
      const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const pokemonSprite = data.sprites.front_default;
      const imgElement = document.getElementById("pokemonSprite");
      
      // Remove existing remove button if it exists
      const removeButton = document.getElementById("removeButton");
      if (removeButton) {
        removeButton.remove();
      }
      
      imgElement.src = pokemonSprite;
      imgElement.style.display = "block";
      
      // Create remove button
      const removeButtonElement = document.createElement("button");
      removeButtonElement.id = "removeButton";
      removeButtonElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z"></path><path d="M15.292 7.295 12 10.587 8.708 7.295 7.294 8.709l3.292 3.292-3.292 3.292 1.414 1.414L12 13.415l3.292 3.292 1.414-1.414-3.292-3.292 3.292-3.292z"></path></svg>';
      removeButtonElement.addEventListener("click", function() {
        imgElement.src = "";
        imgElement.style.display = "none";
        removeButtonElement.remove();
      });
      
      // Append remove button to the container
      const containerElement = document.getElementById("remove");
      containerElement.appendChild(removeButtonElement);
    } catch (error) {
      console.error(error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    fetchPokemonList();
  });



async function fetchPokemonList() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const pokemonList = data.results;
        const pokemonContainer = document.getElementById('pokemonContainer');
        
        pokemonList.forEach(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            if (!pokemonResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const pokemonData = await pokemonResponse.json();
            const pokemonSprite = pokemonData.sprites.front_default;
            const pokemonName = pokemonData.name;
            const pokemonSkills = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
            
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');
            
            const pokemonImage = document.createElement('img');
            pokemonImage.classList.add('pokemon-image');
            pokemonImage.src = pokemonSprite;
            
            const pokemonNameElement = document.createElement('div');
            pokemonNameElement.classList.add('pokemon-name');
            pokemonNameElement.textContent = pokemonName;
            
            const pokemonSkillsElement = document.createElement('div');
            pokemonSkillsElement.classList.add('pokemon-skills');
            pokemonSkillsElement.textContent = pokemonSkills;
            
            pokemonCard.appendChild(pokemonImage);
            pokemonCard.appendChild(pokemonNameElement);
            pokemonCard.appendChild(pokemonSkillsElement);
            
            pokemonContainer.appendChild(pokemonCard);
        });
    } catch (error) {
        console.error(error);
    }
}
//search funtion for pokemon

  
//loading
document.addEventListener('DOMContentLoaded', () => {
    const loadingElement = document.createElement('div');
    loadingElement.innerHTML = '<img src="loading.gif" alt="Loading" style="hieght:50px;width:50px;  display: block; margin-left: auto;margin-right: auto;">';
    document.body.appendChild(loadingElement);
    
    const timeout = setTimeout(() => {
        loadingElement.textContent = 'Poor network connection. Please try again later.';
    }, 5000);
    
    Promise.all([fetchData(), fetchPokemonList()])
        .then(() => {
            clearTimeout(timeout);
            loadingElement.remove();
        })
        .catch((error) => {
            console.error(error);
            clearTimeout(timeout);
            loadingElement.textContent = 'An error occurred. Please try again later.';
        });
});






//













// async function fetchPokemonList() {
//     try {
//         const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         const pokemonList = data.results;
//         const pokemonContainer = document.getElementById('pokemonContainer');
        
//         pokemonList.forEach(async (pokemon) => {
//             const pokemonResponse = await fetch(pokemon.url);
//             if (!pokemonResponse.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const pokemonData = await pokemonResponse.json();
//             const pokemonSprite = pokemonData.sprites.front_default;
//             const pokemonName = pokemonData.name;
//             const pokemonSkills = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
            
//             const pokemonCard = document.createElement('div');
//             pokemonCard.classList.add('pokemon-card');
            
//             const pokemonImage = document.createElement('img');
//             pokemonImage.classList.add('pokemon-image');
//             pokemonImage.src = pokemonSprite;
            
//             const pokemonNameElement = document.createElement('div');
//             pokemonNameElement.classList.add('pokemon-name');
//             pokemonNameElement.textContent = pokemonName;
            
//             const pokemonSkillsElement = document.createElement('div');
//             pokemonSkillsElement.classList.add('pokemon-skills');
//             pokemonSkillsElement.textContent = pokemonSkills;
            
//             pokemonCard.appendChild(pokemonImage);
//             pokemonCard.appendChild(pokemonNameElement);
//             pokemonCard.appendChild(pokemonSkillsElement);
            
//             pokemonContainer.appendChild(pokemonCard);
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }