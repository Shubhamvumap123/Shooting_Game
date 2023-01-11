
import './App.css';
import { useEffect, useRef ,useContext} from 'react';
import target from './Target/TargetData.';
function App() {
  const canvasRef = useRef(null);
  let canvas, ctx,
  damage = 1,
   width = 300,
   height = 150,
  player_x = (width / 2) - 25, player_y = height - 25, player_w = 20, player_h = 20
  let bullet = [],rightKey = false,  leftKey = false, upKey = false,  downKey = false
  let BullWidth = 3
  let BullHeight = 7
  function backgroundRemove() {
    ctx.clearRect(0, 0, width, height); 
  }

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    setInterval(Looping, 20);
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
  }, []);

  function drawplayer() {
    if (rightKey) player_x += 3;
    else if (leftKey) player_x -= 3;
    if (upKey) player_y -= 3;
    else if (downKey) player_y += 3;
    if (player_x <= 0) player_x = 0;
    if ((player_x + player_w) >= width) player_x = width - player_w;
    if (player_y <= 0) player_y = 0;
    if ((player_y + player_h) >= height) player_y = height - player_h;
    ctx.fillStyle = "DarkOrange";
    ctx.fillRect(player_x, player_y, player_w, player_h);
  }

 //Bullete Create
 function drawbullet() {
  if (bullet.length)
    for (var i = 0; i < bullet.length; i++) {
      ctx.fillStyle = 'FireBrick';
      ctx.fillRect(bullet[i][0], bullet[i][1], bullet[i][2], bullet[i][3])
    }   
}

//Bullet Move 
  function movebullet() {
    for (var i = 0; i < bullet.length; i++) {
      if (bullet[i][1] > -11) {
        bullet[i][1] -= 10;
      } else if (bullet[i][1] < -10) {
        console.log(bullet.splice(i, 1))    
        bullet.splice(i, 1);
      }
    }
  }

// Check for Bullet Collide
   function checkcolidewith(target){
      return bullet.some((bull) => {
        console.log(bull)
        if (collideWith(bull,target)==true) {
          bullet.splice(bullet.indexOf(bull), 1);
          return true;
        }
       return false
      })
   }

   //Collide happen conditions
 function collideWith(Bullet,Enemy) 
 {  

    if (
      Bullet[0] < Enemy.x + Enemy.width &&
      Bullet[0] + BullWidth > Enemy.x &&
      Bullet[1] < Enemy.y + Enemy.height &&
      Bullet[1] + BullHeight > Enemy.y
   ){
      Enemy.takeDamage(damage);
      console.log("damage",damage)
      return true
    }
    return false;
  }

  //loop according to working
  function Looping(){     
    backgroundRemove();
    movebullet();
    drawplayer();
    drawbullet();
    target.forEach((tar) =>{
      if (checkcolidewith(tar)) {
        if (tar.health <= 0) {
          const index = target.indexOf(tar);
          target.splice(index, 1);
          console.log(tar.health)
        }
      } else {
        tar.draw(ctx);
      }
    })
  }

  function keyDown(e) {
    if (e.code == "ArrowRight") rightKey = true;
    else if (e.code == "ArrowLeft") leftKey = true;
    if (e.code == "ArrowUp") upKey = true;
    else if (e.code == "ArrowDown") downKey = true;
    if (e.key == "Enter" ){
      bullet.push([player_x + 7 , player_y , BullWidth, BullHeight]);
    }
  }
 
  function keyUp(e) {
    if (e.code == "ArrowRight") rightKey = false;
    else if (e.code == "ArrowLeft") leftKey = false;
    if (e.code == "ArrowUp") upKey = false;
    else if (e.code == "ArrowDown") downKey = false;
  }

  return (
    <div className=' bg-gray-900 '>
      <div flex items-center justify-center>
       <div class="text-center text-amber-300 ">
        <h1 className='italic font-bold text-5xl'>Gun_Shooter_Game</h1>
       </div>

      </div>

    <div className='flex items-center justify-center h-screen'>
      <canvas className='w-1/2 h-2/3 rounded-3xl'style={{
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: "url(/Image/Anime.gif)",
                    }} ref={canvasRef} >
       </canvas>
       <div className='w-10'></div>
       <div className='md:w-1/2 md:h-[40rem] bg-white shadow-2xl rounded-3xl flex items-center justify-center text-center'    >
   <div className='w-1/2 h-full rounded-3xl' style={{
                      backgroundSize: "cover",
                     objectFit:"cover",
                      backgroundImage: "url(/Image/arrows.png)",
                    }}>
                    

                    </div>
       <div className='w-20'></div>
       <div className='w-1/2 h-full rounded-3xl'>
       <h1 className='italic font-bold text-5xl'>All Instruction are achive BY press Keyboard keys</h1>

       <h1 className='italic font-bold text-2xl mt-10'>Top: Move Gun to up derection</h1>
                      <h1 className='italic font-bold text-2xl mt-5 '>Down: Move Gun to down derection</h1>
                      <h1 className='italic font-bold text-2xl mt-5'>Next: Move Gun to left derection</h1>
                      <h1 className='italic font-bold text-2xl mt-5'>Back: Move Gun to right derection</h1>
                      <h1 className='italic font-bold text-2xl mt-5'>If We click on "Enter" Button Gun will Fire .</h1>
                      <h1 className='italic font-bold text-2xl mt-5'>Gun only can Move inside a context</h1>
       </div>
       </div>
    </div>
    </div>

  );
}

export default App;
