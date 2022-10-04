/**
 * Objekat kao listener, mora da 
 * poseduje metod handleEvent()
 */
class KeyListener {
    constructor() {
        this.oldEvent = null; // ovo je samo da ima nesto
    }
2
    handleEvent(event) {
        switch (event.type) {
            case 'keypress':
                console.log(`event: 'keypress' Key: ${event.key} code:${event.keyCode}`);
                break;
            case 'keydown':
                console.log(`event: 'keydown' Key: ${event.key} code:${event.keyCode}`);
                break;
            case 'keyup':
                console.log(`event: 'keyup' Key: ${event.key} code:${event.keyCode}`);
                break;
        }
        this.oldEvent = event;
    }
}

class MouseListener {
    constructor() {
        //> todo
    }

    handleEvent(event) {
        switch (event.type) {
            case 'mouseover':
                break;

            case 'mouseout':
                break;

            case 'click':
                break;

            case 'mousedown':
                break;

            case 'mouseup':
                break;
        }
    }
}

let keyListener = new KeyListener();

document.addEventListener('keypress', keyListener, false);
document.addEventListener('keydown', keyListener, false);
document.addEventListener('keyup', keyListener, false);

//export { keyListener }