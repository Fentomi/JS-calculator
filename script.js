class UsefulFunctions {
    static isCharNextTo(string) { 
        if(string[string.length-1] === '+' || string[string.length-1] === '-' || string[string.length-1] === '/' || string[string.length-1] === '*' || string[string.length-1] === '%') return true;
        return false; 
    }
    static knifeString(string) {
        let number = '';
        let numbers = new Array();
        let chars = new Array();
    
        for(let i = 0; i < string.length; i++) {
            if(string[i] === '*' || string[i] === '/' || string[i] === '+' || string[i] === '-' || string[i] === '%' && i !== 0) {
                numbers.push(number);
                chars.push(string[i])
                number = '';
            } else number += string[i];
        }
        numbers.push(number);
    
        return { numbers, chars};
    }
}

//basic class
class Calculator {
    constructor() 
    {
        //get elements
        this.enterString = document.getElementById('enter-string');
        this.resultString = document.getElementById('result-string');

        this.btn_1 = document.getElementById('1');
        this.btn_2 = document.getElementById('2');
        this.btn_3 = document.getElementById('3');
        this.btn_4 = document.getElementById('4');
        this.btn_5 = document.getElementById('5');
        this.btn_6 = document.getElementById('6');
        this.btn_7 = document.getElementById('7');
        this.btn_8 = document.getElementById('8');
        this.btn_9 = document.getElementById('9');
        this.btn_0 = document.getElementById('0');
        
        this.btn_backspace = document.getElementById('backspace');
        this.btn_c = document.getElementById('c');
        this.btn_procent = document.getElementById('%');
        this.btn_divide = document.getElementById('divide');
        this.btn_multiply = document.getElementById('multiply');
        this.btn_minus = document.getElementById('minus');
        this.btn_plus = document.getElementById('plus');
        this.btn_equal = document.getElementById('equal');
        this.btn_point = document.getElementById('.');
        this.btn_doubleZero = document.getElementById('00');

        //events
        this.btn_c.onclick = () => this.clearEnterScreen();
        this.btn_backspace.onclick = () => this.delLastNumberInEnterScreen();

        this.btn_1.onclick = () => this.addNumberInEnterScreen(this.btn_1.textContent);
        this.btn_2.onclick = () => this.addNumberInEnterScreen(this.btn_2.textContent);
        this.btn_3.onclick = () => this.addNumberInEnterScreen(this.btn_3.textContent);
        this.btn_4.onclick = () => this.addNumberInEnterScreen(this.btn_4.textContent);
        this.btn_5.onclick = () => this.addNumberInEnterScreen(this.btn_5.textContent);
        this.btn_6.onclick = () => this.addNumberInEnterScreen(this.btn_6.textContent);
        this.btn_7.onclick = () => this.addNumberInEnterScreen(this.btn_7.textContent);
        this.btn_8.onclick = () => this.addNumberInEnterScreen(this.btn_8.textContent);
        this.btn_9.onclick = () => this.addNumberInEnterScreen(this.btn_9.textContent);
        this.btn_0.onclick = () => this.addNumberInEnterScreen(this.btn_0.textContent);

        this.btn_procent.onclick = () => this.addCharInEnterScreen('%');
        this.btn_divide.onclick = () => this.addCharInEnterScreen('/');
        this.btn_multiply.onclick = () => this.addCharInEnterScreen('*');
        this.btn_minus.onclick = () => this.addCharInEnterScreen('-');
        this.btn_plus.onclick = () => this.addCharInEnterScreen('+');
        this.btn_equal.onclick = () => this.switchResultAndEnterStrings();
        this.btn_point.onclick = () => this.addCharInEnterScreen('.');
    }
    //add number in end enter-string
    addNumberInEnterScreen(number) {
        let string = this.enterString.textContent;

        if(this.checkLengthEnterString(string)) {
            if(string.length === 1 && string === '0'){
                this.enterString.textContent = '';
            }
            this.enterString.textContent += number;
        }
        try{
            this.calculateResult(this.enterString.textContent);
        } catch{}
    }
    //add char in end enter-string
    addCharInEnterScreen(char) {
        let string = this.enterString.textContent;

        if(this.checkLengthEnterString(string)) {
            if(char === '.') {
                let pointCount = 0;
                let charCount = 0;
                for(let i = 0; i < string.length; i++){
                    string[i] === '.' ? pointCount++ : pointCount;
                    string[i] === '+' || string[i] === '-' || string[i] === '/' || string[i] === '*' || string[i] === '%' ? charCount++ : charCount;
                }
                if(pointCount === charCount) this.enterString.textContent += '.';
            }
            else if(char === '-') {
                if(string === '0') this.enterString.textContent = char;
                else if(!UsefulFunctions.isCharNextTo(string)) this.enterString.textContent += char;
            }
            else {
                if(!UsefulFunctions.isCharNextTo(string)) this.enterString.textContent += char;
            }
        }
    }
    //clear enter-string
    clearEnterScreen() { this.enterString.textContent = '0'; this.resultString.textContent = ''; }
    //delete last symbol in enter-string
    delLastNumberInEnterScreen() { 
        if(this.enterString.textContent !== '0'){
            this.enterString.textContent = this.enterString.textContent.substring(0, this.enterString.textContent.length - 1);
        }
        if(this.enterString.textContent === '') {
            this.enterString.textContent = '0'; 
        }
        try{
            this.calculateResult(this.enterString.textContent);
        }
        catch{}
    }
    //function-help with calculateResult
    calcPara(char, temp = 0, numbers = [], result) {
        if (result === 0) {
            switch(char) {
                case '+': result = Number(numbers[temp]) + Number(numbers[temp+1]); temp += 2; break;
                case '-': result = Number(numbers[temp]) - Number(numbers[temp+1]); temp += 2; break;
                case '*': result = Number(numbers[temp]) * Number(numbers[temp+1]); temp += 2; break;
                case '/': result = Number(numbers[temp]) / Number(numbers[temp+1]); temp += 2; break;
            }
        }
        else {
            switch(char) {
                case '+': result += Number(numbers[temp]); temp += 1; break;
                case '-': result -= Number(numbers[temp]); temp += 1; break;
                case '*': result *= Number(numbers[temp]); temp += 1; break;
                case '/': result /= Number(numbers[temp]); temp += 1; break;
            }
        }
        return { result, temp }
    }
    //calculate enter-string and set a result-string
    calculateResult(string) {
        const knife_string = UsefulFunctions.knifeString(string);
        const chars = knife_string.chars;
        const numbers = knife_string.numbers;
        console.log(Number(numbers[0]) + Number(numbers[1]))
    
        let result = 0;
        let temp = 0;
    
        chars.forEach(element => {
            let resCalcPara = this.calcPara(element, temp, numbers, result);
            result = resCalcPara.result;
            temp = resCalcPara.temp;
        })
        
        this.resultString.textContent = result;
    }
    checkLengthEnterString = (string) => { return string.length <= 14 ? true : false; }
    switchResultAndEnterStrings() {
        this.enterString.textContent = this.resultString.textContent;
    }
}

