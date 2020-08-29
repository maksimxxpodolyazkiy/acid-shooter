import Matter, { Events, Body } from 'matter-js'
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
    Svg = Matter.Svg,
    Constraint = Matter.Constraint;
const engine = Engine.create();
const world = engine.world;
world.gravity.y = 0;
const render = Render.create({
    element: document.body,
    engine,
    options: {
        width: 800,
        height: 600,
        hasBounds: true,
        showVelocity: true,
        wireframes: false
    }
});


Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

const shooterPath = document.querySelector('.shooter-path');

const bottomSide = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
const topSide = Bodies.rectangle(400, -10, 810, 60, { isStatic: true });
const leftSide = Bodies.rectangle(-10, 300, 60, 610, { isStatic: true });
const rightSide = Bodies.rectangle(810, 300, 60, 610, { isStatic: true });
const ground = [bottomSide, topSide, leftSide, rightSide];

const viewportCentre = {
    x: render.options.width * 0.5,
    y: render.options.height * 0.5
};

const box = Bodies.rectangle(200,200,60,40);
const shooter = Bodies.circle(viewportCentre.x, viewportCentre.y, 46, {
    render: {
      sprite: {
        texture: '../images/shooter.png',
        xScale: 0.5,
        yScale: 0.5
      }
    }
  })

const body = [...ground, box, shooter];

world.bounds.min.x = -300;
world.bounds.min.y = -300;
world.bounds.max.x = 1100;
world.bounds.max.y = 900;

// let direction = null;
const vectors = {
    up: Vector.create(0, -3),
    down: Vector.create(0, 3),
    left: Vector.create(-3, 0),
    right: Vector.create(3, 0)
}

Events.on(engine, "afterUpdate", function() {
    // up
    if (key.isPressed('w')) {
        Body.setVelocity(shooter, vectors.up)
    }

    // down
    if (key.isPressed('s')) {
        Body.setVelocity(shooter, vectors.down)
    }
    
    // left
    if (key.isPressed('a')) {
        Body.setVelocity(shooter, vectors.left)
    }

    // right
    if (key.isPressed('d')) {
        Body.setVelocity(shooter, vectors.right)
    }

    // up left
    if (key.isPressed('w') && key.isPressed('a')) {
        Body.setVelocity(shooter, Vector.add(vectors.up, vectors.left))
    }

    // up right
    if (key.isPressed('w') && key.isPressed('d')) {
        Body.setVelocity(shooter, Vector.add(vectors.up, vectors.right))
    }

    // down left
    if (key.isPressed('s') && key.isPressed('a')) {
        Body.setVelocity(shooter, Vector.add(vectors.down, vectors.left))
    }

    // down right
    if (key.isPressed('s') && key.isPressed('d')) {
        Body.setVelocity(shooter, Vector.add(vectors.down, vectors.right))
    }


    Bounds.shift(render.bounds, {
        x: shooter.position.x - viewportCentre.x,
        y: shooter.position.y - viewportCentre.y
    });

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
