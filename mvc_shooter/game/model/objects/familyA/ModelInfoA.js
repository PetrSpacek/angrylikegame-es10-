import AModelInfo from "/game/model/objects/AModelInfo.js";

/**
 * @class
 * @extends AModelInfo
 */
export default class ModelInfoA extends AModelInfo {

    constructor( cannon ) {
        super( cannon );
    }

    /**
     * @override
     * @returns {string}
     */
    get text() {
        return "Score: " + this.score + "\tForce: " + this._cannon.force + "\tAngle: " + (-this._cannon.angle) + "°";
    }
}