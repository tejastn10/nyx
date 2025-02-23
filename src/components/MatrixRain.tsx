"use client";

import { FC, useEffect, useRef } from "react";

import { CHARACTERS } from "@/constants/matrix";

const MatrixRain: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return () => {};

		const ctx = canvas.getContext("2d");
		if (!ctx) return () => {};

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const fontSize = 16;
		const columns = Math.ceil(canvas.width / fontSize);

		const drops: number[] = new Array(columns).fill(1);

		const draw = () => {
			if (!ctx) return;

			ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = "#ffffff";

			for (let i = 0; i < drops.length; i++) {
				const text = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);

				if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}
		};

		const interval = setInterval(draw, 33);
		return () => {
			clearInterval(interval);
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);

	return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export { MatrixRain };
