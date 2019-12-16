import UndefinedError from "/game/UndefinedError.js";

/**
 * @interface
 * @param superclass
 * @returns IGraphics
 */
const IGraphics = ( superclass = Object ) => class IGraphics extends superclass {

    /**
     * @abstract
     * @param {string} image
     * @param {Position} position
     * @param {number} rotation
     */
    drawImage( image, position, rotation ) {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @param {string} text
     * @param {Position} position
     */
    drawText( text, position ) {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @param {Position} begin
     * @param {Position} end
     */
    drawArrow( begin, end ) {
        throw new UndefinedError();
    }

    /**
     * @abstract
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    clearRectangle( x, y, w, h ) {
        throw new UndefinedError();
    }
};

export default IGraphics;