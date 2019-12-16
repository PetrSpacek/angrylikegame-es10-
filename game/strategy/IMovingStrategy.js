import UndefinedError from "/game/UndefinedError.js";

/**
 * @interface
 * @param superclass
 * @returns {IMovingStrategy}
 */
const IMovingStrategy = ( superclass = Object ) => class IMovingStrategy extends superclass {

    /**
     * @abstract
     * @param {AMissile} missile
     */
    updatePosition( missile ) {
        throw new UndefinedError();
    }
};

export default IMovingStrategy;