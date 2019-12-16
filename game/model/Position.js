export default class Position {
    /**
     * @param {number} [x=0]
     * @param {number} [y=0]
     */
    constructor( x = 0, y = 0 ) {
        this._x = x;
        this._y = y;
    }

    /**
     * @returns {number}
     */
    get x() {
        return this._x;
    }

    /**
     * @returns {number}
     */
    get y() {
        return this._y;
    }

    /**
     * @param {number} x
     */
    set x(x) {
        this._x = x;
    }

    /**
     * @param {number} y
     */
    set y(y) {
        this._y = y;
    }

    /**
     * @param {number} dx
     * @param {number} dy
     * @returns {Position}
     */
    move( dx, dy ) {
        this._x += dx;
        this._y += dy;
        return this;
    }
}