import IMovingStrategy from "/game/strategy/IMovingStrategy.js";
import Config from "/game/config/Config.js";

/**
 * @class
 * @implements IMovingStrategy
 */
export default class GravityMovingStrategy extends IMovingStrategy() {

    /**
     * @override
     * @param {AMissile} missile
     */
    updatePosition( missile ) {
        missile.move( missile.force.x, missile.force.y );
        missile.force.y = missile.force.y + Config.GRAVITY;
    }
}