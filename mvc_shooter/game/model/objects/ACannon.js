import GameObject from "/game/model/GameObject.js";
import UndefinedError from "/game/UndefinedError.js";
import Config from "/game/config/Config.js";

/**
 * @abstract
 * @class
 * @extends GameObject
 */
export default class ACannon extends GameObject {

    /**
     * @private
     * @type {number}
     */
    #angle = 0;
    /**
     * @private
     * @type {number}
     */
    #force = Config.MOVE_STEP;

    /**
     * @override
     * @param {IVisitor} visitor
     */
    accept( visitor ) {
        visitor.visitCannon( this );
    }

    /**
     * @abstract
     */
    moveUp() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    moveDown() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @returns {AMissile[]}
     */
    shoot() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    toggleShootingMode() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    setSingleShootingMode() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    setDoubleShootingMode() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @returns {AMissile}
     */
    primitiveShoot() {
        throw new UndefinedError();
    }

    get force() {
        return this.#force;
    }

    set force( force ) {
        this.#force = force;
    }

    get angle() {
        return this.#angle;
    }

    set angle( angle ) {
        this.#angle = angle;
    }

    /**
     * @param {ACannon} [obj=null]
     * @returns {ACannon}
     */
    copy( obj = null ) {
        if ( !obj ) obj = new this.__proto__.constructor();
        obj.angle = this.angle;
        obj.force = this.force;
        return super.copy( obj );
    }
}