<template>
  <div class="result">

    <div class="video__wrapper" id="video__wrapper">
      <video id="vid" src="/videos/sample.mp4" poster="../assets/poster.jpg"></video>
      <div class="play" @click="play()" id="play-btn">
        <img src="../assets/play.png" alt="">
      </div>
      
    </div>

    <div class="video__link">
      <div class="link__text"><input type="text" readonly id="link" :value="`http://161.35.96.151/out/${fileName}`"></div>
      <div class="link__button" @click="copy()">Cкопировать ссылку</div>

      <div class="copied-message">Скопировано</div>
    </div>

    <div class="video__another">
      <button type="submit" @click="window.location.reload()"><span>Создать еще одну новогоднюю видео-открытку</span></button>
    </div>
    
  </div>
</template>

<script>
export default {
 props: {
   fileName: String
 },
 methods: {
   copy(){
     const link = document.querySelector('#link');
     console.log(link);
     link.select();
     document.execCommand('copy');
     document.querySelector('.copied-message').classList.add('dis');
     setTimeout(() => {
       document.querySelector('.copied-message').classList.remove('dis');
     }, 4000);
   },
   play(){
    document.getElementById('vid').play();
    document.getElementById('video__wrapper').classList.add('no-after');
    document.querySelector('#play-btn').style.display = 'none'; 
    document.getElementById('pause').style.display = 'flex';
   }
 }
}
</script>

<style>
.result{
  position: absolute;
  top: 0;
  left: 0;
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
@media(max-width: 992px){
  .result{
    position: relative;
    padding: 40px 20px;
  }
}
.result video{
  max-width: 100%;
  object-fit: cover;
}
.play{
  width: 120px;
  height: 120px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 555;
}

/*  */
.video__wrapper{
  width: 80%;
  display: flex;
  justify-content: center;
  height: auto;
  margin: 0 auto;
  position: relative;
}
@media(max-width: 992px){
  .video__wrapper{
    width: 100%;
    margin-bottom: 2rem;
  }
}
.video__wrapper::after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(39,58,101,.6);
}

/*  */
.video__link{
  background: rgba(255,255,255,.55);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  position: relative;
}
@media(max-width: 992px){
  .video__link{
    margin-bottom: 2rem;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
}

/*  */
/*  */
  .result button{
    position: relative;
    background: transparent;
    border: none;
    padding: 0px;
    cursor: pointer;
    margin: 0 auto;
    display: block;
  }

  /*  */
  .result button:hover span{
    transform: translateY(2px);
  }

  /*  */
  .result button span{
    border-radius: 13px;
    background: #ff4e00;
    border: 0px solid;
    color: white;
    font-size: 22px;
    padding: 8px 20px;
    position: relative;
    z-index: 15;
    display: flex;
    transition: transform .2s;
  }
  @media(max-width: 1200px){
    .result button span{
      font-size: 18px;
    }
  }

  /*  */
  .result button::after{
    content: '';
    position: absolute;
    z-index: 5;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 35px;
    background: #ba3704;
    border-radius: 13px;
  }

  #link{
    border: none;
    background: transparent;
  }
  #link:focus{
    outline: none;
  }
  /*  */
  .copied-message{
    position: absolute;
    bottom: 0%;
    transform: translateY(100%);
    /* display: none; */
    transition: transform .6s, opacity .3s;
    opacity: 0;
    left: 0;
    right: 0;
    text-align: center;
  }

  /*  */
  .link__tex input{
    border: navajowhite;
    background: transparent;
    width: fit-content;
    outline: none;
  }

  /*  */
  .link__button{
    cursor: pointer;
  }

  .dis{
    /* display: block; */
    transform: translateY(-25%);
    opacity: 1;
  }
  .no-after::after{
    display: none!important;
  }
</style>