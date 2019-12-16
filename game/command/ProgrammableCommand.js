import ACommand from "/game/command/ACommand.js";

/**
 * @class
 * @extends ACommnand
 */
export default class ProgrammableCommand extends ACommand {

    #callback;
    #target;

    constructor( reciever, callback, target = null ) {
        super( reciever );
        this.#callback = callback;
        this.#target = target;
    }

    _executeImpl() {
        this.#callback.call( this.#target );
    }
}