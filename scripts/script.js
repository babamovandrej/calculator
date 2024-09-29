class Calculator {
    constructor () {
        this.currentOperand = "0";
        this.previousOperand = "0";
        this.operator = null;
        this.currentExpression = null;
    }

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b
    }

    divide(a, b) {
        return a / b
    }

    operate () {
        
    }

    clearAll() {
        this.currentOperand = "0"
        this.previousOperand = "0"
        this.operator = null;
        this.currentExpression = null;
    }

    clearEntry () {
        this.currentOperand = "0"
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator()

    document.getElementById('clear-all').addEventListener('click', () => {
        calculator.clearAll()
    })

    document.getElementById('clear-entry').addEventListener('click', () => {
        calculator.clearEntry()
    })

})


