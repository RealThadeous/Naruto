let characterList = [];

const output = (characters) => {
  characters.forEach(
      character => {
          let article = document.createElement('article');

          let name = document.createElement('h2');
          name.textContent = character.Name;

          let attack = document.createElement('h4');
          attack.textContent = `Attack: ${character.Attack}`;

          let quote = document.createElement('p');
          quote.textContent = character.Quote;

          let img = document.createElement('img');
          img.setAttribute('src', character.imageUrl);
          img.setAttribute('alt', character.Name);

          article.appendChild(name);
          article.appendChild(attack);
          article.appendChild(img);
          article.appendChild(quote);

          document.querySelector('#characters').appendChild(article);    
      }
  );
}    

fetch('https://run.mocky.io/v3/2abdcd1e-8297-40ac-af98-21016f008a2e')
    .then(response => response.json())
    .then(characters => {
        characterList = characters;
        output(characterList);
    });

const reset = () => {
      document.querySelector('#characters').innerHTML = '';
}

const sortBy = () => {
    reset();

    let filter = document.querySelector('#sortBy').value;

    switch (filter) {
        case 'characterNameAscending':
            output(characterList.sort(
                (character1, character2) => {
                    let characterName1 = character1.Name.toLowerCase();
                    let characterName2 = character2.Name.toLowerCase();
                    if (characterName1 < characterName2) return -1;
                    else if (characterName1 > characterName2) return 1;
                    else return 0;
                }));
            break;
        case 'characterNameDescending':
            output(characterList.sort(
                (character1, character2) => {
                    let characterName1 = character1.Name.toLowerCase();
                    let characterName2 = character2.Name.toLowerCase();
                    if (characterName1 > characterName2) return -1;
                    else if (characterName1 < characterName2) return 1;
                    else return 0;
                }));
            break;
        case 'default':
            output(characterList.sort(
                (character1, character2) => 
                character1.Name.toLowerCase() > character2.Name.toLowerCase() ? 1 : 
                    character2.Name.toLowerCase() > character1.Name.toLowerCase() ? -1 : 0));
            break;
    }
}

document.querySelector('#sortBy').addEventListener('change', sortBy);