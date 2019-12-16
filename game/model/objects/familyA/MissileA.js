import AMissile from "/game/model/objects/AMissile.js";

/**
 * @abstract
 * @class
 * @extends AMissile
 */
export default class MissileA extends AMissile {

    /**
     * @private
     * @type {IMovingStrategy}
     */
    #moving;

    /**
     * @constructor
     * @param {IMovingStrategy} moving
     * @param {Position} force
     */
    constructor( moving, force ) {
        super( force );
        this.#moving = moving;
    }

    /**
     * @override
     */
    nextMove() {
        this.#moving.updatePosition( this );
    }

    /**
     * @param {MissileA} [obj=null]
     * @returns {MissileA}
     */
    copy( obj = null ) {
        if ( !obj ) obj = new this.__proto__.constructor();
        obj.#moving = this.#moving;
        return super.copy( obj );
    }
}