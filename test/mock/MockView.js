import View from "/game/view/View.js";
import Controller from "/game/controller/Controller.js";
import ModelProxy from "/game/proxy/ModelProxy.js";

/**
 * @class
 * @extens View
 */
export default class MockView extends View {
    /**
     * @private
     * @type {number}
     */
#updateCount;

    /**
     * @constructor
     * @param {Model} model
     */
    constructor( model ) {
        super( model );
        this.#updateCount = 1;
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
            this.#updateCount = 0;
        }
    }

    get updateCount() {
        return this.#updateCount;
    }
}