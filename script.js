const startButton = document.getElementById('startButton');
const instructions = document.querySelector('.instructions');

startButton.addEventListener('click', promptUserForRecipes);

let recipesList;
let spinAnimation;

function promptUserForRecipes() {
  let recipes = prompt("Enter your list of recipes, separated by commas:");
  if (recipes) {
    startButton.style.display = 'none';
    instructions.style.display = 'none';
    displayRecipeList(recipes);
    displaySpinButton(recipes, false);
  }
}

function displayRecipeList(recipes) {
  recipesList = recipes.split(',').map(item => item.trim()).filter(item => item);
  let recipeListContainer = document.createElement('div');
  let ul = document.createElement('ul');

  recipesList.forEach(recipe => {
    let li = document.createElement('li');
    li.textContent = recipe;
    ul.appendChild(li);
  });

  ul.style.listStyleType = 'none';
  ul.style.padding = '0';
  ul.style.marginTop = '20px';

  let listItems = ul.querySelectorAll('li');
  listItems.forEach(li => {
    li.style.fontSize = '1.5em';
    li.style.marginBottom = '10px';
  });

  recipeListContainer.appendChild(ul);
  let container = document.querySelector('.container');
  container.appendChild(recipeListContainer);
}

function displaySpinButton(recipes, isSpinAgain) {
  let existingSpinButton = document.getElementById('spinButton');
  if (existingSpinButton) {
    existingSpinButton.textContent = 'Spin Again';
  } else {
    let spinButton = document.createElement('button');
    spinButton.id = 'spinButton';
    spinButton.textContent = isSpinAgain ? 'Spin Again' : 'Spin the Wheel';
    spinButton.style.fontSize = '1.5em';
    spinButton.style.padding = '10px 20px';
    spinButton.style.border = 'none';
    spinButton.style.borderRadius = '10px';
    spinButton.style.backgroundColor = '#ffcc00';
    spinButton.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
    spinButton.style.cursor = 'pointer';
    spinButton.style.marginTop = '20px';

    spinButton.addEventListener('click', () => {
      spinTheWheel(recipesList);
      displaySpinButton(recipes, true);
    });

    let container = document.querySelector('.container');
    container.appendChild(spinButton);
  }
}

function spinTheWheel(recipeList) {
  let ul = document.querySelector('.container ul');
  let listItems = ul.querySelectorAll('li');
  let currentRecipeIndex = 0;
  let spinDuration = 2000;
  let startTime = Date.now();

  if (spinAnimation) {
    clearInterval(spinAnimation);
  }

  spinAnimation = setInterval(() => {
    let elapsed = Date.now() - startTime;
    if (elapsed >= spinDuration) {
      clearInterval(spinAnimation);
      let randomIndex = Math.floor(Math.random() * recipeList.length);
      highlightRecipe(listItems, randomIndex);
    } else {
      highlightRecipe(listItems, currentRecipeIndex);
      currentRecipeIndex = (currentRecipeIndex + 1) % recipeList.length;
    }
  }, 100);
}

function highlightRecipe(listItems, index) {
  listItems.forEach((li, i) => {
    li.style.backgroundColor = i === index ? '#fff2cc' : '';
  });
}
