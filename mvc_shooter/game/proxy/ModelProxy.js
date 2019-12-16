import IModel from "/game/proxy/IModel.js";

/**
 * @class
 * @implements IModel
 */
export default class ModelProxy extends IModel() {

    /**
     * @private
     * @type {IModel}
     */
    #subject;

    constructor( subject ) {
        super();
        this.#subject = subject;
    }

    /**
     * @override
     */
    moveCannonUp() {
        this.#subject.moveCannonUp();
    }

    /**
     * @override
     */
    moveCannonDown() {
        this.#subject.moveCannonDown();
    }

    /**
     * @override
     */
    cannonShoot() {
        this.#subject.cannonShoot();
    }

    /**
     * @override
     */
    cannonToggleShootingMode() {
        this.#subject.cannonToggleShootingMode();
    }

    /**
     * @override
     * @param {Object} o
     */
    set memento( o ) {
        this.#subject.memento = o;
    }

    /**
     * @override
     * @returns {Object}
     */
    get memento() {
        return this.#subject.memento;
    }

    /**
     * @override
     * @param {ACommand} command
     */
    registerCommand( command ) {
        this.#subject.registerCommand( command );
    }

    /**
     * @override
     */
    undoLastCommand() {
        this.#subject.undoLastCommand();
    }

    /**
     * @override
     */
    setSimpleMovingStrategy() {
        this.#subject.setSimpleMovingStrategy();
    }

    /**
     * @override
     */
    setGravityMovingStrategy() {
        this.#subject.setGravityMovingStrategy();
    }

    /**
     * @override
     */
    increaseForce() {
        this.#subject.increaseForce();
    }

    /**
     * @override
     */
    decreaseForce() {
        this.#subject.decreaseForce();
    }

    /**
     * @override
     */
    increaseAngle() {
        this.#subject.increaseAngle();
    }

    /**
     * @override
     */
    decreaseAngle() {
        this.#subject.decreaseAngle();
    }
}