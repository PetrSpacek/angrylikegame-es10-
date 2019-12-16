import CannonShootCommand from "/game/command/CannonShootCommand.js";
import ProgrammableCommand from "/game/command/ProgrammableCommand.js";

export default class Controller {

    /**
     * @private
     * @type {IModel}
     */
    #model;
    /**
     * @private
     * @type {Object}
     */
    #keyState = {};

    /**
     * @constructor
     * @param {IGameModel} model
     */
    constructor( model ) {
        this.#model = model;
    }

    /**
     * @param {string} keyCode
     */
    handleKeyCode( keyCode ) {
        //console.log( keyCode );
        let cmd = null;
        switch ( keyCode ) {
            case "ResetState":
                this.#keyState = {};
                break;
            case "ControlLeft":
            case "ControlRight":
                this.#keyState.control = true;
                break;
            case "ShiftLeft":
            case "ShiftRight":
                this.#keyState.shift = true;
                break;
            case "ArrowUp":
                //this.#model.moveCannonUp();
                cmd = new ProgrammableCommand( this.#model, this.#model.moveCannonUp, this.#model );
                break;
            case "ArrowDown":
                //this.#model.moveCannonDown();
                cmd = new ProgrammableCommand( this.#model, this.#model.moveCannonDown, this.#model );
                break;
            case "ArrowLeft":
                //this.#model.decreaseAngle();
                cmd = new ProgrammableCommand( this.#model, this.#model.decreaseAngle, this.#model );
                break;
            case "ArrowRight":
                //this.#model.increaseAngle();
                cmd = new ProgrammableCommand( this.#model, this.#model.increaseAngle, this.#model );
                break;
            case "NumpadSubtract":
            case "Minus":
                //this.#model.decreaseForce();
                cmd = new ProgrammableCommand( this.#model, this.#model.decreaseForce, this.#model );
                break;
            case "Equal":
            case "Digit1":
                if ( !this.#keyState.shift ) break;
            case "NumpadAdd":
                //this.#model.increaseForce();
                cmd = new ProgrammableCommand( this.#model, this.#model.increaseForce, this.#model );
                break;
            case "Space":
                //this.#model.cannonShoot();
                cmd = new CannonShootCommand( this.#model );
                break;
            case "KeyM":
                this.#model.cannonToggleShootingMode();
                break;
            case "KeyG":
                if ( this.#keyState.shift ) this.#model.setSimpleMovingStrategy();
                else this.#model.setGravityMovingStrategy();
                break;
            case "KeyZ":
                this.#model.undoLastCommand();
                break;
            default:
            //nothing
        }
        if ( cmd ) this.#model.registerCommand( cmd );
    }
}