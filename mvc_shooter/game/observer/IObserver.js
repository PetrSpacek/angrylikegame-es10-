import UndefinedError from "/game/UndefinedError.js";

/**
 * @interface
 * @param superclass
 * @returns IObserver
 */
const IObserver = ( superclass = Object ) => class IObserver extends superclass {

    /**
     * @abstract
     */
    update() {
        throw new UndefinedError();
    }
};

export default IObserver;