const correctSequence = [1, 5, 9, 3];
let selectedSequence = [];
let attempts = 0;

document.addEventListener('DOMContentLoaded', () => {
    const cubes = document.querySelectorAll('.cube');
    cubes.forEach(cube => {
        cube.addEventListener('click', () => {
            if (!cube.classList.contains('selected') && selectedSequence.length < 4) {
                cube.classList.add('selected');
                selectedSequence.push(parseInt(cube.dataset.position));
                if (selectedSequence.length === 4) {
                    validateSequence();
                }
            }
        });
    });
});

function validateSequence() {
    if (arraysEqual(selectedSequence, correctSequence)) {
        document.querySelector('.content').classList.add('fade-out');
        setTimeout(() => {
            document.querySelector('.content').style.display = 'none';
            document.getElementById('message-box').classList.remove('hidden');
            document.getElementById('message-box').classList.add('fade-in');
        }, 1000);
    } else {
        attempts++;
        if (attempts >= 4) {
            document.querySelector('.content').classList.add('fade-out');
            setTimeout(() => {
                document.querySelector('.content').style.display = 'none';
            }, 1000);
        } else {
            resetCubes();
        }
    }
}

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function resetCubes() {
    const cubes = document.querySelectorAll('.cube');
    cubes.forEach(cube => cube.classList.remove('selected'));
    selectedSequence = [];
}

function closeMessage() {
    document.getElementById('message-box').classList.add('fade-out');
    setTimeout(() => {
        document.getElementById('message-box').classList.add('hidden');
    }, 1000);
}
