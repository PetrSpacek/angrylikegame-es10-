import UndefinedError from "/game/UndefinedError.js";

/**
 * @interface
 * @param superclass
 * @returns IObservable
 */
const IObservable = ( superclass = Object ) => class IObservable extends superclass {

    /**
     * @abstract
     * @param {IObserver} observer
     */
    registerObserver( observer ) {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @param {IObserver} observer
     */
    unregisterObserver( observer ) {
        throw new UndefinedError();
    }

    /**
     * @abstract
     */
    notifyMyObservers() {
        throw new UndefinedError();
    }
};

export default IObservable;