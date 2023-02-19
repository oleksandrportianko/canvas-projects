import React, { useRef, useEffect } from 'react';

function Canvas() {
    const canvasRef = useRef(null);

    console.log(canvasRef)

    const handleKeyDown = (event) => {
        console.log(event)
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
            const playerX = 10;
            const playerY = 10;
            ctx.drawImage(playerImage, playerX, playerY);
        }
    }, []);

    return (
        <canvas 
            ref={canvasRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            width={500} 
            height={500} 
        />
    );
}

export default Canvas;