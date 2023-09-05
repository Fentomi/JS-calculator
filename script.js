class UsefulFunctions {
    static isCharNextTo(string) { 
        if(string[string.length-1] === '+' || string[string.length-1] === '-' || string[string.length-1] === '/' || string[string.length-1] === '*' || string[string.length-1] === '%') return true;
        return false; 
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
        this.btn_equal.onclick = () => this.addCharInEnterScreen('=');

        this.enterString.onchange = () => { console.log('меня поменяли!'); }
    }

    addNumberInEnterScreen(number) {
        let string = this.enterString.textContent;
        if(string.length === 1 && string === '0'){
            this.enterString.textContent = '';
        }
        this.enterString.textContent += number;
    }

    addCharInEnterScreen(char) {
        let string = this.enterString.textContent;
        if(!UsefulFunctions.isCharNextTo(string) && char !== '-') this.enterString.textContent += char;
        else if (string !== '0') this.enterString.textContent += '-';
        else this.enterString.textContent = '-';
    }

    clearEnterScreen() { this.enterString.textContent = '0'; }

    delLastNumberInEnterScreen() { 
        if(this.enterString.textContent !== '0'){
            this.enterString.textContent = this.enterString.textContent.substring(0, this.enterString.textContent.length - 1);
        }
        if(this.enterString.textContent === '') {
            this.enterString.textContent = '0'; 
        }
    }


}

const calculator = new Calculator();