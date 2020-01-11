"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calculator = function () {
    function Calculator(previousOperandTextElement, currentOperandTextElement) {
        _classCallCheck(this, Calculator);

        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    _createClass(Calculator, [{
        key: "clear",
        value: function clear() {
            this.currentOperand = "";
            this.previousOperand = "";
            this.operation = undefined;
        }
    }, {
        key: "clearLast",
        value: function clearLast() {
            this.currentOperand = "";
        }
    }, {
        key: "delete",
        value: function _delete() {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
    }, {
        key: "negative",
        value: function negative() {
            this.currentOperand = this.currentOperand * -1;
        }
    }, {
        key: "divideByOne",
        value: function divideByOne() {
            this.currentOperand = 1 / this.currentOperand;
        }
    }, {
        key: "squareRoot",
        value: function squareRoot() {
            this.currentOperand = Math.sqrt(this.currentOperand);
        }
    }, {
        key: "power",
        value: function power() {
            this.currentOperand = this.currentOperand * this.currentOperand;
        }
    }, {
        key: "percentage",
        value: function percentage() {
            this.currentOperand = this.previousOperand / 100 * this.currentOperand;
        }
    }, {
        key: "appendNumber",
        value: function appendNumber(number) {
            if (number === "." && this.currentOperand.includes(".")) return;
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }, {
        key: "chooseOperation",
        value: function chooseOperation(operation) {
            if (this.currentOperand === "") return;
            if (this.previousOperand !== "") {
                this.compute();
            }
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = "";
        }
    }, {
        key: "compute",
        value: function compute() {
            var computation = void 0;
            var prev = parseFloat(this.previousOperand);
            var current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) return;
            switch (this.operation) {
                case "+":
                    computation = prev + current;
                    break;
                case "-":
                    computation = prev - current;
                    break;
                case "*":
                    computation = prev * current;
                    break;
                case "÷":
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = "";
        }
    }, {
        key: "getDisplayNumber",
        value: function getDisplayNumber(number) {
            var stringNumber = number.toString();
            var integerDigits = parseFloat(stringNumber.split(".")[0]);
            var decimalDigits = stringNumber.split(".")[1];
            var integerDisplay = void 0;
            if (isNaN(integerDigits)) {
                integerDisplay = "";
            } else {
                integerDisplay = integerDigits.toLocaleString("en", {
                    maximumFractionDigits: 0
                });
            }
            if (decimalDigits != null) {
                return integerDisplay + "." + decimalDigits;
            } else {
                return integerDisplay;
            }
        }
    }, {
        key: "updateDisplay",
        value: function updateDisplay() {
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
            if (this.operation != null) {
                this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand) + " " + this.operation;
            } else {
                this.previousOperandTextElement.innerText = "";
            }
        }
    }]);

    return Calculator;
}();

var numberButtons = document.querySelectorAll("[data-number]");
var operationButtons = document.querySelectorAll("[data-operation]");
var equalsButton = document.querySelector("[data-equals]");
var deleteButton = document.querySelector("[data-delete]");
var allClearButton = document.querySelector("[data-all-clear]");
var clearButton = document.querySelector("[data-clear]");
var negativeButton = document.querySelector("[data-negative]");
var divideButton = document.querySelector("[data-divide]");
var squareButton = document.querySelector("[data-square]");
var powerButton = document.querySelector("[data-power]");
var percentageButton = document.querySelector("[data-percentage]");

var previousOperandTextElement = document.querySelector("[data-previous-operand]");
var currentOperandTextElement = document.querySelector("[data-current-operand]");

var calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", function (button) {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", function (button) {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", function (button) {
    calculator.delete();
    calculator.updateDisplay();
});
clearButton.addEventListener("click", function (button) {
    calculator.clearLast();
    calculator.updateDisplay();
});
negativeButton.addEventListener("click", function (button) {
    calculator.negative();
    calculator.updateDisplay();
});
divideButton.addEventListener("click", function (button) {
    calculator.divideByOne();
    calculator.updateDisplay();
});
squareButton.addEventListener("click", function (button) {
    calculator.squareRoot();
    calculator.updateDisplay();
});
powerButton.addEventListener("click", function (button) {
    calculator.power();
    calculator.updateDisplay();
});
percentageButton.addEventListener("click", function (button) {
    calculator.percentage();
    calculator.updateDisplay();
});
