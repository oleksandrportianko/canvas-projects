import React, { useRef, useEffect, useState } from 'react';

function Canvas() {
    const canvasRef = useRef(null);
    const [playerPosX, setPlayerPosX] = useState(10)
    const [playerPosY, setPlayerPosY] = useState(10)

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
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            switch(event.key) {
                case 'w': {
                    setPlayerPosY((prev) => {
                        return prev - 2
                    })
                    ctx.drawImage(playerImage, playerPosX, playerPosY);
                    break;
                }
                case 's': {
                    setPlayerPosY((prev) => {
                        return prev + 2
                    })
                    ctx.drawImage(playerImage, playerPosX, playerPosY);
                    break;
                }
                case 'a': {
                    setPlayerPosX((prev) => {
                        return prev - 2
                    })
                    ctx.drawImage(playerImage, playerPosX, playerPosY);
                    break;
                }
                case 'd': {
                    setPlayerPosX((prev) => {
                        return prev + 2
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

    return (
        <canvas 
            ref={canvasRef}
            tabIndex={0}
            width={500} 
            height={500}
        />
    );
}

export default Canvas;