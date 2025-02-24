function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    } else {
        alert("Invalid operator");
        return null;
    }
}

// input: list of operators and numbers
// output: int output
// go through every operators and number, add curr number to operator
// 
function calculate(operandlist, numberlist) {
    // numberlist has to be 1 greater than operandlist
    if (operandlist.length + 1 != numberlist.length) {
        console.error("error during operation");
    }
    else {
        let result = numberlist[0];
        for (let i = 0; i < operandlist.length; i++) {
            result = operate(operandlist[i],  result, numberlist[i + 1])
        }
        return result;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    let operandlist = [];
    let numberlist = [];
    let currentOperator = null;
    const digitButtons = document.querySelectorAll(".digits");
    let decimal = false;
    let numberbefore = false;
    digitButtons.forEach(button => {
        button.addEventListener("click" , function() {
            if (display.textContent.trim() == "0") {
                display.textContent = ""
            }
            let currentInput = button.textContent.trim();
            if (currentInput == ".") {
                if (decimal) {
                    return;
                }
                decimal = true;
            }
            if (numberbefore) {
                numberlist[numberlist.length - 1] = numberlist[numberlist.length - 1] + currentInput
            } else {
                if (currentInput == "0" && display.textContent == "0") {
                    return;
                }
                numberbefore = true;
                numberlist.push(currentInput);
            }
            display.textContent += currentInput;
        });
    });

    const operatorButtons = document.querySelectorAll(".operators");
    operatorButtons.forEach(button => {
        button.addEventListener("click" , function() {
            let currentOperator = button.textContent; 
            currentOperator = currentOperator.trim();
            if (numberlist.length != (operandlist.length + 1)) {
                return;
            } 
            else {
                decimal = false;
                if (currentOperator == "backspace") {
                // if nothing there, just return
                if (display.textContent == "0") {
                    return;
                }
                else {
                    if (numberbefore == true) {
                        numberlist[numberlist.length - 1] = numberlist[numberlist.length - 1].slice(0, -1)
                        if (numberlist[numberlist.length - 1].length == 0) {
                            numberlist.pop()
                            numberbefore = false;
                        }
                    } else {
                        operandlist.pop()
                        numberbefore = true;
                    }
                    display.textContent = display.textContent.slice(0, -1)
                    if (display.textContent == "") {
                        display.textContent = "0"
                    }
                }
                // see if last input is number or operator
            }
            else if (currentOperator == "=") {
                display.textContent = calculate(operandlist, numberlist);
                numberlist = [calculate(operandlist, numberlist)]
                operandlist = []
            }
            else {
                operandlist.push(currentOperator);
                numberbefore = false;
                display.textContent += currentOperator;
            }
        }
        })
    })
    const clearButton = document.querySelector(".clear");
    clearButton.addEventListener("click", function() {
        currentInput = "";
        firstOperand = null;
        secondOperand = null;
        currentOperator = null;
        display.textContent = "0";
        operandlist = [];
        numberlist = [];
    });
    document.addEventListener("keydown", function(event) {
        const key = event.key;
        const digitButton = document.querySelector(`button.digits[data-key="${key}"]`);
        const operatorButton = document.querySelector(`button.operators[data-key="${key}"]`);
        const equalsButton = document.querySelector(`button.operators[data-key="Enter"], button.operators[data-key="="]`);
        const clearButton = document.querySelector(`button.clear[data-key="${key}"]`);
        const backspaceButton = document.querySelector(`button.backspace[data-key="${key}"]`);

        if (digitButton) {
            digitButton.click();
        } else if (operatorButton) {
            operatorButton.click();
        } else if (equalsButton) {
            equalsButton.click();
        } else if (clearButton) {
            clearButton.click();
        } else if (backspaceButton) {
            backspaceButton.click();
        }
    });
});

