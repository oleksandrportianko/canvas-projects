import React, { useRef, useEffect, useState } from 'react';

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

function Canvas() {
    const canvasRef = useRef(null);
    const [elements, setElements] = useState([])
    const [playerPosX, setPlayerPosX] = useState(10)
    const [playerPosY, setPlayerPosY] = useState(10)

    console.log(elements)

    function generateRandomElements(canvas, numberOfElements, playerPosX, playerPosY) {
        const ctx = canvas.getContext('2d');
        const colors = ['red', 'blue', 'green', 'yellow'];

        for (let i = 1; i <= numberOfElements; i++) {
            const size = Math.floor(Math.random() * 30) + 10; // random size between 10 and 40
            const x = Math.floor(Math.random() * (canvas.width - size));
            const y = Math.floor(Math.random() * (canvas.height - size));
            const color = colors[Math.floor(Math.random() * colors.length)];

            console.log(x, y, playerPosX, playerPosY)

            if ((x + size + 5 < playerPosX || x > playerPosX + 55) && (y + size < playerPosY || y > playerPosY + 105)) {
                const element = { x, y, size, color };
                setElements((prev) => {
                    return [...prev, { ...element, id: prev.length + 1 }]
                })

                // Draw the element on the canvas
                ctx.fillStyle = color;
                ctx.fillRect(x, y, size, size);
            }
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Create an image object from an SVG string
        const playerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="100" viewBox="0 0 50 100">
            <circle cx="25" cy="20" r="10" fill="red"/>
            <rect x="10" y="30" width="30" height="10" fill="black"/>
            <rect x="15" y="40" width="20" height="40" fill="black"/>
        </svg>`;

        const playerImage = new Image();
        playerImage.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(playerSvg)}`;

        // Draw the player image at the center of the canvas
        playerImage.onload = function () {
            ctx.drawImage(playerImage, playerPosX, playerPosY);
        }

        const handleKeyDown = (event) => {
            ctx.clearRect(playerPosX, playerPosY, 50, 100);
            switch (event.key) {
                case 'w': {
                    setPlayerPosY((prev) => {
                        if (prev - 2 < -10) {
                            return prev
                        } else {
                            return prev - 2
                        }
                    })
                    ctx.drawImage(playerImage, playerPosX, playerPosY);
                    break;
                }
                case 's': {
                    setPlayerPosY((prev) => {
                        if (prev + 2 > 420) {
                            return prev
                        } else {
                            return prev + 2
                        }
                    })
                    ctx.drawImage(playerImage, playerPosX, playerPosY);
                    break;
                }
                case 'a': {
                    setPlayerPosX((prev) => {
                        if (prev - 2 < -10) {
                            return prev
                        } else {
                            return prev - 2
                        }
                    })
                    ctx.drawImage(playerImage, playerPosX, playerPosY);
                    break;
                }
                case 'd': {
                    setPlayerPosX((prev) => {
                        if (prev + 2 > 460) {
                            return prev
                        } else {
                            return prev + 2
                        }
                    })
                    ctx.drawImage(playerImage, playerPosX, playerPosY);
                    break;
                }
                default: {
                    ctx.drawImage(playerImage, playerPosX, playerPosY);
                    break;
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [playerPosX, playerPosY]);

    useEffect(() => {
        const canvas = canvasRef.current;

        clearInterval()
        setInterval(() => {
            generateRandomElements(canvas, 1, playerPosX, playerPosY)
        }, 5500)
    }, [playerPosX, playerPosY])

    return (
        <div className='canvas-wrapper'>
            <canvas
                ref={canvasRef}
                tabIndex={0}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
            />
        </div>
    );
}

export default Canvas;