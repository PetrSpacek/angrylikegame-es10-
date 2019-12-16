import Config from "/game/config/Config.js";
import Model from "/game/model/Model.js";
import Controller from "/game/controller/Controller.js";
import View from "/game/view/View.js";

function priorityKey( key ) {
    return key.startsWith( 'Control' )
        || key.startsWith( 'Shift' );
}

/**
 * @class
 * @property {Model} #model
 * @property {View} #view
 * @property {Controller} #controller
 */
export default class MvcGame {

    /**
     * @private
     * @type {Model}
     */
    #model;
    /**
     * @private
     * @type {View}
     */
    #view;
    /**
     * @private
     * @type {Controller}
     */
    #controller;

    /**
     * @returns {void}
     */
    async init() {
        this.#model = new Model();
        this.#view = new View(this.#model);
        this.#controller = this.#view.makeController();
    }

    /**
     * @param {string[]} pressedKeysCodes
     */
    processPressedKeys( pressedKeysCodes ) {
        this.#controller.handleKeyCode( "ResetState" );
        pressedKeysCodes.sort(
            (a, b) => {
                if ( priorityKey(a) ) return -1;
                else if ( priorityKey(b) ) return 1;
                else return 0;
            }
        );
        for ( let code of pressedKeysCodes ) {
            this.#controller.handleKeyCode( code );
        }
    }

    /**
     * @returns {void}
     */
    update() {
        this.#model.timeTick();
    }

    /**
     * @param {IGraphics} gr
     */
    render( gr ) {
        this.#view.graphics = gr;
        this.#view.render();
    }

    /**
     * @returns {string}
     */
    get windowTitle() {
        return Config.WINDOW_TITLE;
    }

    /**
     * @returns {number}
     */
    get windowWidth() {
        return Config.SCENE_WIDTH;
    }

    /**
     * @returns {number}
     */
    get windowHeight() {
        return Config.SCENE_HEIGHT;
    }
}