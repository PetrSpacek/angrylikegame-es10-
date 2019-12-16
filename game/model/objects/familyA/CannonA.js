import ACannon from "/game/model/objects/ACannon.js";
import SingleShootingMode from "/game/state/SingleShootingMode.js";
import DoubleShootingMode from "/game/state/DoubleShootingMode.js";
import Config from "/game/config/Config.js";
import Position from "/game/model/Position.js";

/**
 * @const
 * @type {SingleShootingMode}
 */
const SINGLE_MODE = new SingleShootingMode();
/**
 * @const
 * @type {DoubleShootingMode}
 */
const DOUBLE_MODE = new DoubleShootingMode();

/**
 * @class
 * @extends ACannon
 */
export default class CannonA extends ACannon {

    /**
     * @private
     * @type {AMissile}
     */
    #shootBatch = [];
    /**
     * @private
     * @type {IObjectsFactory}
     */
    #objectsFactory;

    /**
     * @private
     * @type {IShootingMode}
     */
    #mode;

    /**
     * @constructor
     * @param {IObjectsFactory} factory
     */
    constructor( factory ) {
        super();
        this.#objectsFactory = factory;
        this.setSingleShootingMode();
    }

    /**
     * @override
     */
    moveUp() {
        this.move( 0, -Config.MOVE_STEP );
    }

    /**
     * @override
     */
    moveDown() {
        this.move( 0, Config.MOVE_STEP );
    }

    /**
     * @override
     * @returns {AMissile[]}
     */
    shoot() {
        this.#shootBatch = [];
        this.#mode.shoot( this );
        return this.#shootBatch;
    }

    /**
     * @override
     */
    toggleShootingMode() {
        this.#mode.toggle( this );
    }

    /**
     * @override
     */
    setSingleShootingMode() {
        this.#mode = SINGLE_MODE;
    }

    /**
     * @override
     */
    setDoubleShootingMode() {
        this.#mode = DOUBLE_MODE;
    }

    /**
     * @override
     * @returns {AMissile}
     */
    primitiveShoot() {
        let r = this.angle;
        let rr = r * Math.PI / 180;
        let f = this.force;
        let ff = new Position( Math.cos( rr ) * f, Math.sin( rr ) * f );
        let m = this.#objectsFactory.createMissile( ff );
        m.x = this.x;
        m.y = this.y;
        this.#shootBatch.push( m );
        return m;
    }

    /**
     * @param {CannonA} [obj=null]
     * @returns {CannonA}
     */
    copy( obj = null ) {
        if ( !obj ) obj = new this.__proto__.constructor();
        obj.#objectsFactory = this.#objectsFactory;
        obj.#mode = this.#mode;
        return super.copy( obj );
    }
}