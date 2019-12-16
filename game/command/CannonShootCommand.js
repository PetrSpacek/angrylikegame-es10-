import ACommand from "/game/command/ACommand.js";

/**
 * @class
 * @extends ACommnand
 */
export default class CannonShootCommand extends ACommand {

    constructor( reciever ) {
        super( reciever );
    }

    _executeImpl() {
        this._reciever.cannonShoot();
    }
}