const calculator = new Calculator();

//interactive with user keyboard
document.addEventListener('keydown', function(event) {
    let isMultiplyAndPlusEnter = false;

    if(event.shiftKey && event.code === 'Equal') {
        calculator.addCharInEnterScreen('+');
        isMultiplyAndPlusEnter = true; 
    } else if(event.shiftKey && event.code === 'Digit8') {
        calculator.addCharInEnterScreen('*');
        isMultiplyAndPlusEnter = true; 
    }

    if(!isMultiplyAndPlusEnter) {
        switch(event.code) {
            case 'Digit0': calculator.addNumberInEnterScreen('0'); break;
            case 'Numpad0': calculator.addNumberInEnterScreen('0'); break;
            case 'Digit1': calculator.addNumberInEnterScreen('1'); break;
            case 'Numpad1': calculator.addNumberInEnterScreen('1'); break;
            case 'Digit2': calculator.addNumberInEnterScreen('2'); break;
            case 'Numpad2': calculator.addNumberInEnterScreen('2'); break;
            case 'Digit3': calculator.addNumberInEnterScreen('3'); break;
            case 'Numpad3': calculator.addNumberInEnterScreen('3'); break;
            case 'Digit4': calculator.addNumberInEnterScreen('4'); break;
            case 'Numpad4': calculator.addNumberInEnterScreen('4'); break;
            case 'Digit5': calculator.addNumberInEnterScreen('5'); break;
            case 'Numpad5': calculator.addNumberInEnterScreen('5'); break;
            case 'Digit6': calculator.addNumberInEnterScreen('6'); break;
            case 'Numpad6': calculator.addNumberInEnterScreen('6'); break;
            case 'Digit7': calculator.addNumberInEnterScreen('7'); break;
            case 'Numpad7': calculator.addNumberInEnterScreen('7'); break;
            case 'Digit8': calculator.addNumberInEnterScreen('8'); break;
            case 'Numpad8': calculator.addNumberInEnterScreen('8'); break;
            case 'Digit9': calculator.addNumberInEnterScreen('9'); break;
            case 'Numpad9': calculator.addNumberInEnterScreen('9'); break;
    
            case 'Backspace': calculator.delLastNumberInEnterScreen(); break;
            case 'KeyC': calculator.clearEnterScreen(); break;
            
            case 'Minus': calculator.addCharInEnterScreen('-'); break;
            case 'Slash': calculator.addCharInEnterScreen('/'); break;
    
            case 'Enter': calculator.switchResultAndEnterStrings(); break;
        }
    }
});