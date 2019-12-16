import GameObject from "/game/model/GameObject.js";

/**
 * @class
 * @extends GameObject
 */
export default class AEnemy extends GameObject {

    /**
     * @param {IVisitor} visitor
     */
    accept( visitor ) {
        visitor.visitEnemy( this );
    }
}