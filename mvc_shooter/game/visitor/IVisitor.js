import UndefinedError from "/game/UndefinedError.js";

/**
 * @interface
 * @param superclass
 * @returns IVisitor
 */
const IVisitor = ( superclass = Object ) => class IVisitor extends superclass {

    /**
     * @param {ACannon} go
     */
    visitCannon( go ) {
        throw new UndefinedError();
    }

    /**
     * @param {ACollision} go
     */
    visitCollision( go ) {
        throw new UndefinedError();
    }

    /**
     * @param {AEnemy} go
     */
    visitEnemy( go ) {
        throw new UndefinedError();
    }

    /**
     * @param {AMissile} go
     */
    visitMissile( go ) {
        throw new UndefinedError();
    }

    /**
     * @param {AModelInfo} go
     */
    visitModelInfo( go ) {
        throw new UndefinedError();
    }

    /**
     * @param {IGraphics} gr
     */
    set graphics( gr ) {
        throw new UndefinedError();
    }
};

export default IVisitor;