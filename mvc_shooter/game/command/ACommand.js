import UndefinedError from "/game/UndefinedError.js";

/**
 * @abstract
 * @class
 */
export default class ACommand {

    /**
     * @protected
     * @type {Object}
     */
    _memento;
    /**
     * @protected
     * @type {IModel}
     */
    _reciever;

    /**
     * @constructor
     * @param {IReciever} reciever
     */
    constructor( reciever ) {
        this._reciever = reciever;
    }

    /**
     * @returns {void}
     */
    execute() {
        this._memento = this._reciever.memento;
        this._executeImpl();
    }

    /**
     * @abstract
     * @protected
     */
    _executeImpl() {
        throw new UndefinedError();
    }

    /**
     * @returns {void}
     */
    unexecute() {
        this._reciever.memento = this._memento;
    }
}