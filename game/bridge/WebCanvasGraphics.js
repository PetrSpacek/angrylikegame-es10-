import IGraphicsImplementor from "/game/bridge/IGraphicsImplementor.js";
import ImageBitmapCache from "/game/cache/ImageBitmapCache.js";

/**
 * @class
 * @implements IGraphicsImplementor
 */
export default class WebCanvasGraphics extends IGraphicsImplementor() {

    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    #context;
    /**
     * @private
     * @type {ImageBitmapCache}
     */
    #cache;

    /**
     * @constructor
     * @param {CanvasRenderingContext2D} context
     */
    constructor( context ) {
        super();
        this.#context = context;
        this.#cache = ImageBitmapCache.instance;
    }

    /**
     * @param {string} image
     * @param {Position} position
     */
    drawImage( image, position, rotation = 0 ) {
        this.#cache.load( image ).then(
            bitmap => {
                this.#context.drawImage( bitmap, position.x, position.y );
            }
        );
    }

    /**
     * @override
     * @param {string} text
     * @param {Position} position
     */
    drawText( text, position ) {
        this.#context.fillText( text, position.x, position.y );
    }

    /**
     * @override
     * @param {Position} begin
     * @param {Position} end
     */
    drawLine( begin, end ) {
        this.#context.beginPath();
        this.#context.moveTo( begin.x, begin.y );
        this.#context.lineTo( end.x, end.y );
        this.#context.stroke();
    }

    /**
     * @override
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    clearRectangle( x, y, w, h ) {
        this.#context.clearRect( x, y, w, h );
    }
}