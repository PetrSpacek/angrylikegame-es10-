import UndefinedError from "/game/UndefinedError.js";

/**
 * @interface
 * @param superclass
 * @returns {IObjectsFactory}
 */
const IObjectsFactory = ( superclass = Object ) => class IObjectsFactory extends superclass {

    /**
     * @abstract
     * @returns {ACannon}
     */
    createCannon() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @returns {AEnemy}
     */
    createEnemy() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @returns {ACollision}
     */
    createCollision() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @returns {AMissile}
     */
    createMissile() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @returns {AModelInfo}
     */
    createModelInfo() {
        throw new UndefinedError();
    }
};

export default IObjectsFactory;