import TimelifeAwareObject from "/game/model/TimelifeAwareObject.js";

/**
 * @class
 * @extends TimelifeAwareObject
 */
export default class ACollision extends TimelifeAwareObject {

    /**
     * @override
     * @param {IVisitor} visitor
     */
    accept( visitor ) {
        visitor.visitCollision( this );
    }
}