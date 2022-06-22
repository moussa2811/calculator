let resultScreen = document.querySelector('#results');
let opScreen = document.querySelector('#op');

let clearBtn = document.querySelector('#clear');
let delBtn = document.querySelector('#del');
let floatBtn = document.querySelector('#float');
let negativeBtn = document.querySelector('#neg');
let equalBtn = document.querySelector('#equal');

const operators = document.querySelectorAll('.op');

const digits = document.querySelectorAll('div[data-value]');


let firstNumber = 0;
let secondNumber = 0;
let result = 0;
let inputNumber = '';
let floatNumber = false;
let negativeNumber = false;
let opSign = '';
let opPending = false;

const reset = () =>{
    firstNumber = 0;
    secondNumber = 0;
    result = 0;
    inputNumber = '';
    opSign = '';
    opPending = false;
    floatNumber = false;
    resultScreen.textContent = '';
    opScreen.textContent = '0';
}

const deleteInput = () =>{
    if (inputNumber.endsWith('.')) {
        floatNumber = false;
    }
    inputNumber = inputNumber.slice(0,inputNumber.length -1);
    opScreen.textContent = inputNumber;
};

const floatToggle = () =>{
    if (floatNumber == false) {
        addDigit('.');
        floatNumber = true;
    }
};

const negativeToggle = () =>{
    if (negativeNumber == false) {
        inputNumber = inputNumber.split();
        inputNumber.unshift('-');
        inputNumber = inputNumber.join('');
        opScreen.textContent = inputNumber;
        negativeNumber = true;
    }else {
        inputNumber = inputNumber.replace('-','');
        opScreen.textContent = inputNumber;
        negativeNumber = false;
    }
};

const operate = (operator) =>{
    let opChoice = operator;
    switch (opChoice) {
        case 'mod':
            result = firstNumber % secondNumber;
            break;
        case 'div':
            if (secondNumber == 0) {
                alert('Division by zero Impossible');
                result = 0;
            } else {
                result = firstNumber / secondNumber;
            }
            break;
        case 'multi':
            result = firstNumber * secondNumber;
            break;
        case 'subt':
            result = firstNumber - secondNumber;
            break;
        default :
            result = firstNumber + secondNumber;
            break;
    } 
    opPending = true;
    firstNumber = result;
    if (negativeNumber == true) {
        negativeNumber = false;
    }
};

const addDigit = (digit) => {
    if (inputNumber.length < 11) {
        inputNumber += digit;
    }else{
        alert('Max 12 digits');
    }
    opScreen.textContent = inputNumber;
};

const addOp = (operator) => {
    
    if (opPending == false) {

        if (floatNumber == true) {
            firstNumber = parseFloat(inputNumber);
            floatNumber = false;
        } else {
            firstNumber = parseInt(inputNumber);
        }
        opPending = true;

    } else if (opPending == true) {
        if (floatNumber == false) {
            secondNumber = parseInt(inputNumber);
        } else {
            secondNumber = parseFloat(inputNumber);
        }
        operate(opSign);
    }

    inputNumber = '';
    opSign = operator;
    let sign = (opSign == 'multi') ? '*' :
                (opSign == 'div') ? '/' :
                (opSign == 'subt') ? '-' :
                (opSign == 'mod') ? '%' : '+';
    resultScreen.textContent = `${firstNumber} ${sign}`;
    opScreen.textContent = '0'; 

    if (negativeNumber == true) {
        negativeNumber = false;
    }

};

const equalAction = () =>{
    if (opPending == true) {

        if (inputNumber == '') {
            secondNumber = 0;
        }else{
            if (floatNumber == false) {
                secondNumber = parseInt(inputNumber);
            } else {
                secondNumber = parseFloat(inputNumber);
            }
            
            if (negativeNumber == true) {
                negativeNumber = false ;
            }
        }
        let sign = (opSign == 'multi') ? '*' :
                    (opSign == 'div') ? '/' :
                    (opSign == 'subt') ? '-' :
                    (opSign == 'mod') ? '%' : '+';
        resultScreen.textContent = `${firstNumber} ${sign} ${secondNumber} =`;
        operate(opSign);

        if (result.toString().length <= 12) {
            opScreen.textContent = result;
        }else{
            resultScreen.textContent = ` = ${result}`;
            opScreen.textContent = '';
        }
        opPending = false;
        inputNumber = '';
    }
};

