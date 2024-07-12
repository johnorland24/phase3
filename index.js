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
        
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPokemonList();
});

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

// document.addEventListener('DOMContentLoaded', () => {
//     const loadingElement = document.createElement('div');
//     loadingElement.innerHTML = '<img src="loading.gif" alt="Loading" style="hieght:50px;width:50px;  display: block; margin-left: auto;margin-right: auto;">';
//     document.body.appendChild(loadingElement);
    
//     const timeout = setTimeout(() => {
//         loadingElement.textContent = 'Poor network connection. Please try again later.';
//     }, 5000);
    
//     Promise.all([fetchData(), pokemonSprite()])
//         .then(() => {
//             clearTimeout(timeout);
//             loadingElement.remove();
//         })
//         .catch((error) => {
//             console.error(error);
//             clearTimeout(timeout);
//             loadingElement.textContent = 'An error occurred. Please try again later.';
//         });
// });




// function fetchData() {
//     // const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
//     const pokemonSprite = document.getElementById("pokemonSprite");
    
//     // Clear previous search results
//     pokemonSprite.innerHTML = "";
    
//     // Create new item
//     const item = document.createElement("div");
//     item.classList.add("item");
    
//     // const itemName = document.createElement("span");
//     // itemName.classList.add("item-name");
//     // itemName.textContent = pokemonName;
    
//     const removeButton = document.createElement("button");
//     removeButton.classList.add("remove-button");
//     removeButton.innerHTML = "<i class='bx bx-x'></i>";
//     removeButton.addEventListener("click", function() {
//         item.remove();
//     });
    
//     item.appendChild(itemName);
//     item.appendChild(removeButton);
    
//     pokemonSprite.appendChild(item);
// }





















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