import './App.css';
import { useEffect, useRef, useState } from 'react';
import gun from './Target/gun.png';
import target from './Target/TargetData';
import spaceBg from './assets/space_bg.png';
import bulletImg from './assets/hd_bullet.png';

function App() {
  const [showGuide, setShowGuide] = useState(true);
  const [showWin, setShowWin] = useState(false);
  const canvasRef = useRef(null);
  const isGameActive = useRef(false); // New ref to track game state

  // Refs for UX focus management
  const startButtonRef = useRef(null);
  const playAgainButtonRef = useRef(null);

  // Game logical size
  const LOGICAL_WIDTH = 300;
  const LOGICAL_HEIGHT = 150;

  // Game variables (closed over by Looping and event handlers)
  let canvas, ctx,
    damage = 1,
    player_x = (LOGICAL_WIDTH / 2) - 25, player_y = LOGICAL_HEIGHT - 25, player_w = 20, player_h = 20;
  let bullet = [], rightKey = false, leftKey = false, upKey = false, downKey = false;
  let BullWidth = 3;
  let BullHeight = 7;
  let playerImage = new Image();
  playerImage.src = gun;

  // Starfield initialization
  const stars = useRef([]);
  if (stars.current.length === 0) {
    for (let i = 0; i < 50; i++) {
        // Subtle twinkling stars
      stars.current.push({
        x: Math.random() * LOGICAL_WIDTH,
        y: Math.random() * LOGICAL_HEIGHT,
        radius: Math.random() * 1.5 + 0.5, 
        alpha: Math.random(), 
        maxAlpha: Math.random() * 0.4 + 0.6, 
        minAlpha: Math.random() * 0.3 + 0.2, 
        alphaChange: Math.random() * 0.02 + 0.005, 
        direction: 1,
        speed: Math.random() * 0.5 + 0.2, // Faster horizontal speed
        driftSpeed: Math.random() * 0.002 + 0.0005, // Speed of the sine wave drift
        driftAmplitude: Math.random() * 0.5 // Magnitude of the drift
      });
    }
  }

  function drawStars() {
    ctx.save();
    ctx.shadowBlur = 8; // Increased glow
    ctx.shadowColor = "white";

    stars.current.forEach(star => {
      ctx.beginPath();
      // Set color with dynamic alpha
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();

      // Update alpha for twinkling
      if (star.direction === 1) {
          star.alpha += star.alphaChange;
          if (star.alpha >= star.maxAlpha) {
              star.alpha = star.maxAlpha;
              star.direction = -1;
          }
      } else {
          star.alpha -= star.alphaChange;
          if (star.alpha <= star.minAlpha) {
              star.alpha = star.minAlpha;
              star.direction = 1;
          }
      }

      // Update position (Movement)
      // Update position (Movement: Right to Left)
      star.x -= star.speed;
      
      // Undeterministic Drift
      star.y += Math.sin(Date.now() * star.driftSpeed) * star.driftAmplitude;

      if (star.x < 0) {
        star.x = LOGICAL_WIDTH;
        star.y = Math.random() * LOGICAL_HEIGHT;
      }
    });
    ctx.restore();
  }

  function backgroundRemove() {
    ctx.clearRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
  }

  // Focus management effects
  useEffect(() => {
    if (showGuide && startButtonRef.current) {
      startButtonRef.current.focus();
    }
  }, [showGuide]);

  useEffect(() => {
    if (showWin && playAgainButtonRef.current) {
      playAgainButtonRef.current.focus();
    }
  }, [showWin]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    canvas = canvasRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ctx = canvas.getContext('2d');

    const handleResize = () => {
      if (!canvas) return;
      
      // Get the display size of the canvas
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set the buffer size to the display size multiplied by DPR for sharp rendering
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale all drawing operations by the ratio of actual pixels to logical pixels
      const scaleX = canvas.width / LOGICAL_WIDTH;
      const scaleY = canvas.height / LOGICAL_HEIGHT;
      
      ctx.scale(scaleX, scaleY);
    };

    // Initial sizing
    handleResize();

    // Re-size on window resize
    window.addEventListener('resize', handleResize);

    const intervalId = setInterval(Looping, 20); // Capture ID
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);

    // Cleanup to prevent memory leaks and duplicate listeners
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawThruster(x, y, width, height) {
    ctx.save();
    
    // Gradient for the flame
    const gradient = ctx.createLinearGradient(x, y, x, y + height);
    gradient.addColorStop(0, "cyan");    // Core heat
    gradient.addColorStop(0.4, "blue");  // Middle
    gradient.addColorStop(1, "rgba(0, 0, 255, 0)"); // Fade out tail

    // Randomize flame length and width for flickering effect
    const flickerHeight = height + Math.random() * 3;
    const flickerWidth = width + Math.random() * 2 - 1;

    ctx.fillStyle = gradient;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "cyan";

    ctx.beginPath();
    ctx.moveTo(x - flickerWidth / 2, y); // Top left
    ctx.lineTo(x + flickerWidth / 2, y); // Top right
    ctx.lineTo(x, y + flickerHeight);    // Bottom tip
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawplayer() {
    if (rightKey) player_x += 3;
    else if (leftKey) player_x -= 3;
    if (upKey) player_y -= 3;
    else if (downKey) player_y += 3;

    // Boundaries
    if (player_x <= 0) player_x = 0;
    if ((player_x + player_w) >= LOGICAL_WIDTH) player_x = LOGICAL_WIDTH - player_w;
    if (player_y <= 0) player_y = 0;
    if ((player_y + player_h) >= LOGICAL_HEIGHT) player_y = LOGICAL_HEIGHT - player_h;

    if ((player_y + player_h) >= LOGICAL_HEIGHT) player_y = LOGICAL_HEIGHT - player_h;

    // Draw thruster at the bottom center of the ship
    // Passing x (center), y (bottom), width, height of flames
    // Overlap slightly (-5) to look attached
    drawThruster(player_x + player_w / 2, player_y + player_h - 5, 6, 25);

    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.drawImage(playerImage, player_x, player_y, player_w, player_h);
    ctx.restore();
  }

  // Bullet Create
  const bulletSprite = new Image();
  bulletSprite.src = bulletImg;

  function drawbullet() {
    if (bullet.length)
      for (var i = 0; i < bullet.length; i++) {
        // Draw bullet image instead of rectangle
        // Adjust width/height for the sprite
        ctx.save();
        ctx.shadowColor = "rgba(255, 255, 0, 0.5)"; // Slight glow for bullets
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.drawImage(bulletSprite, bullet[i][0], bullet[i][1], 10, 20); 
        ctx.restore(); 
      }
  }

  // Bullet Move
  function movebullet() {
    // Iterate backwards to safely remove elements without index shifting issues
    for (var i = bullet.length - 1; i >= 0; i--) {
      if (bullet[i][1] > -11) {
        bullet[i][1] -= 10;
      } else if (bullet[i][1] < -10) {
        bullet.splice(i, 1);
      }
    }
  }

// Check for Bullet Collide
   function checkcolidewith(target){
      return bullet.some((bull) => {
        if (collideWith(bull,target)===true) {
          bullet.splice(bullet.indexOf(bull), 1);
          return true;
        }
       return false
      })
   }

   //Collide happen conditions
  // Collide happen conditions
  function collideWith(Bullet, Enemy) {
    if (
      Bullet[0] < Enemy.x + Enemy.width &&
      Bullet[0] + BullWidth > Enemy.x &&
      Bullet[1] < Enemy.y + Enemy.height &&
      Bullet[1] + BullHeight > Enemy.y
    ) {
      Enemy.takeDamage(damage);
      return true
    }
    return false;
  }

  //loop according to working
  function Looping(){     
  backgroundRemove();
  drawStars();
  movebullet();
  drawplayer();
  drawbullet();
  target.forEach((tar) =>{
    tar.draw(ctx);
    if (checkcolidewith(tar)) {
      if (tar.health <= 0) {
        const index = target.indexOf(tar);
        target.splice(index, 1);
      }
    }
  });

    // Show win animation if all targets are killed
    if (target.length === 0 && !showWin) {
      setShowWin(true);
      isGameActive.current = false; // Stop input on win
    }
  }

  function keyDown(e) {
    if (!isGameActive.current) return; // Block input if game not active

    if (e.code === "ArrowRight" || e.code === "KeyD") rightKey = true;
    else if (e.code === "ArrowLeft" || e.code === "KeyA") leftKey = true;
    if (e.code === "ArrowUp" || e.code === "KeyW") upKey = true;
    else if (e.code === "ArrowDown" || e.code === "KeyS") downKey = true;

    if (e.key === "Enter" || e.code === "Space") {
      bullet.push([player_x + 7, player_y, BullWidth, BullHeight]);
    }
  }

  function keyUp(e) {
    if (e.code === "ArrowRight" || e.code === "KeyD") rightKey = false;
    else if (e.code === "ArrowLeft" || e.code === "KeyA") leftKey = false;
    if (e.code === "ArrowUp" || e.code === "KeyW") upKey = false;
    else if (e.code === "ArrowDown" || e.code === "KeyS") downKey = false;
  }

  const startGame = () => {
    setShowGuide(false);
    isGameActive.current = true;
  };

  return (
    <div className=' bg-gray-900 '>
      <div className='flex items-center justify-center h-screen'>
        <canvas className='w-full h-full rounded-3xl' style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${spaceBg})`,
        }} ref={canvasRef} >
        </canvas>

        {showGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-80 md:w-96 text-gray-800 relative">
              <h2 className="text-xl font-bold mb-2 text-center text-amber-600">How to Play</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                <li>Use <span className="font-semibold">Arrow Keys</span> or <span className="font-semibold">WASD</span> to move:
                  <ul className="pl-4 list-[circle]">
                    <li><b>Up/W</b>: Move up</li>
                    <li><b>Down/S</b>: Move down</li>
                    <li><b>Left/A</b>: Move left</li>
                    <li><b>Right/D</b>: Move right</li>
                  </ul>
                </li>
                <li>Press <span className="font-semibold">Enter</span> or <span className="font-semibold">Space</span> to fire.</li>
                <li>The gun can only move inside the canvas area.</li>
                <li>Hit all targets to win!</li>
              </ul>
              <button
                ref={startButtonRef}
                className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:ring-4 focus:ring-amber-300 focus:outline-none"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          </div>)}
        {showWin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-bounce">
              <svg className="w-16 h-16 text-green-500 mb-4 animate-ping" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 12l2 2 4-4" />
              </svg>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Congratulations!</h2>
              <p className="text-lg text-gray-700 mb-4">You have killed all enemies!</p>
              <button
                ref={playAgainButtonRef}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded focus:ring-4 focus:ring-amber-300 focus:outline-none"
                onClick={() => window.location.reload()}
              >
                Play Again
              </button>
            </div>
          </div>
        )}


      </div>

    </div>

  );
}

export default App;
