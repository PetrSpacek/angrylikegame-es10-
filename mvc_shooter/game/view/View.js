import IObserver from "/game/observer/IObserver.js";
import Renderer from "/game/visitor/Renderer.js";
import Controller from "/game/controller/Controller.js";
import ModelProxy from "/game/proxy/ModelProxy.js";
import Config from "/game/config/Config.js";

/**
 * @class
 * @implements IObserver
 */
export default class View extends IObserver() {

    /**
     * @private
     * @type {Model}
     */
    #model;
    /**
     * @private
     * @type {IGraphics}
     */
    #gr;
    /**
     * @private
     * @type {number}
     */
    #updateCount;
    /**
     * @private
     * @type {IVisitor}
     */
    #renderer;

    /**
     * @constructor
     * @param {Model} model
     */
    constructor( model ) {
        super();
        this.#model = model;
        this.#model.registerObserver( this );
        this.#updateCount = 1;
        this.#renderer = new Renderer();
    }

    /**
     * @returns {Controller}
     */
    makeController() {
        return new Controller( new ModelProxy( this.#model ) );
    }

    /**
     * @returns {void}
     */
    update() {
        ++this.#updateCount;
    }

    /**
     * @returns {void}
     */
    render() {
        if ( this.#updateCount > 0 ) {
            this.#gr.clearRectangle( 0, 0, Config.SCENE_WIDTH, Config.SCENE_HEIGHT );
            for ( let obj of this.#model.gameObjects ) {
                obj.accept( this.#renderer );
            }
            this.#updateCount = 0;
        }
    }

    /**
     * @param {IGraphics} gr
     */
    set graphics( gr ) {
        this.#gr = gr;
        this.#renderer.graphics = gr;
    }
}