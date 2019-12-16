import GameObject from "/game/model/GameObject.js";
import UndefinedError from "/game/UndefinedError.js";
import Position from "/game/model/Position.js";

/**
 * @abstract
 * @class
 * @extends GameObject
 */
export default class AMissile extends GameObject {

    /**
     * @private
     * @type {Position}
     */
    #force;

    /**
     * @constructor
     * @param {Position} force
     */
    constructor( force = new Position() ) {
        super();
        this.#force = force;
    }

    /**
     * @param {IVisitor} visitor
     */
    accept( visitor ) {
        visitor.visitMissile( this );
    }

    /**
     * @abstract
     */
    nextMove() {
        throw new UndefinedError();
    }

    /**
     * @returns {Position}
     */
    get force() {
        return this.#force;
    }

    /**
     * @param {AMissile} [obj=null]
     * @returns {AMissile}
     */
    copy( obj = null ) {
        if ( !obj ) obj = new this.__proto__.constructor();
        obj.force.x = this.force.x;
        obj.force.y = this.force.y;
        return super.copy( obj );
    }
}