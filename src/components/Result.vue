<template>
  <div class="result">

    <div class="video__wrapper" id="video__wrapper">
      <!-- <video id="vid" :src="`http://dedmoroz-rt.com/out/${fileName}`" poster="../assets/poster.jpg"></video>
      <div class="play" @click="play()" id="play-btn">
        <img src="../assets/play.png" alt="">
      </div> -->
      <h1>Твоё видео будет готово через пару минут и доступно по ссылке</h1>
    </div>

    <div class="video__link">
      <div class="link__text"><textarea readonly id="link" v-model="file"></textarea></div>
      <div class="link__button" @click="copy()">Cкопировать ссылку</div>

      <div class="copied-message">Скопировано</div>
    </div>

    <div class="video__another">
      <button type="submit" onclick="window.location.reload()"><span>Создать еще одну новогоднюю видео-открытку</span></button>
    </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      file: '',
    }
  },
 props: {
   fileName: String,
   domain: String
 },
 mounted(){
  // const wrapper =  document.getElementById('video__wrapper').offsetWidth;
  // console.log(wrapper * 0.5625);
  // document.getElementById('vid').style.height = (wrapper * 0.5625) + 'px';

  // function reportWindowSize() {
  //   const wrapper =  document.getElementById('video__wrapper').offsetWidth;
  //   document.getElementById('vid').style.height = (wrapper * 0.5625) + 'px';
  // }
  // window.addEventListener('resize', reportWindowSize);

  this.file += window.location.origin + '/videoview?video=' + this.fileName + '&sub=' + this.domain;
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
    // document.getElementById('pause').style.display = 'flex';
   }
 }
}
</script>

<style>
.result{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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
    height: auto;
  }
}
.result video{
  max-width: 100%;
  object-fit: cover;
}
@media(max-width: 992px){
  .result video{
    max-width: 100%;
    object-fit: contain;
  }
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
  text-align: center;
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
  display: none;
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
    width: 100%;
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
    z-index: 666;
    background: rgba(255,255,255,.95);
    padding: 8px 10px;
    border-radius: 8px;
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
    display: flex;
    align-items: center;
  }

  .link__text{
    flex: 1;
  }
  @media(max-width: 992px){
    .link__text{
      width: 100%;
    }
  }

  .dis{
    /* display: block; */
    transform: translateY(-25%);
    opacity: 1;
  }
  .no-after::after{
    display: none!important;
  }
  .result textarea{
    resize: none;
    line-height: 1;
    display: flex;
    align-items: center;
  }
</style>