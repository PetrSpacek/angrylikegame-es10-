import IShootingMode from "/game/state/IShootingMode.js";
import Config from "/game/config/Config.js";

/**
 * @class
 * @implements IShootingMode
 */
export default class DoubleShootingMode extends IShootingMode() {

    /**
     * @override
     * @param {ACannon} cannon
     */
    shoot( cannon ) {
        let m;
        m = cannon.primitiveShoot();
        m.move( 0, Config.MOVE_STEP );
        m = cannon.primitiveShoot();
        m.move( 0, -Config.MOVE_STEP );
    }

    /**
     * @override
     * @param {ACannon} cannon
     */
    toggle( cannon ) {
        cannon.setSingleShootingMode();
    }
}