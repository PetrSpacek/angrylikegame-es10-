import IVisitor from "/game/visitor/IVisitor.js";
import Position from "/game/model/Position.js";

/**
 * @class
 * @implements IVisitor
 */
export default class Renderer extends IVisitor() {

    /**
     * @private
     * @type {IGraphics}
     */
    #gr;
    /**
     * @private
     * @type {Map<GameObject,AImage>}
     */
    #images;

    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * @override
     * @param {IGraphics} gr
     */
    set graphics( gr ) {
        this.#gr = gr;
    }

    /**
     * @override
     * @param {ACannon} go
     */
    visitCannon( go ) {
        let r = go.angle;
        let rr = r * Math.PI / 180;
        let f = go.force;
        let ff = new Position( Math.cos( rr ) * f * 5, Math.sin( rr ) * f * 5 );
        this.#gr.drawImage( "/asset/image/cannon.png", go.position, go.rotation * Math.PI / 180 );
        this.#gr.drawArrow( go.position, new Position( go.x + ff.x, go.y + ff.y ) );
    }

    /**
     * @override
     * @param {ACollision} go
     */
    visitCollision( go ) {
        this.#gr.drawImage( "/asset/image/collision.png", go.position );
    }

    /**
     * @override
     * @param {AEnemy} go
     */
    visitEnemy( go ) {
        let r = Math.floor(Math.random() * 2 + 1);
        this.#gr.drawImage( `/asset/image/enemy${r}.png`, go.position );
    }

    /**
     * @override
     * @param {AMissile} go
     */
    visitMissile( go ) {
        this.#gr.drawImage( "/asset/image/missile.png", go.position );
    }

    /**
     * @override
     * @param {AModelInfo} go
     */
    visitModelInfo( go ) {
        this.#gr.drawText( go.text, go.position );
    }
}