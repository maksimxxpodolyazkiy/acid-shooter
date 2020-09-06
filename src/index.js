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
    // canvas,
    engine,
    options: {
        width: 1400,
        height: 700,
        hasBounds: true,
        // showVelocity: true,
        wireframes: false,
    },
});
// const imgPattern = document.querySelector('img')
// console.log("imgPattern", imgPattern)
// const pattern = render.context.createPattern(imgPattern, 'repeat')
// console.log("pattern", pattern)
// render.context.fillStyle = pattern
// render.context.fill()
// console.log("render.context", render.context)

// engine.render.context
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

const box = Bodies.rectangle(200,200,60,40);
const shooter = Bodies.circle(viewportCentre.x, viewportCentre.y, 46, {
    render: {
      sprite: {
        texture: '../images/shooter.png',
        xScale: 0.5,
        yScale: 0.5
      }
    },
})

const texture = Bodies.rectangle(0, 0, 5000, 5000, {
    render: {
        sprite: {
            texture: '../images/space.jpg'
        }
    },
    collisionFilter: {
        mask: defaultStatus
    }
})

const body = [
    // ...ground,
    // box,
    texture,
    shooter
];

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
        Body.rotate(shooter, -0.05)
        vectors.up = Vector.rotate(vectors.up, -0.05)
    }

    // right
    if (key.isPressed('d')) {
        Body.rotate(shooter, 0.05)
        vectors.up = Vector.rotate(vectors.up, 0.05)
    }
    
    // // up left
    // if (key.isPressed('w') && key.isPressed('a')) {
        //     Body.setVelocity(shooter, Vector.add(vectors.up, vectors.left))
        // }
        
    // // up right
    // if (key.isPressed('w') && key.isPressed('d')) {
        //     Body.setVelocity(shooter, Vector.add(vectors.up, vectors.right))
        // }

    // // down left
    // if (key.isPressed('s') && key.isPressed('a')) {
    //     Body.setVelocity(shooter, Vector.add(vectors.down, vectors.left))
    // }
    
    // // down right
    // if (key.isPressed('s') && key.isPressed('d')) {
    //     Body.setVelocity(shooter, Vector.add(vectors.down, vectors.right))
    // }
    
    
    Bounds.shift(render.bounds, {
        x: shooter.position.x - viewportCentre.x,
        y: shooter.position.y - viewportCentre.y
    });

wa3})
conw 4sole.log(render.context )
setInterval(() => {
    console.log(shooter)
}, 3000)




const onClickCreator = MouseConstraint.create(engine);
Events.on(onClickCreator, "mousedown", (event) => {
    World.add(engine.world, Bodies.circle(event.mouse.position.x, event.mouse.position.y, Math.floor(Math.random()*50), {
        friction: 0.5,
        restitution: 1.2,
        force: {
            x: 0,
            y: 0.2
        }
    }))
})






World.add(engine.world, body);

Engine.run(engine);
