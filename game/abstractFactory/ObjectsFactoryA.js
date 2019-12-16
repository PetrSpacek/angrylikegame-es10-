import IObjectsFactory from "/game/abstractFactory/IObjectsFactory.js";
import CannonA from "/game/model/objects/familyA/CannonA.js";
import EnemyA from "/game/model/objects/familyA/EnemyA.js";
import CollisionA from "/game/model/objects/familyA/CollisionA.js";
import MissileA from "/game/model/objects/familyA/MissileA.js";
import ModelInfoA from "/game/model/objects/familyA/ModelInfoA.js";

/**
 * @class
 * @implements IObjectsFactory
 */
export default class ObjectsFactoryA extends IObjectsFactory() {

    /**
     * @private
     * @type {IModel}
     */
    #model;

    /**
     * @constructor
     * @param {IModel} model
     */
    constructor( model ) {
        super();
        this.#model = model;
    }

    /**
     * @override
     * @returns {ACannon}
     */
    createCannon() {
        return new CannonA( this );
    }

    /**
     * @override
     * @returns {AEnemy}
     */
    createEnemy() {
        return new EnemyA();
    }

    /**
     * @override
     * @returns {ACollision}
     */
    createCollision() {
        return new CollisionA();
    }

    /**
     * @override
     * @returns {AMissile}
     */
    createMissile( force ) {
        return new MissileA( this.#model.activeMovingStrategy, force );
    }

    /**
     * @override
     * @returns {AModelInfo}
     */
    createModelInfo( cannon ) {
        return new ModelInfoA( cannon );
    }
}