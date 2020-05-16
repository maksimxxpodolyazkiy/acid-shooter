import './styles/styles.css'
import Matter, { Events } from 'matter-js'
import key from 'keymaster'

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    // Events = Matter.Events,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Vector = Matter.Vector,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies,
    Axes = Matter.Axes,
    Constraint = Matter.Constraint;
const engine = Engine.create();
const world = engine.world;
const render = Render.create({
    element: document.body,
    engine,
    options: {
        width: 800,
        height: 600,
        hasBounds: true,
        showVelocity: true
    }
});


Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);

const bottomSide = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
const topSide = Bodies.rectangle(400, -10, 810, 60, { isStatic: true });
const leftSide = Bodies.rectangle(-10, 300, 60, 610, { isStatic: true });
const rightSide = Bodies.rectangle(810, 300, 60, 610, { isStatic: true });
const ground = [bottomSide, topSide, leftSide, rightSide];

const viewportCentre = {
    x: render.options.width * 0.5,
    y: render.options.height * 0.5
};

const shooter = Bodies.rectangle(viewportCentre.x, viewportCentre.y, 40, 40, {
    // vertices: [viewportCentre],
    isStatic: true
});

const body = [...ground, shooter];

var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

world.bounds.min.x = -300;
world.bounds.min.y = -300;
world.bounds.max.x = 1100;
world.bounds.max.y = 900;

let direction = null;
const vectors = {
    up: Vector.create(0, -1),
    down: Vector.create(0, 1),
    left: Vector.create(-1, 0),
    right: Vector.create(1, 0)
}

Events.on(engine, 'beforeTick', function() {
    const mouse = mouseConstraint.mouse;
    // create a vector to translate the view, allowing the user to control view speed
    const deltaCentre = Vector.sub(mouse.absolute, viewportCentre);

    
    // translate the view if mouse has moved over 50px from the centre of viewport
    direction = Vector.normalise(deltaCentre);

    
    // up
    if (key.isPressed('w')) {
        direction = vectors.up
    }

    // down
    if (key.isPressed('s')) {
        direction = vectors.down
    }
    
    // left
    if (key.isPressed('a')) {
        direction = vectors.left
    }
    
    // right
    if (key.isPressed('d')) {
        direction = vectors.right
    }

    // up left
    if (key.isPressed('w') && key.isPressed('a')) {
        direction = Vector.add(vectors.up, vectors.left)
    }

    // up right
    if (key.isPressed('w') && key.isPressed('d')) {
        direction = Vector.add(vectors.up, vectors.right)
    }

    // down left
    if (key.isPressed('s') && key.isPressed('a')) {
        direction = Vector.add(vectors.down, vectors.left)
    }

    // down right
    if (key.isPressed('s') && key.isPressed('d')) {
        direction = Vector.add(vectors.down, vectors.right)
    }
    const translate = Vector.mult(direction, 3);

    // prevent the view moving outside the world bounds
    // if (render.bounds.min.x + translate.x < world.bounds.min.x)
    //     translate.x = world.bounds.min.x - render.bounds.min.x;

    // if (render.bounds.max.x + translate.x > world.bounds.max.x)
    //     translate.x = world.bounds.max.x - render.bounds.max.x;

    // if (render.bounds.min.y + translate.y < world.bounds.min.y)
    //     translate.y = world.bounds.min.y - render.bounds.min.y;

    // if (render.bounds.max.y + translate.y > world.bounds.max.y)
    //     translate.y = world.bounds.max.y - render.bounds.max.y;

    // move the view
    Bounds.translate(render.bounds, translate);

    Mouse.setOffset(mouse, render.bounds.min);
})



// const onClickCreator = MouseConstraint.create(engine);
// Events.on(onClickCreator, "mousedown", (event) => {
//     World.add(engine.world, Bodies.circle(event.mouse.position.x, event.mouse.position.y, Math.floor(Math.random()*80), {
//         friction: 0.5,
//         restitution: 1.2,
//         force: {
//             x: 0,
//             y: 0.2
//         }
//     }))
// })







World.add(engine.world, body);

Engine.run(engine);
