const optionsPool = [
    { text: "Waffles", image: "./image/waffle.jpg" },
    { text: "Pancakes", image: "./image/pancake.jpg" },
    { text: "Cheeseburger", image: "./image/cheeseburger.jpg" },
    { text: "Pizza", image: "./image/pizza.jpg" },
    { text: "Sushi", image: "./image/sushi.jpg" },
    { text: "Ice Cream", image: "./image/icecream.jpg" },
    { text: "Tacos", image: "./image/tacos.jpeg" },
    { text: "Spaghetti", image: "./image/spaghetti.jpeg" },
    { text: "Cake", image: "./image/cake.jpeg" },
    { text: "Fried Chicken", image: "./image/friedchicken.jpg" },
    { text: "Muffins", image: "./image/muffins.jpeg" },
    { text: "Yogurt Bowl", image: "./image/yogurtbowl.jpeg" },
    { text: "Enchanted Golden Apple", image: "./image/enchantedgoldenapple.jpg" }
];

let checklist = [];

const optionElements = document.querySelectorAll('.option');
const nextButton = document.querySelector('.game-container button');
const playAgainButton = document.querySelector('.play-again-btn');
const endScreen = document.querySelector('.end-screen');
const gameContainer = document.querySelector('.game-container');
const progressFill = document.querySelector('.progress-fill');
let selectedChoice = null;

const endScreenImages = [
    "./end-screen-image/happyhampter.jpeg",
    "./end-screen-image/happybob.jpeg",
    "./end-screen-image/kfckitty.jpeg",
    "./end-screen-image/mcfood.jpeg",
    "./end-screen-image/mckitty.jpeg",
];

const thumbsUpButton = document.querySelector('.thumbs-up-btn');
const endImage = document.querySelector('.end-image img');
let endImageIndex = 0;

thumbsUpButton.addEventListener('click', () => {
    thumbsUpButton.classList.add('pulse');

    endImageIndex = (endImageIndex + 1) % endScreenImages.length;
    endImage.src = endScreenImages[endImageIndex];

    thumbsUpButton.addEventListener('animationend', () => {
        thumbsUpButton.classList.remove('pulse');
    }, { once: true });
});

function getRandomOptions(excludeText) {
    if (checklist.length >= optionsPool.length) {
        return null;
    }

    let choice;
    do {
        choice = optionsPool[Math.floor(Math.random() * optionsPool.length)];
    } while (choice.text === excludeText || checklist.includes(choice.text));

    checklist.push(choice.text);
    return choice;
}

function renderOptions(element, data) {
    element.querySelector('img').src = data.image;
    element.querySelector('.option-text').textContent = data.text;
}

function updateProgressBar() {
    const percent = (checklist.length / optionsPool.length) * 100;
    progressFill.style.width = percent + '%';
}

function showEndScreen() {
    gameContainer.style.display = 'none';
    endScreen.style.display = 'flex';
}

function startGame() {
    checklist = [];
    selectedChoice = null;
    endScreen.style.display = 'none';
    gameContainer.style.display = 'flex';
    optionElements.forEach(el => el.classList.remove('selected')); 

    renderOptions(optionElements[0], getRandomOptions());
    renderOptions(
        optionElements[1],
        getRandomOptions(optionElements[0].querySelector('.option-text').textContent)
    );

    updateProgressBar();
}

optionElements.forEach(element => {
    element.addEventListener('click', () => {
        optionElements.forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        selectedChoice = element;
    });
});

nextButton.addEventListener('click', () => {
    if (!selectedChoice) {
        alert("Please select an option before proceeding.");
        return;
    }

    const loser = [...optionElements].find(el => el !== selectedChoice);
    const winnerText = selectedChoice.querySelector('.option-text').textContent;
    const nextOption = getRandomOptions(winnerText);

    if (!nextOption) {
        showEndScreen();
        return;
    }

    renderOptions(loser, nextOption);
    updateProgressBar();
    selectedChoice = null;
    optionElements.forEach(el => el.classList.remove('selected'));
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        nextButton.click();
    }
});

playAgainButton.addEventListener('click', startGame);

startGame();