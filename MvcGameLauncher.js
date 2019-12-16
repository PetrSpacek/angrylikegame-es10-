import MvcGame from "/game/MvcGame.js";
import Graphics from "/game/bridge/Graphics.js";
import WebCanvasGraphics from "/game/bridge/WebCanvasGraphics.js";

/**
 * @type {MvcGame}
 * @const {MvcGame}
 */
const theGame = new MvcGame();

/**
 * @returns {void}
 */
async function main() {
    await theGame.init();

    document.title = theGame.windowTitle;

    let canvas = document.createElement( 'canvas' );
    canvas.width = theGame.windowWidth;
    canvas.height = theGame.windowHeight;
    document.body.appendChild( canvas );

    let gc = canvas.getContext( '2d' );
    let gr = new Graphics( new WebCanvasGraphics( gc ) );

    let pressedKeysCodes = [];

    document.addEventListener( 'keydown',
        event => {
            let code = event.code;
            if ( !pressedKeysCodes.includes( code ) ) {
                pressedKeysCodes.push( code );
            }
        }
    );
    document.addEventListener( 'keyup',
        event => {
            let code = event.code;
            let index = pressedKeysCodes.indexOf( code );
            if ( index >= 0 ) {
                pressedKeysCodes.splice( index, 1 );
            }
        }
    );
    setInterval(
        () => {
            theGame.processPressedKeys(pressedKeysCodes);
            theGame.update();
            theGame.render(gr);
        }, 33
    );
}

main();