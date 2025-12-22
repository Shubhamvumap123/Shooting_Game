
import './App.css';
import { useEffect, useRef, useState} from 'react';
import gun from './Target/gun.png';
import target from './Target/TargetData.';

// Move image creation outside component to avoid re-creation on every render
const playerImage = new Image();
playerImage.src = gun;

function App() {
  const [showGuide, setShowGuide] = useState(true);
  const [showWin, setShowWin] = useState(false);
  const canvasRef = useRef(null);

  // Game state refs to persist across renders without causing re-renders
  const gameState = useRef({
    canvas: null,
    ctx: null,
    damage: 1,
    width: 300,
    height: 150,
    player_x: (300 / 2) - 25,
    player_y: 150 - 25,
    player_w: 20,
    player_h: 20,
    bullet: [],
    rightKey: false,
    leftKey: false,
    upKey: false,
    downKey: false,
    BullWidth: 3,
    BullHeight: 7
  });

  function backgroundRemove() {
    const { ctx, width, height } = gameState.current;
    if (ctx) ctx.clearRect(0, 0, width, height);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    gameState.current.canvas = canvas;
    gameState.current.ctx = ctx;

    // Performance optimization: Use requestAnimationFrame instead of setInterval
    // This syncs with browser refresh rate (usually 60fps) and pauses when tab is inactive
    let animationFrameId;

    const renderLoop = () => {
      Looping();
      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    // Start the loop
    animationFrameId = window.requestAnimationFrame(renderLoop);

    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawplayer() {
    let state = gameState.current;
    if (state.rightKey) state.player_x += 3;
    else if (state.leftKey) state.player_x -= 3;
    if (state.upKey) state.player_y -= 3;
    else if (state.downKey) state.player_y += 3;

    // Boundaries
    if (state.player_x <= 0) state.player_x = 0;
    if ((state.player_x + state.player_w) >= state.width) state.player_x = state.width - state.player_w;
    if (state.player_y <= 0) state.player_y = 0;
    if ((state.player_y + state.player_h) >= state.height) state.player_y = state.height - state.player_h;

    if (state.ctx) state.ctx.drawImage(playerImage, state.player_x, state.player_y, state.player_w, state.player_h);
  }

 //Bullete Create
 function drawbullet() {
  const { bullet, ctx } = gameState.current;
  if (bullet.length)
    for (var i = 0; i < bullet.length; i++) {
      if (ctx) {
        ctx.fillStyle = 'FireBrick';
        ctx.fillRect(bullet[i][0], bullet[i][1], bullet[i][2], bullet[i][3])
      }
    }   
}

//Bullet Move 
  function movebullet() {
    const { bullet } = gameState.current;
    for (var i = 0; i < bullet.length; i++) {
      if (bullet[i][1] > -11) {
        bullet[i][1] -= 10;
      } else if (bullet[i][1] < -10) {
        bullet.splice(i, 1);
      }
    }
  }

// Check for Bullet Collide
   function checkcolidewith(target){
      const { bullet } = gameState.current;
      return bullet.some((bull) => {
        if (collideWith(bull,target) === true) {
          bullet.splice(bullet.indexOf(bull), 1);
          return true;
        }
       return false
      })
   }

   //Collide happen conditions
 function collideWith(Bullet,Enemy) 
 {  
    const { BullWidth, BullHeight, damage } = gameState.current;
    if (
      Bullet[0] < Enemy.x + Enemy.width &&
      Bullet[0] + BullWidth > Enemy.x &&
      Bullet[1] < Enemy.y + Enemy.height &&
      Bullet[1] + BullHeight > Enemy.y
   ){
      Enemy.takeDamage(damage);
      return true
    }
    return false;
  }

  //loop according to working
  function Looping(){     
  const { ctx } = gameState.current;
  backgroundRemove();
  movebullet();
  drawplayer();
  drawbullet();
  target.forEach((tar) =>{
    if (checkcolidewith(tar)) {
      if (tar.health <= 0) {
        const index = target.indexOf(tar);
        target.splice(index, 1);
      }
    } else {
      if (ctx) tar.draw(ctx);
    }
  });

  // Show win animation if all targets are killed
  if (target.length === 0 && !showWin) {
    setShowWin(true);
  }
}

  function keyDown(e) {
    const state = gameState.current;
    if (e.code === "ArrowRight") state.rightKey = true;
    else if (e.code === "ArrowLeft") state.leftKey = true;
    if (e.code === "ArrowUp") state.upKey = true;
    else if (e.code === "ArrowDown") state.downKey = true;
    if (e.key === "Enter" ){
      state.bullet.push([state.player_x + 7 , state.player_y , state.BullWidth, state.BullHeight]);
    }
  }
 
  function keyUp(e) {
    const state = gameState.current;
    if (e.code === "ArrowRight") state.rightKey = false;
    else if (e.code === "ArrowLeft") state.leftKey = false;
    if (e.code === "ArrowUp") state.upKey = false;
    else if (e.code === "ArrowDown") state.downKey = false;
  }

  return (
    <div className=' bg-gray-900 '>
      {/* <div flex items-center justify-center>
       <div class="text-center text-amber-300 ">
        <h1 className='italic font-bold text-5xl'>Gun_Shooter_Game</h1>
       </div>
      </div> */}

    <div className='flex items-center justify-center h-screen'>
      <canvas className='w-full h-full rounded-3xl'style={{
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: "url(/Image/Anime.gif)",
                    }} ref={canvasRef} >
       </canvas>
       {/* <div className='w-10'></div> */}
       {/* <div className='w-60 h-96 md:w-1/2 md:h-2/3 bg-white shadow-2xl rounded-3xl flex items-center justify-center text-left'    >
  
       <div className='overflow-scroll md:overflow-y-scroll md:mt-7 w-3/4 h-full rounded-3xl '>
                      <h1 className='italic font-bold text-sm md:text-2xl'>All Instruction are achive BY press Keyboard keys</h1>
                      <h1 className='italic font-bold text-xs md:text-lg mt-4'>"Top": Move Gun to up derection</h1>
                      <h1 className='italic font-bold text-xs md:text-lg  '>"Down": Move Gun to down derection</h1>
                      <h1 className='italic font-bold text-xs md:text-lg '>"Left": Move Gun to left derection</h1>
                      <h1 className='italic font-bold text-xs md:text-lg '>"Right": Move Gun to right derection</h1>
                      <h1 className='italic font-bold text-xs md:text-lg '>If We click on "Enter" Button Gun will Fire .</h1>
                      <h1 className='italic font-bold text-xs md:text-lg '>Gun only can Move inside a context</h1>
       </div>
       </div> */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 md:w-96 text-gray-800 relative">
            <h2 className="text-xl font-bold mb-2 text-center text-amber-600">How to Play</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
              <li>Use <span className="font-semibold">Arrow Keys</span> to move the gun:
                <ul className="pl-4 list-[circle]">
                  <li><b>Up</b>: Move gun up</li>
                  <li><b>Down</b>: Move gun down</li>
                  <li><b>Left</b>: Move gun left</li>
                  <li><b>Right</b>: Move gun right</li>
                </ul>
              </li>
              <li>Press <span className="font-semibold">Enter</span> to fire.</li>
              <li>The gun can only move inside the canvas area.</li>
              <li>Hit all targets to win!</li>
            </ul>
            <button
              className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowGuide(false)}
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
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded"
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
