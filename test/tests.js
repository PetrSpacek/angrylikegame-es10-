import MockModel from "/test/mock/MockModel.js";
import MockView from "/test/mock/MockView.js";
import Config from "/game/config/Config.js";

async function sleep( milis ) {
    return new Promise( resolve => setTimeout( resolve, milis ) );
}

let QUnit = window.QUnit;

QUnit.test( "View update on controller key handle",
    assert => {
        let model = new MockModel();
        let view = new MockView( model );
        let controller = view.makeController();
        assert.equal( view.updateCount, 1, "Initial state" );
        controller.handleKeyCode( "Space" );
        assert.equal( view.updateCount, 1, "Key not yet processed" );
        model.timeTick();
        assert.equal( view.updateCount, 3, "Model ticked" );
        controller.handleKeyCode( "ShiftLeft" );
        model.timeTick();
        assert.equal( view.updateCount, 4, "Model ticked with modifier key" );
        controller.handleKeyCode( "ResetState" );
        model.timeTick();
        assert.equal( view.updateCount, 5, "Model ticked with no key" );
        view.render();
        assert.equal( view.updateCount, 0, "View rendered" );
    }
);

QUnit.test( "Cannon moves on controller key handle",
    assert => {
        let model = new MockModel();
        let view = new MockView( model );
        let controller = view.makeController();
        let cannon = model.cannon;
        let y = Config.CANNON_POSITION_Y;
        assert.equal( cannon.y, y, "Initial state" );
        for ( let i = 0; i < 20; ++i ) {
            controller.handleKeyCode( "ArrowUp" );
        }
        model.timeTick();
        assert.equal( cannon.y, y - 20 * Config.MOVE_STEP, "Move up" );
        for ( let i = 0; i < 40; ++i ) {
            controller.handleKeyCode( "ArrowDown" );
        }
        model.timeTick();
        assert.equal( cannon.y, y + 20 * Config.MOVE_STEP, "Move down" );
    }
);

QUnit.test( "Force changes on controller key handle",
    assert => {
        let model = new MockModel();
        let view = new MockView( model );
        let controller = view.makeController();
        let cannon = model.cannon;
        let f = Config.MOVE_STEP;
        assert.equal( cannon.force, f, "Initial state" );
        for ( let i = 0; i < 40; ++i ) {
            controller.handleKeyCode( "NumpadAdd" );
        }
        model.timeTick();
        assert.equal( cannon.force, f + 40, "More force" );
        for ( let i = 0; i < 20; ++i ) {
            controller.handleKeyCode( "NumpadSubtract" );
        }
        model.timeTick();
        assert.equal( cannon.force, f + 20, "Less force" );
    }
);

QUnit.test( "Cannon changes angle on controller key handle",
    assert => {
        let model = new MockModel();
        let view = new MockView( model );
        let controller = view.makeController();
        let cannon = model.cannon;
        assert.equal( cannon.angle, 0, "Initial state" );
        for ( let i = 0; i < 40; ++i ) {
            controller.handleKeyCode( "ArrowLeft" );
        }
        model.timeTick();
        assert.equal( cannon.angle, -40, "Higher angle" );
        for ( let i = 0; i < 60; ++i ) {
            controller.handleKeyCode( "ArrowRight" );
        }
        model.timeTick();
        assert.equal( cannon.angle, 20, "Lower angle" );
    }
);


QUnit.test( "Cannon shoots on controller key handle",
    assert => {
        let model = new MockModel();
        let view = new MockView( model );
        let controller = view.makeController();
        assert.equal( model.missiles.length, 0, "Initial state" );
        for ( let i = 0; i < 40; ++i ) {
            controller.handleKeyCode( "Space" );
        }
        model.timeTick();
        assert.equal( model.missiles.length, 40, "Cannon shoots" );
    }
);


QUnit.test( "Missiles collide with enemies",
    async assert => {
        let model = new MockModel();
        let fac = model.objectsFactory;
        let cannon = model.cannon;
        let e = fac.createEnemy();
        e.x = cannon.x + Config.MOVE_STEP;
        e.y = cannon.y;
        model.enemies.push( e );
        assert.equal( model.enemies.length, 6, "Enemy exists" );
        model.cannonShoot();
        assert.equal( model.missiles.length, 1, "Cannon shot a missile" );
        model.timeTick();
        model.timeTick()
        assert.equal( model.collisions.length, 1, "Missile has hit the enemy" );
        let now = Date.now();
        await sleep( Config.MAX_COLLISION_AGE );
        assert.ok( Date.now() - now >= Config.MAX_COLLISION_AGE, "Wait for the collision to disappear" );
        model.timeTick();
        assert.equal( model.collisions.length, 0, "Collision disappeared" );
    }
);