const levels = [
    { 
        correctSequence: [1, 5, 9, 3],
        tips: [
            "Tip 1: Partly cloudy with a chance of insight.",
            "Tip 2: Connecting the dots can lead to breakthroughs.",
            "Tip 3: A line through the middle may strike a chord.",
            "Tip 4: Thunder may follow the brightest light."
        ]
    },
    { 
        correctSequence: [2, 4, 6, 8],
        tips: [
            "Tip 1: The brightest star in the sky.",
            "Tip 2: Half a star, half the mystery.",
            "Tip 3: A master of the craft.",
            "Tip 4: Infinity is just the beginning."
        ]
    },
    { 
        correctSequence: [1, 7, 3, 9],
        tips: [
            "Tip 1: Partly cloudy with a chance of insight.",
            "Tip 2: Unlocking new paths.",
            "Tip 3: Thunder may follow the brightest light.",
            "Tip 4: A line through the middle may strike a chord."
        ]
    },
    // Add more levels as needed
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
    const icons = [
        "lni lni-cloudy-sun",
        "lni lni-sun",
        "lni lni-thunder",
        "lni lni-star-half",
        "lni lni-connectdevelop",
        "lni lni-sketch",
        "lni lni-key",
        "lni lni-infinite",
        "lni lni-strikethrough"
    ];
    const shuffledIcons = shuffleArray(icons);

    for (let i = 0; i < 9; i++) {
        const cube = document.createElement('div');
        cube.classList.add('cube');
        cube.dataset.position = i + 1;
        cube.dataset.icon = shuffledIcons[i];
        cube.innerHTML = `<i class="${shuffledIcons[i]}"></i>`;
        cube.addEventListener('click', () => selectCube(cube));
        gridContainer.appendChild(cube);
    }

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
    const { correctSequence, tips } = levels[currentLevel];
    if (arraysEqual(selectedSequence, correctSequence)) {
        document.getElementById('grid-container').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('grid-container').style.display = 'none';
            const levelMessage = document.getElementById('level-message');
            levelMessage.classList.remove('hidden');
            levelMessage.classList.remove('fade-out');
            levelMessage.classList.add('fade-in');
            document.getElementById('level-text').value = `Level ${currentLevel + 1} Completed!`;
        }, 1000);
    } else {
        attempts++;
        if (attempts % 4 === 0) {
            displayTaunt();
        } else if (attempts % 3 === 0) {
            displayTip(tips[Math.floor(attempts / 3) - 1]);
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
    if (currentLevel < levels.length) {
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
    const tips = levels[currentLevel].tips;
    const attemptsInfo = `Attempts: ${attempts} / 20`;

    let modalContent = "<h2>Code clues:</h2>";
    tips.forEach((tip, index) => {
        if (index < Math.floor(attempts / 3) && !shownTips.has(tip)) {
            modalContent += `<p><strong>Tip ${index + 1}:</strong> ${tip}</p>`;
            shownTips.add(tip); // Add tip to shown tips
        }
    });

    modalContent += `<p>${attemptsInfo}</p>`;

    const modalContentElement = document.getElementById('modal-content');
    modalContentElement.innerHTML = modalContent;
}
