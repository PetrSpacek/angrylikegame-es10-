import UndefinedError from "/game/UndefinedError.js";

/**
 * @interface
 * @param superclass
 * @returns {IShootingMode}
 */
const IShootingMode = ( superclass = Object ) => class IShootingMode extends superclass {

    /**
     * @param {ACannon} cannon
     */
    shoot( cannon ) {
        throw new UndefinedError();
    }

    /**
     * @param {ACannon} cannon
     */
    toggle( cannon ) {
        throw new UndefinedError();
    }
};

export default IShootingMode;