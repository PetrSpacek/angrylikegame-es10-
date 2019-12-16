import Position from "/game/model/Position.js";
import UndefinedError from "/game/UndefinedError.js";

/**
 * @abstract
 * @class
 */
export default class GameObject {

    /**
     * @private
     * @type {Position}
     */
    #position = new Position();

    /**
     * @returns {Position}
     */
    get position() {
        return this.#position;
    }

    /**
     * @returns {number}
     */
    get x() {
        return this.#position.x;
    }

    /**
     * @returns {number}
     */
    get y() {
        return this.#position.y;
    }

    /**
     * @param {number} x
     */
    set x( x ) {
        this.#position.x = x;
    }

    /**
     * @param {number} y
     */
    set y( y ) {
        this.#position.y = y;
    }

    /**
     * @param {number} dx
     * @param {number} dy
     */
    move( dx, dy ) {
        this.#position.move( dx, dy );
    }

    /**
     * @abstract
     * @param {IVisitor} visitor
     */
    accept( visitor ) {
        throw new UndefinedError();
    }

    /**
     * @param {GameObject} [obj=null]
     * @returns {GameObject}
     */
    copy( obj = null ) {
        if ( !obj ) obj = new this.__proto__.constructor();
        obj.x = this.x;
        obj.y = this.y;
        return obj;
    }
}