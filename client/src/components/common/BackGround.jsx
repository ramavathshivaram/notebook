import React, { useEffect, useRef } from "react";

import Matter from "matter-js";

const WORDS = ["NOTE", "WRITE", "ORGANIZE", "CREATE", "THINK"];

const BackGround = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter;

    const engine = Engine.create();

    const world = engine.world;

    world.gravity.y = 0.5;

    const width = window.innerWidth;

    const height = window.innerHeight;

    const isDark = document.documentElement.classList.contains("dark");

    const borderColor = isDark ? "hsl(240 3.7% 15.9%)" : "hsl(240 5.9% 90%)";

    const bgCard = isDark ? "hsl(240 10% 3.9%)" : "hsl(0 0% 100%)";

    const textColor = isDark ? "hsl(0 0% 98%)" : "hsl(240 10% 3.9%)";

    const muted = isDark ? "hsl(240 3.7% 15.9%)" : "hsl(240 4.8% 95.9%)";

    /* Renderer */
    const render = Render.create({
      canvas: canvasRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });

    /* Walls */
    const ground = Bodies.rectangle(width / 2, height + 30, width, 60, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    });

    const leftWall = Bodies.rectangle(-30, height / 2, 60, height, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    });

    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    });

    /* Floating Notes */
    const notes = WORDS.map((word, i) =>
      Bodies.rectangle(Math.random() * width, -100 - i * 120, 160, 64, {
        chamfer: {
          radius: 18,
        },

        restitution: 0.7,

        friction: 0.05,

        render: {
          fillStyle: bgCard,
          strokeStyle: borderColor,
          lineWidth: 2,
        },

        label: word,
      }),
    );

    Composite.add(world, [ground, leftWall, rightWall, ...notes]);

    /* Mouse */
    const mouse = Mouse.create(render.canvas);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,

      constraint: {
        stiffness: 0.2,

        render: {
          visible: false,
        },
      },
    });

    Composite.add(world, mouseConstraint);

    render.mouse = mouse;

    /* Labels */
    Events.on(render, "afterRender", () => {
      const ctx = render.context;

      ctx.textAlign = "center";

      ctx.textBaseline = "middle";

      ctx.font = "600 16px Inter";

      notes.forEach((body) => {
        const { x, y } = body.position;

        ctx.save();

        ctx.translate(x, y);

        ctx.rotate(body.angle);

        /* Glow */
        ctx.shadowColor = isDark
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.08)";

        ctx.shadowBlur = 18;

        /* Dot */
        ctx.fillStyle = muted;

        ctx.beginPath();

        ctx.arc(-58, 0, 5, 0, Math.PI * 2);

        ctx.fill();

        /* Text */
        ctx.fillStyle = textColor;

        ctx.fillText(body.label, 10, 1);

        ctx.restore();
      });
    });

    Render.run(render);

    const runner = Runner.create();

    Runner.run(runner, engine);

    /* Resize */
    const handleResize = () => {
      render.canvas.width = window.innerWidth;

      render.canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      Render.stop(render);

      Runner.stop(runner);

      Engine.clear(engine);

      render.canvas.remove();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Physics Canvas */}
      <canvas
        ref={canvasRef}
        className="
          absolute inset-0 h-full w-full
          pointer-events-auto
        "
      />

      {/* Overlay */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-b
          from-background/80
          via-background/40
          to-background/80
        "
      />

      {/* Top Glow */}
      <div
        className="
          absolute left-1/4 top-0 h-96 w-96
          rounded-full bg-primary/5 blur-3xl
          pointer-events-none
        "
      />

      {/* Bottom Glow */}
      <div
        className="
          absolute bottom-0 right-1/4 h-96 w-96
          rounded-full bg-primary/5 blur-3xl
          pointer-events-none
        "
      />

      {/* Noise Texture */}
      <div
        className="
          absolute inset-0 opacity-[0.03]
          [background-image:radial-gradient(hsl(var(--foreground))_1px,transparent_1px)]
          [background-size:24px_24px]
          pointer-events-none
        "
      />
    </div>
  );
};

export default BackGround;
