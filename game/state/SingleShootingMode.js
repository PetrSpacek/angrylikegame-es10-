import IShootingMode from "/game/state/IShootingMode.js";

/**
 * @class
 * @implements IShootingMode
 */
export default class SingleShootingMode extends IShootingMode() {

    /**
     * @override
     * @param {ACannon} cannon
     */
    shoot( cannon ) {
        cannon.primitiveShoot();
    }

    /**
     * @override
     * @param {ACannon} cannon
     */
    toggle( cannon ) {
        cannon.setDoubleShootingMode();
    }
}