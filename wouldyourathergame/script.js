/* ===== Data ===== */
 
// All possible food options the game can show; each has a display name and an image path
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

// Images the thumbs up button cycles through on the end screen
const endScreenImages = [
    "./end-screen-image/happyhampter.jpeg",
    "./end-screen-image/happybob.jpeg",
    "./end-screen-image/kfckitty.jpeg",
    "./end-screen-image/mcfood.jpeg",
    "./end-screen-image/mckitty.jpeg",
];



/* ===== DOM References ===== */
// Grabbing elements once here so we don't have to re-query the page every time we need them
const optionElements = document.querySelectorAll('.option'); // both food option cards
const nextButton = document.querySelector('.game-container button'); // the "Next" button
const playAgainButton = document.querySelector('.play-again-btn'); // resets the game
const thumbsUpButton = document.querySelector('.thumbs-up-btn'); // cycles the end-screen image
const endScreen = document.querySelector('.end-screen'); // the end screen container
const gameContainer = document.querySelector('.game-container'); // the main game container
const progressFill = document.querySelector('.progress-fill'); // the colored progress bar fill
const endImage = document.querySelector('.end-image img'); // the image shown on the end screen



/* ===== Game State ===== */
// Variables that change while the game is being played
let checklist = []; // tracks which foods have already been shown, so nothing repeats
let selectedChoice = null; // holds whichever option element the player last clicked
let endImageIndex = 0; // tracks which end-screen image is currently showing

/* ===== Helper Functions ===== */
 
// Picks a random food that hasn't been shown yet and isn't the one currently on screen
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

// Updates a given option's image and text to match the food data passed in
function renderOptions(element, data) {
    element.querySelector('img').src = data.image;
    element.querySelector('.option-text').textContent = data.text;
}

// Recalculates and updates how full the progress bar should be
function updateProgressBar() {
    const percent = (checklist.length / optionsPool.length) * 100;
    progressFill.style.width = percent + '%';
}

// Hides the game screen and reveals the end screen
function showEndScreen() {
    gameContainer.style.display = 'none';
    endScreen.style.display = 'flex';
}

// Resets everything and starts a fresh round of the game
function startGame() {
    checklist = []; // clear the list of foods already shown
    selectedChoice = null; // clear any previously selected option
    endScreen.style.display = 'none'; // hide the end screen
    gameContainer.style.display = 'flex'; // show the game screen
    optionElements.forEach(el => el.classList.remove('selected')); // remove leftover highlight from last game

    // Fill both option cards with two different random foods
    renderOptions(optionElements[0], getRandomOptions());
    renderOptions(
        optionElements[1],
        getRandomOptions(optionElements[0].querySelector('.option-text').textContent)
    );

    updateProgressBar(); // reset the progress bar back to its starting point
}



/* ===== Event Listeners ===== */
 
// Highlights whichever food option the player clicks on
optionElements.forEach(element => {
    element.addEventListener('click', () => {
        optionElements.forEach(el => el.classList.remove('selected')); // clear old highlight
        element.classList.add('selected'); // highlight the clicked one
        selectedChoice = element; // remember what was picked
    });
});

// Moves the game forward to the next round when "Next" is clicked
nextButton.addEventListener('click', () => {
    // Don't continue if the player hasn't picked anything yet
    if (!selectedChoice) {
        alert("Please select an option before proceeding.");
        return;
    }

    const loser = [...optionElements].find(el => el !== selectedChoice); // the option NOT picked 
    const winnerText = selectedChoice.querySelector('.option-text').textContent;  // the picked food's name
    const nextOption = getRandomOptions(winnerText);// get a new food to replace the loser
 
    // No more unique foods left, so the game is over
    if (!nextOption) {
        showEndScreen();
        return;
    }

    renderOptions(loser, nextOption); // swap in the new food
    updateProgressBar(); // reflect the new progress
    selectedChoice = null; // clear selection for the next round
    optionElements.forEach(el => el.classList.remove('selected')); // clear highlight for the next round
});

// Lets the player press the spacebar as a shortcut for clicking "Next"
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        nextButton.click();
    }
});

// Restarts the game when "Play Again" is clicked
playAgainButton.addEventListener('click', startGame);

// Cycles to the next end-screen image and plays a little pulse animation on click
thumbsUpButton.addEventListener('click', () => {
    thumbsUpButton.classList.add('pulse'); // starts the pulse animation

    endImageIndex = (endImageIndex + 1) % endScreenImages.length; // move to the next image, looping back to 0 at the end
    endImage.src = endScreenImages[endImageIndex];

    // Removes the pulse class once the animation finishes, so it can play again next click
    thumbsUpButton.addEventListener('animationend', () => {
        thumbsUpButton.classList.remove('pulse');
    }, { once: true });
});



/* ===== Initialize Game ===== */
 
// Kicks off the game as soon as the page loads
startGame();