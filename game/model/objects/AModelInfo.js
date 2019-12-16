import GameObject from "/game/model/GameObject.js";
import UndefinedError from "/game/UndefinedError.js";

/**
 * @abstract
 * @class
 * @extends GameObject
 */
export default class AModelInfo extends GameObject {

    _cannon;
    _score = 0;

    constructor(cannon) {
        super();
        this._cannon = cannon;
    }

    /**
     * @param {IVisitor} visitor
     */
    accept( visitor ) {
        visitor.visitModelInfo( this );
    }

    /**
     * @abstract
     * @returns {string}
     */
    get text() {
        throw new UndefinedError();
    }

    get score() {
        return this._score;
    }

    set score( score ) {
        this._score = score;
    }

    /**
     * @param {AModelInfo} [obj=null]
     * @returns {AModelInfo}
     */
    copy( obj = null ) {
        if ( !obj ) obj = new this.__proto__.constructor();
        obj._score = this._score;
        return super.copy( obj );
    }
}