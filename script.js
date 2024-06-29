const iconTips = {
    "lni lni-cloudy-sun": [
        "Tip 1: Partly cloudy with a chance of insight.",
        "Tip 2: Weather the storm with clarity.",
        "Tip 3: A bright spot in a cloudy day."
    ],
    "lni lni-sun": [
        "Tip 1: The brightest star in the sky.",
        "Tip 2: Let the sunshine in.",
        "Tip 3: Radiate positivity."
    ],
    "lni lni-thunder": [
        "Tip 1: Thunder may follow the brightest light.",
        "Tip 2: Strike with precision.",
        "Tip 3: A bolt from the blue."
    ],
    "lni lni-star-half": [
        "Tip 1: Half a star, half the mystery.",
        "Tip 2: Shine halfway through.",
        "Tip 3: A star on the rise."
    ],
    "lni lni-connectdevelop": [
        "Tip 1: Connecting the dots can lead to breakthroughs.",
        "Tip 2: Build connections.",
        "Tip 3: Develop your path."
    ],
    "lni lni-sketch": [
    "Tip 1: a girl's best friend",
    "Tip 2: Draw your destiny, like cutting a perfect gem.",
    "Tip 3: Search for adamas and you shal find."
        ],
    "lni lni-key": [
        "Tip 1: Unlocking new paths.",
        "Tip 2: The key to success.",
        "Tip 3: Open the door to possibilities."
    ],
    "lni lni-infinite": [
        "Tip 1: Infinity is just the beginning.",
        "Tip 2: Endless possibilities.",
        "Tip 3: Loop through infinity."
    ],
    "lni lni-strikethrough": [
        "Tip 1: A line through the middle may strike a chord.",
        "Tip 2: Cross out the unnecessary.",
        "Tip 3: Strike with precision and your path through the middle will be revealed"
    ]
};

const levelSolutions = [
    ["lni lni-sun", "lni lni-star-half", "lni lni-sketch", "lni lni-infinite"],
    ["lni lni-cloudy-sun", "lni lni-key", "lni lni-thunder", "lni lni-strikethrough"],
    ["lni lni-strikethrough", "lni lni-connectdevelop", "lni lni-thunder", "lni lni-key"],
    ["lni lni-star-half", "lni lni-sketch", "lni lni-sun", "lni lni-cloudy-sun"],
    ["lni lni-key", "lni lni-infinite", "lni lni-diamond", "lni lni-thunder"]
];

const levelCompletionMessages = [
    "Level 1 Completed! Remember the solomon famiglia is our ally and should not be threathend, executed or otherwise dismemberd",
    "Level 2 Completed! To travel between the city and Fort Cadworth apply human blood to wall 48C and speak the words: Fear the Red dawn",
    "Level 3 Completed! Do remember the 3 family heads, Inny,  Minny & MICKEY. If ever asked for verification by a higher ranking officer you must always present your isignia and passcode ",
    "Level 4 Completed! Receive your passcode & token from the orc chieftan Bildud to enter the main lair. The OTP code is ",
    "Level 5 Completed! Whatever you do don't intefere with the red magical appliances in the main underground hall!!!"
];


let currentLevel = 0;
let selectedSequence = [];
let attempts = 0;
const shownTips = new Set();

document.addEventListener('DOMContentLoaded', () => {
    loadLevel(currentLevel);
});

function loadLevel(level) {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';

    const solution = levelSolutions[level];
    const allIcons = Object.keys(iconTips);
    const shuffledIcons = shuffleArray([...allIcons]);

    const iconPositionMap = {};
    for (let i = 0; i < 9; i++) {
        const icon = shuffledIcons[i];
        iconPositionMap[i + 1] = icon;

        const cube = document.createElement('div');
        cube.classList.add('cube');
        cube.dataset.position = i + 1;
        cube.dataset.icon = icon;
        cube.innerHTML = `<i class="${icon}"></i>`;
        cube.addEventListener('click', () => selectCube(cube));
        gridContainer.appendChild(cube);
    }

    // Save the icon positions for validation
    window.currentIconPositionMap = iconPositionMap;
    window.currentSolution = solution;

    // Reset selectedSequence and enable cube selection
    selectedSequence = [];
    enableCubeSelection();
}



function selectCube(cube) {
    if (!cube.classList.contains('selected') && selectedSequence.length < 4) {
        cube.classList.add('selected');
        selectedSequence.push(parseInt(cube.dataset.position));
        if (selectedSequence.length === 4) {
            setTimeout(validateSequence, 700); // Delay validation by 0.7 seconds
        }
    }
}

function enableCubeSelection() {
    const cubes = document.querySelectorAll('.cube');
    cubes.forEach(cube => {
        cube.classList.remove('selected'); // Clear any selected cubes from previous level
        cube.style.pointerEvents = 'auto'; // Ensure cubes are clickable
    });
}

