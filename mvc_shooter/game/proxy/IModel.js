import UndefinedError from "/game/UndefinedError.js";

/**
 * @interface
 * @param superclass
 * @returns {IGameModel}
 */
const IModel = ( superclass = Object ) => class IModel extends superclass {
    /**
     * @abstract
     */
    moveCannonUp() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    moveCannonDown() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    cannonShoot() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    cannonToggleShootingMode() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @returns {Object}
     */
    get memento() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @param {Object} o
     */
    set memento( o ) {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @param {ACommand} command
     */
    registerCommand( command ) {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    undoLastCommand() {
        throw new UndefinedError();
    }


    /**
     * @abstract
     */
    setSimpleMovingStrategy() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    setGravityMovingStrategy() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    increaseForce() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    decreaseForce() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    increaseAngle() {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    decreaseAngle() {
        throw new UndefinedError();
    }
};

export default IModel;