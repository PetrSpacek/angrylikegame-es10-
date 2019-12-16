import IModel from "/game/proxy/IModel.js";
import IObservable from "/game/observer/IObservable.js";
import ObjectsFactoryA from "/game/abstractFactory/ObjectsFactoryA.js";
import SimpleMovingStrategy from "/game/strategy/SimpleMovingStrategy.js";
import GravityMovingStrategy from "/game/strategy/GravityMovingStrategy.js";
import Config from "/game/config/Config.js";

class Memento {

    objectsFactory;
    cannon;
    modelInfo;
    unexecutedCommands;
    executedCommands;
    enemies;
    missiles;
    collisions;

    constructor() {
        this.unexecutedCommands = [];
        this.executedCommands = [];
        this.enemies = [];
        this.missiles = [];
        this.collisions = [];
    }
}

/**
 * @class
 * @implements IModel
 * @implements IObservable
 */
export default class Model extends IObservable( IModel() ) {

    /**
     * @private
     * @type {IObserver[]}
     */
    #myObservers;
    /**
     * @private
     * @type {IObjectsFactory}
     */
    #objectsFactory;
    /**
     * @private
     * @type {IMovingStrategy}
     */
    #movingStrategy;

    /**
     * Use like Queue
     * @private
     * @type {ACommand[]}
     */
    #unexecutedCommands = [];
    /**
     * Use like Stack
     * @private
     * @type {ACommand[]}
     */
    #executedCommands = [];

    /**
     * @private
     * @type {ACannon}
     */
    #cannon;
    /**
     * @private
     * @type {AModelInfo}
     */
    #modelInfo;
    /**
     * @private
     * @type {AEnemy[]}
     */
    #enemies;
    /**
     * @private
     * @type {ACollision[]}
     */
    #collisions;
    /**
     * @private
     * @type {AMissile[]}
     */
    #missiles;

    /**
     * @constructor
     */
    constructor() {
        super();
        this.#myObservers = [];
        this.#objectsFactory = new ObjectsFactoryA( this );
        this.#movingStrategy = new SimpleMovingStrategy();

        this.#cannon = this.#objectsFactory.createCannon();
        this.#cannon.x = Config.CANNON_POSITION_X;
        this.#cannon.y = Config.CANNON_POSITION_Y;
        this.#modelInfo = this.#objectsFactory.createModelInfo( this.#cannon );
        this.#modelInfo.x = Config.INFO_POSITION_X;
        this.#modelInfo.y = Config.INFO_POSITION_Y;

        this.#enemies = [];
        this.#missiles = [];
        this.#collisions = [];

        for ( let i = 0; i < Config.ENEMIES_COUNT; ++i ) {
            this.#createEnemy();
        }
    }

    /**
     * @returns {GameObject[]}
     */
    get gameObjects() {
        let objs = this.#enemies
            .concat( this.#missiles )
            .concat( this.#collisions )
            .concat( [ this.#cannon, this.#modelInfo ] );
        return objs;
    }

    /**
     * @returns {void}
     */
    timeTick() {
        this.#processCommands();
        this.#checkCollisions();
        this.#moveMissiles();
        this.#removeCollisions();
        this.notifyMyObservers();
    }

    #createEnemy = function createEnemy() {
        let rx = Math.random() * Config.SCENE_WIDTH;
        let ry = Math.random() * Config.SCENE_HEIGHT;
        let e = this.#objectsFactory.createEnemy();
        e.x = rx;
        e.y = ry;
        this.#enemies.push( e );
    };

    /**
     * @returns {void}
     */
    #processCommands = function processCommands() {
        while ( this.#unexecutedCommands.length > 0 ) {
            let cmd = this.#unexecutedCommands.shift();
            cmd.execute();
            this.#executedCommands.push( cmd );
        }
    };

    #checkCollisions = function checkCollisions() {
        for ( let e of this.#enemies ) {
            for ( let m of this.#missiles ) {
                let xd = Math.abs( e.x - m.x );
                let yd = Math.abs( e.y - m.y );
                if ( xd < 20 && yd < 20 ) {
                    this.#processCollision( e, m );
                }
            }
        }
    };

    #processCollision = function processCollision( enemy, missile ) {
        let i = this.#enemies.indexOf( enemy );
        let j = this.#missiles.indexOf( missile );
        this.#missiles.splice( j, 1 );
        this.#enemies.splice( i, 1 );
        let c = this.#objectsFactory.createCollision();
        c.x = missile.x;
        c.y = missile.y;
        this.#modelInfo.score = this.#modelInfo.score + 1;
        this.#collisions.push( c );
        this.#createEnemy();
    };

