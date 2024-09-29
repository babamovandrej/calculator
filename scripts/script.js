class Calculator {
    constructor() {
        this.currentValue = "0";
        this.firstValue = "";
        this.secondValue = "";
        this.currentOperator = null;
        this.shouldResetScreen = false;
        this.operations = {
            "+": (a, b) => a + b,
            "−": (a, b) => a - b,
            "×": (a, b) => a * b,
            "÷": (a, b) => a / b
        };
        this.clickSound = new Audio('../audio/calculator_click.mp3'); 
    }

    init() {
        this.currentOperationDisplay = document.getElementById('currentOperationDisplay');
        this.previousOperationDisplay = document.getElementById('previousOperationDisplay');

        document.querySelectorAll('.number-button').forEach(button => {
            button.addEventListener('click', () => {
                this.playClickSound();
                this.appendNumber(button.textContent);
            });
        });

        document.querySelectorAll('.operator-button').forEach(button => {
            button.addEventListener('click', () => {
                this.playClickSound();
                this.setOperator(button.textContent);
            });
        });

        document.getElementById('equalsButton').addEventListener('click', () => {
            this.playClickSound();
            this.operate();
        });

        document.getElementById('clearButton').addEventListener('click', () => {
            this.playClickSound();
            this.clear();
        });

        document.getElementById('deleteButton').addEventListener('click', () => {
            this.playClickSound();
            this.deleteLastDigit();
        });

        document.addEventListener('keydown', (event) => this.handleKeyboardInput(event));
    }

    playClickSound() {
        this.clickSound.currentTime = 0;
        this.clickSound.play();
    }

    handleKeyboardInput(event) {
        if (event.key >= '0' && event.key <= '9') {
            this.playClickSound();
            this.appendNumber(event.key);
        } else if (event.key === '.') {
            this.playClickSound();
            this.appendDecimal();
        } else if (event.key === '=' || event.key === 'Enter') {
            this.playClickSound();
            this.operate();
        } else if (event.key === 'Backspace') {
            this.playClickSound();
            this.deleteLastDigit();
        } else if (event.key === 'Escape') {
            this.playClickSound();
            this.clear();
        } else if (['+', '-', '*', '/'].includes(event.key)) {
            this.playClickSound();
            this.setOperator(this.convertOperator(event.key));
        }
    }

    convertOperator(key) {
        switch (key) {
            case '+':
                return '+';
            case '-':
                return '−';
            case '*':
                return '×';
            case '/':
                return '÷';
            default:
                return null;
        }
    }

    appendNumber(number) {
        if (this.shouldResetScreen) this.resetScreen();
        if (this.currentValue.replace('.', '').length < 12) {
            this.currentValue = this.currentValue === "0" ? number : this.currentValue + number;
        }
        this.updateDisplay();
    }

    resetScreen() {
        this.currentValue = "";
        this.shouldResetScreen = false;
    }

    clear() {
        this.currentValue = "0";
        this.firstValue = "";
        this.secondValue = "";
        this.currentOperator = null;
        this.updateDisplay();
        this.clearPreviousOperationDisplay();
    }

    clearPreviousOperationDisplay() {
        this.previousOperationDisplay.textContent = "";
    }

    appendDecimal() {
        if (this.shouldResetScreen) this.resetScreen();
        if (!this.currentValue.includes(".")) {
            this.currentValue += this.currentValue === "" ? "0." : ".";
        }
        this.updateDisplay();
    }

    deleteLastDigit() {
        this.currentValue = this.currentValue.slice(0, -1) || "0";
        this.updateDisplay();
    }

    setOperator(operator) {
        if (this.currentOperator !== null) {
            this.operate();
        }
        this.firstValue = this.currentValue;
        this.currentOperator = operator;
        this.shouldResetScreen = true;
        this.updateOperationDisplay();
    }

    operate() {
        if (this.currentOperator === null || this.shouldResetScreen) return;
        this.secondValue = this.currentValue;
        if (this.currentOperator === "÷" && this.currentValue === "0") {
            alert("You can't divide by 0!");
            return;
        }
        this.currentValue = this.roundResult(
            this.operations[this.currentOperator](Number(this.firstValue), Number(this.secondValue))
        ).toString();
        this.updateDisplay();
        this.updateOperationDisplay(true);
        this.currentOperator = null;
    }

    roundResult(number) {
        return Math.round(number * 1000) / 1000;
    }

    updateDisplay() {
        const displayValue = this.formatNumber(this.currentValue);
        this.currentOperationDisplay.textContent = displayValue;
    }

    formatNumber(number) {
        if (number.length > 12) {
            return Number(number).toExponential(9);
        }
        return number;
    }

    updateOperationDisplay(isEvaluated = false) {
        this.previousOperationDisplay.textContent = isEvaluated
            ? `${this.firstValue} ${this.currentOperator} ${this.secondValue} =`
            : `${this.firstValue} ${this.currentOperator}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
    calculator.init();
});