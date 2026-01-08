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
    player_x = (LOGICAL_WIDTH / 2) - 25, player_y = LOGICAL_HEIGHT - 25, player_w = 20, player_h = 20,
    player_angle = 0; // Rotational angle in radians

  let bullet = [], // Now stores objects: {x, y, vx, vy, angle}
      rightKey = false, leftKey = false, upKey = false, downKey = false,
      qKey = false, eKey = false; // Rotation keys

  let BullWidth = 3;
  let BullHeight = 7;
  let playerImage = new Image();
  playerImage.src = gun;

  // Starfield initialization
  const stars = useRef([]);
  // Explosions initialization
  const explosions = useRef([]);

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
    ctx.fillStyle = "white"; // Set once to avoid parsing color string 50x per frame

    // Hoist Date.now() out of the loop (50 fewer system calls per frame)
    const now = Date.now();

    stars.current.forEach(star => {
      ctx.beginPath();
      // Use globalAlpha instead of parsing rgba string (faster)
      ctx.globalAlpha = star.alpha;
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
      star.y += Math.sin(now * star.driftSpeed) * star.driftAmplitude;

      if (star.x < 0) {
        star.x = LOGICAL_WIDTH;
        star.y = Math.random() * LOGICAL_HEIGHT;
      }
    });
    ctx.restore();
  }

  function drawExplosions() {
    ctx.save();
    explosions.current.forEach((exp, index) => {
        ctx.beginPath();
        ctx.arc(exp.x, exp.y, exp.radius, 0, Math.PI * 2);
        ctx.fillStyle = exp.color || `rgba(0, 255, 0, ${exp.alpha})`; // Use random color
        ctx.globalAlpha = exp.alpha; // Use global alpha for proper fading
        ctx.shadowBlur = 20;
        ctx.shadowColor = exp.color || "lime";
        ctx.fill();

        // Animate
        exp.radius += exp.expandRate || 2; // Expand
        exp.alpha -= exp.fadeRate || 0.05; // Fade out

        // Remove if faded
        if (exp.alpha <= 0) {
            explosions.current.splice(index, 1);
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
      if (!rect) return;
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
  }

  function drawplayer() {
    let moveX = 0;
    let moveY = 0;

    if (rightKey) moveX = 1;
    else if (leftKey) moveX = -1;
    if (upKey) moveY = -1;
    else if (downKey) moveY = 1;

    // Rotation Logic
    if (qKey) player_angle -= 0.07; // Rotate Left
    if (eKey) player_angle += 0.07; // Rotate Right

    // Normalize speed for diagonal movement
    if (moveX !== 0 && moveY !== 0) {
        const factor = 1 / Math.sqrt(2);
        moveX *= factor;
        moveY *= factor;
    }

    player_x += moveX * 3;
    player_y += moveY * 3;

    // Boundaries
    if (player_x <= 0) player_x = 0;
    if ((player_x + player_w) >= LOGICAL_WIDTH) player_x = LOGICAL_WIDTH - player_w;
    if (player_y <= 0) player_y = 0;
    if ((player_y + player_h) >= LOGICAL_HEIGHT) player_y = LOGICAL_HEIGHT - player_h;

    // Save context for rotation
    ctx.save();
    
    // Move pivot to center of player
    const centerX = player_x + player_w / 2;
    const centerY = player_y + player_h / 2;
    
    ctx.translate(centerX, centerY);
    ctx.rotate(player_angle);
    ctx.translate(-centerX, -centerY);

    // Draw thruster at the bottom center of the ship (relative to rotation)
    drawThruster(centerX, player_y + player_h - 5, 6, 25);

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
        const b = bullet[i];
        
        ctx.save();
        
        // Translate to bullet position for rotation
        const bCenterX = b.x + 5; // Half width (10/2)
        const bCenterY = b.y + 10; // Half height (20/2)
        
        ctx.translate(bCenterX, bCenterY);
        ctx.rotate(b.angle);
        ctx.translate(-bCenterX, -bCenterY);

        ctx.shadowColor = "rgba(255, 255, 0, 0.5)"; // Slight glow for bullets
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.drawImage(bulletSprite, b.x, b.y, 10, 20); 
        ctx.restore(); 
      }
  }

  // Bullet Move
  function movebullet() {
    // Iterate backwards to safely remove elements without index shifting issues
    for (var i = bullet.length - 1; i >= 0; i--) {
        const b = bullet[i];
        
        b.x += b.vx;
        b.y += b.vy;

        // Boundary check (extended slightly to ensure full exit)
        if (b.x < -20 || b.x > LOGICAL_WIDTH + 20 || b.y < -20 || b.y > LOGICAL_HEIGHT + 20) {
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
      Bullet.x < Enemy.x + Enemy.width &&
      Bullet.x + 10 > Enemy.x && // Bullet width is ~10
      Bullet.y < Enemy.y + Enemy.height &&
      Bullet.y + 20 > Enemy.y   // Bullet height is ~20
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
  drawExplosions();
  drawPowerups(); // Draw Powerups
  handleMachineGun(); // Check auto fire
  movebullet();
  drawplayer();
  drawbullet();
  target.forEach((tar) =>{
    tar.update(LOGICAL_WIDTH, LOGICAL_HEIGHT);
    tar.draw(ctx);
    if (checkcolidewith(tar)) {
      if (tar.health <= 0) {
        // Trigger Explosion
        explosions.current.push({
            x: tar.x + tar.width / 2,
            y: tar.y + tar.height / 2,
            radius: 5, 
            alpha: 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            expandRate: Math.random() * 2 + 1,
            fadeRate: Math.random() * 0.05 + 0.02
        });
        
        // Spawn Powerup (20% chance)
        if (Math.random() < 0.2) {
            const type = Math.random() < 0.5 ? 'tripleShot' : 'machineGun';
            powerups.current.push({
                x: tar.x + tar.width / 2,
                y: tar.y + tar.height / 2,
                type: type,
                color: type === 'tripleShot' ? 'cyan' : 'red'
            });
        }

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
    
    // Party Animation (Fireworks on win)
    if (showWin) {
        if (Math.random() < 0.1) { // 10% chance per frame to spawn firework
            explosions.current.push({
                x: Math.random() * LOGICAL_WIDTH,
                y: Math.random() * LOGICAL_HEIGHT,
                radius: 5, 
                alpha: 1, 
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                expandRate: Math.random() * 2 + 1,
                fadeRate: Math.random() * 0.05 + 0.02
            });
        }
    }
  }

  // Powerup State
  const powerups = useRef([]);
  const activeEffects = useRef({ tripleShot: false, machineGun: false });
  // Initializing space key tracking for machine gun
  const spacePressed = useRef(false);

  function drawPowerups() {
      ctx.save();
      powerups.current.forEach((p, index) => {
          // Move
          p.y += 1.5;

          // Draw
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.fill();
          
          // Icon (Letter)
          ctx.fillStyle = "white";
          ctx.font = "bold 8px Arial";
          ctx.textAlign = "center";
          ctx.fillText(p.type === 'tripleShot' ? 'T' : 'M', p.x, p.y + 3);

          // Remove if off screen
          if (p.y > LOGICAL_HEIGHT + 10) {
              powerups.current.splice(index, 1);
          }

          // Collision with Player
          // Simple box/circle collision
          const dist = Math.hypot(p.x - (player_x + player_w/2), p.y - (player_y + player_h/2));
          if (dist < 15) {
              activatePowerup(p.type);
              powerups.current.splice(index, 1);
          }
      });
      ctx.restore();
  }

  function activatePowerup(type) {
      if (type === 'tripleShot') {
          activeEffects.current.tripleShot = true;
          setTimeout(() => activeEffects.current.tripleShot = false, 5000);
      } else if (type === 'machineGun') {
          activeEffects.current.machineGun = true;
          setTimeout(() => activeEffects.current.machineGun = false, 5000);
      }
  }

  // Machine Gun Logic (Auto Fire)
  const lastShotTime = useRef(0);
  function handleMachineGun() {
      if (activeEffects.current.machineGun && spacePressed.current) {
          const now = Date.now();
          if (now - lastShotTime.current > 100) { // Fire every 100ms
              fireBullet();
              lastShotTime.current = now;
          }
      }
  }

  function fireBullet() {
        // Calculate nose position relative to center
        const centerX = player_x + player_w / 2;
        const centerY = player_y + player_h / 2;
        const speed = 10;
        
        const angles = [player_angle];
        if (activeEffects.current.tripleShot) {
            angles.push(player_angle - 0.3); // Left spread
            angles.push(player_angle + 0.3); // Right spread
        }

        angles.forEach(angle => {
            const vx = Math.sin(angle) * speed;
            const vy = -Math.cos(angle) * speed;
            
            bullet.push({
                x: centerX - 5, 
                y: centerY - 10,
                vx: vx,
                vy: vy,
                angle: angle
            });
        });
  }

  function keyDown(e) {
    if (!isGameActive.current) return; // Block input if game not active

    if (e.code === "ArrowRight" || e.code === "KeyD") rightKey = true;
    else if (e.code === "ArrowLeft" || e.code === "KeyA") leftKey = true;
    if (e.code === "ArrowUp" || e.code === "KeyW") upKey = true;
    else if (e.code === "ArrowDown" || e.code === "KeyS") downKey = true;
    if (e.code === "KeyQ") qKey = true;
    if (e.code === "KeyE") eKey = true;

    if (e.key === "Enter" || e.code === "Space") {
        spacePressed.current = true;
        if (!activeEffects.current.machineGun) {
            fireBullet(); // Manual fire if no machine gun
        }
    }
  }

  function keyUp(e) {
    if (e.code === "ArrowRight" || e.code === "KeyD") rightKey = false;
    else if (e.code === "ArrowLeft" || e.code === "KeyA") leftKey = false;
    if (e.code === "ArrowUp" || e.code === "KeyW") upKey = false;
    else if (e.code === "ArrowDown" || e.code === "KeyS") downKey = false;
    if (e.code === "KeyQ") qKey = false;
    if (e.code === "KeyE") eKey = false;
    if (e.key === "Enter" || e.code === "Space") {
        spacePressed.current = false;
    }
  }

  const startGame = () => {
    setShowGuide(false);
    isGameActive.current = true;
  };

  return (
    <div className=' bg-gray-900 '>
      <div className='flex items-center justify-center h-screen'>
        <canvas
          className='w-full h-full rounded-3xl'
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${spaceBg})`,
          }}
          ref={canvasRef}
          role="img"
          aria-label="Space shooter game canvas. Use arrow keys or WASD to move, Space or Enter to fire."
        >
        </canvas>

        {showGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mission-brief-title"
          >
            <div className="bg-gray-800 bg-opacity-80 border border-gray-600 rounded-2xl shadow-2xl p-6 w-80 md:w-96 text-white relative">
              <h2 id="mission-brief-title" className="text-2xl font-bold mb-4 text-center text-amber-400 uppercase tracking-wider">Mission Brief</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-300">
                <li><span className="font-semibold text-white">Navigation:</span>
                  <ul className="pl-4 mt-1 space-y-1 list-none">
                    <li><span className="text-amber-500">W / Up</span> : Move Up</li>
                    <li><span className="text-amber-500">S / Down</span> : Move Down</li>
                    <li><span className="text-amber-500">A / Left</span> : Move Left</li>
                    <li><span className="text-amber-500">D / Right</span> : Move Right</li>
                    <li><span className="text-amber-500">Q / E</span> : Rotate Ship</li>
                  </ul>
                </li>
                <li className="mt-2">Press <span className="font-semibold text-white">Enter / Space</span> to Fire.</li>
                <li>Eliminate all targets to win.</li>
              </ul>
              <button
                ref={startButtonRef}
                className="mt-6 w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition hover:scale-105 focus:ring-4 focus:ring-amber-500/50 focus:outline-none"
                onClick={startGame}
              >
                ENGAGE
              </button>
            </div>
          </div>)}
        {showWin && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="victory-title"
          >
            <div className="bg-gray-800 bg-opacity-90 border-2 border-green-500/50 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.3)] p-8 flex flex-col items-center animate-bounce">
              <svg className="w-20 h-20 text-green-400 mb-4 animate-pulse drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 12l2 2 4-4" />
              </svg>
              <h2 id="victory-title" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2">VICTORY</h2>
              <p className="text-lg text-gray-300 mb-6">Sector Clear. All targets neutralized.</p>
              <button
                ref={playAgainButtonRef}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 focus:ring-4 focus:ring-green-500/50 focus:outline-none"
                onClick={() => window.location.reload()}
              >
                Replay Mission
              </button>
            </div>
          </div>
        )}


      </div>

    </div>

  );
}

export default App;