    /**
     * @returns {null}
     */
    #moveMissiles = function moveMissiles() {
        for ( let i in this.#missiles ) {
            let m = this.#missiles[i];
            if ( m.x > Config.SCENE_WIDTH || m.y > Config.SCENE_HEIGHT || m.x < 0 )
                this.#missiles.splice( i, 1 );
            m.nextMove();
        }
    };

    #removeCollisions = function removeCollisions() {
        for ( let i in this.#collisions ) {
            let c = this.#collisions[i];
            if ( c.age > Config.MAX_COLLISION_AGE )
                this.#collisions.splice( i, 1 );
        }
    };

    /**
     * @returns {IMovingStrategy}
     */
    get activeMovingStrategy() {
        return this.#movingStrategy;
    }

    /**
     * @override
     */
    increaseForce() {
        this.#cannon.force = this.#cannon.force + 1;
    }

    /**
     * @override
     */
    decreaseForce() {
        this.#cannon.force = this.#cannon.force - 1;
    }

    /**
     * @override
     */
    increaseAngle() {
        this.#cannon.angle = this.#cannon.angle + 1;
    }

    /**
     * @override
     */
    decreaseAngle() {
        this.#cannon.angle = this.#cannon.angle - 1;
    }

    /**
     * @override
     */
    setSimpleMovingStrategy() {
        this.#movingStrategy = new SimpleMovingStrategy();
    }

    /**
     * @override
     */
    setGravityMovingStrategy() {
        this.#movingStrategy = new GravityMovingStrategy();
    }

    /**
     * @override
     */
    moveCannonUp() {
        this.#cannon.moveUp();
        this.notifyMyObservers();
    }

    /**
     * @override
     */
    moveCannonDown() {
        this.#cannon.moveDown();
        this.notifyMyObservers();
    }

    /**
     * @override
     */
    cannonShoot() {
        let ms = this.#cannon.shoot();
        this.#missiles = this.#missiles.concat( ms );
        this.notifyMyObservers();
    }

    /**
     * @override
     */
    cannonToggleShootingMode() {
        this.#cannon.toggleShootingMode();
        this.notifyMyObservers();
    }

    /**
     * @override
     * @returns {Object}
     */
    get memento() {
        let m = new Memento();
        m.objectsFactory = this.#objectsFactory;
        m.cannon = this.#cannon.copy();
        m.modelInfo = this.#modelInfo.copy();
        m.modelInfo._cannon = m.cannon;
        for ( let c of this.#unexecutedCommands ) {
            m.unexecutedCommands.push( c );
        }
        for ( let c of this.#executedCommands ) {
            m.executedCommands.push( c );
        }
        for ( let e of this.#enemies ) {
            m.enemies.push( e.copy( ) );
        }
        for ( let mm of this.#missiles  ) {
            m.missiles.push( mm.copy( ) );
        }
        for ( let c of this.#collisions ) {
            m.collisions.push( c.copy() );
        }
        return m;
    }

    /**
     * @override
     * @param {Object} m
     */
    set memento( m ) {
        this.#objectsFactory = m.objectsFactory;
        this.#cannon = m.cannon;
        this.#modelInfo = m.modelInfo;
        this.#unexecutedCommands = m.unexecutedCommands;
        this.#executedCommands = m.executedCommands;
        this.#enemies = m.enemies;
        this.#missiles = m.missiles;
        this.#collisions = m.collisions;
    }

    /**
     * @override
     * @param {ACommand} command
     */
    registerCommand( command ) {
        this.#unexecutedCommands.push( command );
    }

    /**
     * @override
     */
    undoLastCommand() {
        let cmd = this.#executedCommands.pop();
        if ( cmd ) {
            cmd.unexecute();
            this.notifyMyObservers();
        }
    }

    /**
     * @override
     * @param {IObserver} observer
     */
    registerObserver( observer ) {
        this.#myObservers.push( observer );
    }

    /**
     * @override
     * @param {IObserver} observer
     */
    unregisterObserver( observer ) {
        let index = this.#myObservers.indexOf( observer );
        if ( index >= 0 )
            this.#myObservers.splice( index, 1 );
    }

    /**
     * @override
     */
    notifyMyObservers() {
        for ( let obs of this.#myObservers ) {
            obs.update();
        }
    }
}