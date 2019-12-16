import GameObject from "/game/model/GameObject.js";

/**
 * @abstract
 * @class
 * @extends GameObject
 */
export default class TimelifeAwareObject extends GameObject {

    /**
     * @type {number}
     */
    #created = Date.now();

    /**
     * @returns {number}
     */
    get age() {
        return Date.now() - this.#created;
    }

    /**
     * @param {TimelifeAwareObject} [obj=null]
     * @returns {TimelifeAwareObject}
     */
    copy( obj = null ) {
        if ( !obj ) obj = new this.__proto__.constructor();
        obj.#created = this.#created;
        return super.copy( obj );
    }
}