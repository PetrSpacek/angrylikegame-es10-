import ISingleton from "/game/singleton/ISingleton.js";

const AUTH = {};

/**
 * @class
 */
export default class ImageBitmapCache extends ISingleton() {

    /**
     * @private
     * @static
     * @type {ImageBitmapCache}
     */
    static #instance = null;

    /**
     * @private
     * @type {Map<string,ImageBitmap>}
     */
    #loaded;

    /**
     * @private
     * @constructor
     */
    constructor( auth = null ) {
        super();
        if ( auth !== AUTH )
            throw new Error( 'Singleton cannot be instantiated by constructor' );
        this.#loaded = new Map();
    }

    /**
     * @param {string} path
     * @returns {Promise<ImageBitmap>}
     */
    async load( path ) {
        let data;
        if ( this.#loaded.has( path ) ) {
            data = this.#loaded.get( path );
        } else {
            let response = await fetch( path );
            let blob = await  response.blob();
            data = await createImageBitmap( blob );
            this.#loaded.set( path, data );
        }
        return data;
    }

    /**
     * Singleton factory method
     * @returns {ImageBitmapCache}
     */
    static get instance() {
        if ( !this.#instance )
            this.#instance = new this( AUTH );
        return this.#instance;
    }
}