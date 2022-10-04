
class CalcEngine {
    constructor() {

        //>================== Start - Privatni clanovi===============
        let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let operators = ['*', '/', '-', '+'];

        let formatedString = "";
        function cmdProcessor(cmdDigit) {

            // brise sve karaktere
            if (cmdDigit === 'AC') {
                formatedString = "";
                return false;
            }

            // brise poslednji karakter
            if (cmdDigit === 'BS') {
                formatedString = delLast(formatedString);
                return false;
            }

            // cmdDigit je cifra  0-9
            if (digits.includes(cmdDigit)) {
                // ignorisu nulu na pocetku stringa i posle operatora
                if (cmdDigit === '0') {
                    if (formatedString === "") return false;

                    if (lastIsOperator(formatedString))
                        return false;
                }
                formatedString += cmdDigit;
                return false;
            }

            // cmdDigit je operator i nije prvi karakter u stringu
            if (operators.includes(cmdDigit) && formatedString !== "") {
                // ako je prethodni karakter operator brisi ga
                if (lastIsOperator(formatedString)) {
                    formatedString = delLast(formatedString);
                }
                formatedString += cmdDigit;
                return false;
            }

            // ako '=' nije prvi karakter i ne dolazi 
            // posle operatora zavrsi obradu
            if (cmdDigit === '=') {
                if (formatedString === "")
                    return false;

                if (lastIsOperator(formatedString))
                    return false;

                return true;
            }

            // ignorisi ako cmdDigit nije u domenu
            return false;
        }

        // proverava da li je posledji 
        // karakter u stringu operator  
        function lastIsOperator(str) {
            let length = formatedString.length;
            let ch = formatedString[length - 1];
            if (operators.includes(ch))
                return true;
            return false
        }

        // brisi poslednji karakter u stringu
        function delLast(str) {
            str = str.slice(0, str.length - 1);
            return str
        }
        //>===================== End - privatni clanoviv==========

        this.addDigit = function (digit) {
            let displayText = '0';
            if (!cmdProcessor(digit)) {
                if (formatedString !== "")
                    displayText = formatedString;
            }
            else {
                displayText = "Rerzultat";
                formatedString = ""
            }
            return displayText;
        }
    }

    hello() {
        console.log("CalcEngine :)");
    }
}

export { CalcEngine }

console.log("CalcEngine module loaded...");