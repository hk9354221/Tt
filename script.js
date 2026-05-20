let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(operator) {
    if (expression && !isOperator(expression[expression.length - 1])) {
        expression += operator;
        updateDisplay();
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}

function updateDisplay() {
    display.value = expression;
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        if (expression) {
            let result = eval(expression);
            expression = result.toString();
            updateDisplay();
        }
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '%') {
        appendOperator('%');
    }
});