clearBtn.addEventListener('click',reset);
delBtn.addEventListener('click',deleteInput);
floatBtn.addEventListener('click',floatToggle);
negativeBtn.addEventListener('click',negativeToggle);
equalBtn.addEventListener('click',equalAction);


digits.forEach(
    (digit) =>{
        digit.addEventListener('click',
            (event) => {
                addDigit(event.target.getAttribute('data-value'));
            }
        )
    }
);

operators.forEach(
    (operator) =>{
        operator.addEventListener('click',
            (event) => {
                if (inputNumber != '') {
                    addOp(event.target.getAttribute('id'));
                }else {
                    if (opPending = true) {
                        opSign = event.target.getAttribute('id');
                        let sign = (opSign == 'multi') ? '*' :
                                    (opSign == 'div') ? '/' :
                                    (opSign == 'subt') ? '-' :
                                    (opSign == 'mod') ? '%' : '+';
                        resultScreen.textContent = `${firstNumber} ${sign}`;
                        opScreen.textContent = '0'; 
                    }
                }
            }
        )
    }
);

window.addEventListener('keydown',
    (event) =>{

        switch (event.key) {
            case 'Backspace':
                deleteInput();
                break;
            case '.':
                floatToggle();
                break;

            case '%':
                if (inputNumber != '') {
                    addOp('mod');
                }else {
                    if (opPending = true) {
                        opSign = 'mod';
                        resultScreen.textContent = `${firstNumber} %`;
                        opScreen.textContent = '0'; 
                    }
                }
                break;

            case '/':
                if (inputNumber != '') {
                    addOp('div');
                }else {
                    if (opPending = true) {
                        opSign = 'div';
                        resultScreen.textContent = `${firstNumber} /`;
                        opScreen.textContent = '0'; 
                    }
                }
                break;

            case '*':
                if (inputNumber != '') {
                    addOp('multi');
                }else {
                    if (opPending = true) {
                        opSign = 'multi';
                        resultScreen.textContent = `${firstNumber} *`;
                        opScreen.textContent = '0'; 
                    }
                }
                break;

            case '-':
                if (inputNumber != '') {
                    addOp('subt');
                }else {
                    if (opPending = true) {
                        opSign = 'subt';
                        resultScreen.textContent = `${firstNumber} -`;
                        opScreen.textContent = '0'; 
                    }
                }
                break;

            case '+':
                if (inputNumber != '') {
                    addOp('add');
                }else {
                    if (opPending = true) {
                        opSign = 'add';
                        resultScreen.textContent = `${firstNumber} +`;
                        opScreen.textContent = '0'; 
                    }
                }
                break;
                
            case 'Shift':
                negativeToggle();
                break;
                
            case 'Enter':
                equalAction();
                break;

            case '=':
                equalAction();
                break;

            case ' ':
                reset();
                break;
        } 
    }
);

window.addEventListener('keydown',
    (event) =>{
        switch (event.key) {   

            case '9':
                addDigit('9');
                break;
            
            case '8':
                addDigit('8');
                break;
            
            case '7':
                addDigit('7');
                break;
            
            case '6':
                addDigit('6');
                break;
            
            case '5':
                addDigit('5');
                break;
            
            case '4':
                addDigit('4');
                break;
            
            case '3':
                addDigit('3');
                break;
            
            case '2':
                addDigit('2');
                break;
            
            case '1':
                addDigit('1');
                break;
            
            case '0':
                addDigit('0');
                break;
        }
    }
);

 