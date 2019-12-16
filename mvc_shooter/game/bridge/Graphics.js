import IGraphics from "/game/bridge/IGraphics.js";
import Position from "/game/model/Position.js";

/**
 * @class
 * @implements IGraphics
 */
export default class Graphics extends IGraphics() {

    /**
     * @private
     * @type {IGraphicsImplementor}
     */
    #implementor = null;

    constructor( implementor ) {
        super();
        this.#implementor = implementor;
    }

    /**
     * @param {string} image
     * @param {Position} position
     * @param {number} [rotation=0]
     */
    drawImage(image, position, rotation = 0) {
        this.#implementor.drawImage(image, position, rotation);
    }

    /**
     * @override
     * @param {string} text
     * @param {Position} position
     */
    drawText(text, position) {
        this.#implementor.drawText(text, position);
    }

    /**
     * @override
     * @param {Position} begin
     * @param {Position} end
     */
    drawArrow(begin, end) {
        let edge = new Position( ( begin.x + 4 * end.x ) / 5, ( begin.y + 4 * end.y ) / 5 );
        let diff = new Position( end.x - edge.x, end.y - edge.y );
        let ldiff = new Position( diff.y, -diff.x );
        let rdiff = new Position( -diff.y, diff.x );
        let ledge = new Position( edge.x + ldiff.x, edge.y + ldiff.y );
        let redge = new Position( edge.x + rdiff.x, edge.y + rdiff.y );
        this.#implementor.drawLine( begin, end );
        this.#implementor.drawLine( end, ledge );
        this.#implementor.drawLine( end, redge );
    }

    /**
     * @override
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    clearRectangle( x, y, w, h ) {
        this.#implementor.clearRectangle(x, y, w, h);
    }
}