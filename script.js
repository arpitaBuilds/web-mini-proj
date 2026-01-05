let currentInput = '';
let previousInput = '';
let operation = null;
let shouldReset = false;

const resultDisplay = document.getElementById('result');
const expressionDisplay = document.getElementById('expression');
const darkToggle = document.getElementById('darkToggle');

document.querySelectorAll('.number').forEach(btn => {
    btn.addEventListener('click', () => {
        if (shouldReset) {
            currentInput = '';
            previousInput = '';
            operation = null;
            shouldReset = false;
        }
        currentInput += btn.textContent;
        updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!currentInput) return;
        if (previousInput) calculate();
        operation = btn.textContent;
        previousInput = currentInput;
        currentInput = '';
        updateDisplay();
    });
});

document.querySelector('.result-btn').addEventListener('click', () => {
    calculate();
    shouldReset = true;
});

function calculate() {
    if (!previousInput || !currentInput) return;
    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    let res = 0;

    switch (operation) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '×': res = a * b; break;
        case '/':
            if (b === 0) return alert("Cannot divide by zero");
            res = a / b;
            break;
    }

    currentInput = res.toString();
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    resultDisplay.textContent = currentInput || '0';
    expressionDisplay.textContent = previousInput && operation
        ? `${previousInput} ${operation}`
        : '';
}

/* DARK MODE */
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkToggle.textContent = "☀️";
}

darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    darkToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
