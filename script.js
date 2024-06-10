const correctCode = '1234';
let attempts = 0;

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.code-input');
    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    validateCode();
                }
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '') {
                if (index > 0) {
                    inputs[index - 1].focus();
                }
            }
        });
    });
});

function validateCode() {
    const inputs = document.querySelectorAll('.code-input');
    const enteredCode = Array.from(inputs).map(input => input.value).join('');
    if (enteredCode === correctCode) {
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
            inputs.forEach(input => {
                input.value = '';
                input.classList.add('error');
            });
            inputs[0].focus();
            setTimeout(() => {
                inputs.forEach(input => input.classList.remove('error'));
            }, 1000);
        }
    }
}

function closeMessage() {
    document.getElementById('message-box').classList.add('fade-out');
    setTimeout(() => {
        document.getElementById('message-box').classList.add('hidden');
    }, 1000);
}

// Adding fade-in and fade-out CSS animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .fade-out {
        animation: fadeOut 1s forwards;
    }

    .fade-in {
        animation: fadeIn 1s forwards;
    }

    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .error {
        border-color: red;
    }
`;
document.head.appendChild(styleSheet);