function validateSequence() {
    const solutionIcons = window.currentSolution.map((icon, index) => {
        const position = Object.keys(window.currentIconPositionMap).find(key => window.currentIconPositionMap[key] === icon);
        return parseInt(position);
    });

    if (arraysEqual(selectedSequence, solutionIcons)) {
        document.getElementById('grid-container').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('grid-container').style.display = 'none';
            const levelMessage = document.getElementById('level-message');
            levelMessage.classList.remove('hidden');
            levelMessage.classList.remove('fade-out');
            levelMessage.classList.add('fade-in');
            document.getElementById('level-text').textContent = `Level ${currentLevel + 1} Completed!`;
            // Display level completion message based on currentLevel
            if (currentLevel < levelCompletionMessages.length) {
                const completionMessage = levelCompletionMessages[currentLevel];
                const completionMessageParagraph = document.createElement('p');
                completionMessageParagraph.textContent = completionMessage;
                document.getElementById('level-text').textContent =(completionMessage);
            }
        }, 1000);
    } else {
        attempts++;
        if (attempts % 4 === 0) {
            displayTaunt();
        } else if (attempts % 3 === 0) {
            const tipIndex = Math.floor(attempts / 3) - 1;
            if (tipIndex < solutionIcons.length) {
                const icon = window.currentSolution[tipIndex];
                const tip = iconTips[icon][tipIndex % 3];
                displayTip(tip);
                shownTips.add(tip); // Store shown tip
            }
        } else {
            document.getElementById('title').textContent = "FEAR THE RED DAWN";
        }
        resetCubes();
    }

    if (attempts === 20) {
        document.getElementById('grid-container').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('grid-container').style.display = 'none';
            const levelMessage = document.getElementById('level-message');
            levelMessage.classList.remove('hidden');
            levelMessage.classList.remove('fade-out');
            levelMessage.classList.add('fade-in');
            document.getElementById('level-text').textContent = "Tell the DM: BOOM!";
            const resetButton = document.createElement('button');
            resetButton.textContent = "Reset Puzzle";
            resetButton.addEventListener('click', resetPuzzle);
            levelMessage.appendChild(resetButton);
        }, 1000);
    }
}


function displayTip(tip) {
    const title = document.getElementById('title');
    title.textContent = tip;
}


function resetPuzzle() {
    attempts = 0;
    shownTips.clear(); // Clear shown tips
    document.getElementById('title').textContent = "";
    document.getElementById('level-text').textContent = "";
    const gridContainer = document.getElementById('grid-container');
    gridContainer.style.display = 'grid';
    gridContainer.classList.remove('fade-out');
    gridContainer.classList.add('fade-in');
    loadLevel(currentLevel);
}

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function resetCubes() {
    const cubes = document.querySelectorAll('.cube');
    cubes.forEach(cube => cube.classList.remove('selected'));
    selectedSequence = [];
}

function displayTip(tip) {
    const title = document.getElementById('title');
    title.textContent = tip;
}

function displayTaunt() {
    const title = document.getElementById('title');
    const taunts = [
        "You call that an attempt? I've seen gnats with more skill!",
        "Did you lose your glasses? Or are you just blind to the truth?",
        "A monkey could do better... if it had an IQ boost!"
    ];
    const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
    title.textContent = randomTaunt;
}

function nextLevel() {
    currentLevel++;
    if (currentLevel < levelSolutions.length) {
        const levelMessage = document.getElementById('level-message');
        levelMessage.classList.remove('fade-in');
        levelMessage.classList.add('fade-out');
        setTimeout(() => {
            levelMessage.classList.add('hidden');
            levelMessage.classList.remove('fade-out');
            const gridContainer = document.getElementById('grid-container');
            gridContainer.style.display = 'grid';
            gridContainer.classList.remove('fade-out');
            gridContainer.classList.add('fade-in');
            loadLevel(currentLevel);
        }, 1000);
    } else {
        const title = document.getElementById('title');
        title.textContent = "All levels completed!";
        document.getElementById('grid-container').style.display = 'none';
        document.getElementById('level-message').style.display = 'none';
    }
}



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function toggleModal() {
    const modal = document.getElementById('modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';

    if (modal.style.display === 'block') {
        populateModalContent();
    }
}

function populateModalContent() {
    const solution = levelSolutions[currentLevel];
    const tips = solution.map(icon => iconTips[icon]);
    const attemptsInfo = `Attempts: ${attempts} / 20`;

    let modalContent = `<h2>STAGE: ${currentLevel + 1}</h2>`;
    solution.forEach((icon, index) => {
        const tipIndex = Math.floor(attempts / 3) - 1;
        if (shownTips.has(iconTips[icon][index % 3])) {
            modalContent += `<p>${iconTips[icon][index % 3]}</p>`;
        }
    });

    modalContent += `<p>${attemptsInfo}</p>`;

    const modalContentElement = document.getElementById('modal-content');
    modalContentElement.innerHTML = modalContent;
}

