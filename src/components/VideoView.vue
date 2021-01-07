<template>
  <div class="result-v" id="view">
    <img class="view-bg" src="../assets/info-bg.png" alt="">

    <div class="view__wrapper" id="video__wrapper">
      
      <div class="video__wrapper" v-show="fileName && !videoFinished">
        <div class="vid-wrap" v-show="videoExist" >
          <video id="vid" :src="fileName" poster="../assets/poster.jpg"></video>
          <div class="play" @click="play()" id="play-btn">
            <img src="../assets/play.png" alt="">
          </div> 
        </div>
         
        <button v-show="videoExist" @click="skip" id="skip"><span>Пропустить</span></button>

        <div class="title__wrapper" v-show="!videoExist">
          <div class="title__white">Коллега отправил тебе персональную видео-открытку. Она будет готова через пару минут.</div>
          <div class="title__yellow">Дождись, оно того стоит!&#128521;</div>
        </div>

      </div>

      <h1 v-if="videoFinished">C Новым годом!</h1>
      <img class="final-gift" v-if="videoFinished" src="../assets/gift-b.svg" alt="">
      <div class="video__another" v-if="videoFinished">
        <a type="submit" href="http://dedmoroz-rt.com/"><span>Cоздать видео-поздравление для коллеги</span></a>
      </div>
    </div>
    

  </div>
</template>

<script>
export default {
  name: 'VideoView',
  data() {
    return {
      fileName: undefined,
      videoFinished: false,
      videoExist: false
    }
  },
  mounted(){

    if(window.innerWidth > 992){
      const wrapper =  document.getElementById('video__wrapper').offsetWidth;
      console.log(wrapper * 0.5625);
      document.getElementById('vid').style.height = (Math.ceil(wrapper * 0.5625) - 110) + 'px';
    }else{
      const wrapper =  document.getElementById('video__wrapper').offsetWidth;
      console.log(wrapper * 0.5625);
      document.getElementById('vid').style.height = (Math.ceil(wrapper * 0.5625) - 5) + 'px';
    }
    

    function reportWindowSize() {
      if(window.innerWidth > 992){
        const wrapper =  document.getElementById('video__wrapper').offsetWidth;
        document.getElementById('vid').style.height = (Math.ceil(wrapper * 0.5625) - 110) + 'px';
      }else{
        const wrapper =  document.getElementById('video__wrapper').offsetWidth;
        document.getElementById('vid').style.height = (Math.ceil(wrapper * 0.5625) - 5) + 'px';
      }
      
    }
    window.addEventListener('resize', reportWindowSize);

    window.loadedData = false;

    document.getElementById('vid').addEventListener('loadeddata', () => {

      if(!window.loadedData){
        console.log('loaded');
        window.loadedData = true;
        this.videoExist = true;
      }
      
    });
    document.getElementById('vid').addEventListener('error', () => {
      console.log('error');

      setTimeout(() => {

        this.videoExist = false;
        
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const video = urlParams.get('video')
        let sub = urlParams.get('sub')
        
        console.log(sub);
        if(sub == 's1'){
          sub = 's2';
        }else if(sub == 's5'){
          sub = 's3';
        }else if(sub == 's6'){
          sub = 's4';
        }

        this.fileName = '';
        this.fileName = window.location.origin.replace('http://', `http://${sub}.`).replace('https://', `https://${sub}.`) + '/out/' + video;
        // http://localhost:8080/videoview?video=2020-12-13_15-19-58-711.mp4 // window.location.origin
        document.getElementById('vid').load();

        // http://dedmoroz-rt.com/out/
      }, 5000);
    });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const video = urlParams.get('video');
    let sub = urlParams.get('sub');

    const allowed = ['s1', 's2', 's3', 's4', 's5', 's6'];
    let isNew = false;

    allowed.forEach(item => {
      if(sub == item){
        isNew = true;
      }
    });
    if( !isNew ){
      window.location.href = 'https://dedmoroz-rt.com/';
    }

    console.log(video);
    if(sub == 's1'){
      sub = 's2';
    }else if(sub == 's5'){
      sub = 's3';
    }else if(sub == 's6'){
      sub = 's4';
    }
    this.fileName = window.location.origin.replace('http://', `http://${sub}.`).replace('https://', `https://${sub}.`) + '/out/' + video;
    document.getElementById('vid').load();
    
    if(this.getOS() === 'iOS'){
      setTimeout(() => {
        document.getElementById('vid').load();
      }, 1500);
      // let http = new XMLHttpRequest(); 
      // http.open('HEAD', window.location.origin.replace('http://', `http://${sub}.`).replace('https://', `https://${sub}.`) + '/out/' + video, false); 
      // http.send(); 
      // if (http.status === 200) { 
      //     // output.innerHTML = "File exists"; 
      //     this.fileName = window.location.origin.replace('http://', `http://${sub}.`).replace('https://', `https://${sub}.`) + '/out/' + video;
      //     window.loadedData = true;
      //     this.videoExist = true;
      // } else { 
      //     // output.innerHTML = "File doesn't exists"; 
      // } 
    }
    
  },
  methods: {
    play(){
      document.getElementById('vid').play();
      document.getElementById('video__wrapper').classList.add('no-after');
      document.querySelector('#play-btn').style.display = 'none'; 
      // document.getElementById('pause').style.display = 'flex';
      document.getElementById('vid').addEventListener('ended', () => {
        this.videoFinished = true;
      });
    },
    skip(){
      document.getElementById('vid').pause();
      this.videoFinished = true;
    },
    getOS() {
      var userAgent = window.navigator.userAgent,
          platform = window.navigator.platform,
          macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
          windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
          iosPlatforms = ['iPhone', 'iPad', 'iPod'],
          os = null;

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
      } else if (/Android/.test(userAgent)) {
        os = 'Android';
      } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
      }

      return os;
    }
  }
}
</script>

<style>
#view{
  /* padding-top: 15vh; */
}
@media(max-width: 520px){
  #view{
    /* padding-top: 30vh; */
  }
}
#view h1{
  color: #273a65;
  text-align: center;
  font-size: 34px;
  position: relative;
  z-index: 5;
}
#view .view-bg{
  position: absolute;
  width: 110%;
  top: 0;
}
@media(max-width: 992px){
  #view .view-bg{
    position: absolute;
    top: 0;
    opacity: 0;
  }
}
@media(max-width: 640px){
  #view .view-bg{
    transform: scale(1.5) translateY(10%);
  }
}
@media(max-width: 490px){
  #view .view-bg{
    /* transform: scale(2); */
  }
}
.view{
  
}
.view__wrapper{
  width: 100%;
  /* position: absolute; */
  padding: 2rem;
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  top: 0;
  left: 0;

  flex-direction: column;
  align-items: center;
  min-height: 64vh;
  justify-content: space-around;
}
@media(max-width: 992px){
  .view__wrapper{
    padding: 1rem;
    position: relative;
    background: url(/img/info-bg.401cd4df.png);
    background-size: cover;
    background-position: center;
    padding: 31px 10px;
  }
}
.result-v{
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
@media(max-width: 992px){
  .result-v{
    position: relative;
    padding: 30px 5px;
    height: auto;
  }
}
.result-v video{
  max-width: 94%;
  object-fit: cover;
  width: 100%;
  height: auto;
}
@media(max-width: 992px){
  .result-v video{
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
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
}

/*  */
.video__wrapper{
  width: 96%;
  display: flex;
  justify-content: center;
  height: auto;
  margin: 0 auto;
  position: relative;
  text-align: center;
  flex-direction: column;

  padding-top: 5vh;
  
}
@media(max-width: 992px){
  .video__wrapper{
    width: 100%;
    margin-bottom: 2rem;

    padding-top: 2vh;
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
  .result-v button{
    position: relative;
    background: transparent;
    border: none;
    padding: 0px;
    cursor: pointer;
    margin: 0 auto;
    display: block;
  }

  /*  */
  .result-v button:hover span{
    transform: translateY(2px);
  }

  /*  */
  .result-v a{
    display: flex;
    justify-content: center;
    text-decoration: none;
    position: relative;
  }
  .result-v a span{
    border-radius: 18px;
    background: #ff4e00;
    border: 0px solid;
    color: white;
    font-size: 34px;
    padding: 8px 20px;
    position: relative;
    z-index: 15;
    display: flex;
    transition: transform .2s;
    text-align: center;
    display: flex;
    width: 100%;
    justify-content: center;
  }
  @media(max-width: 1200px){
    .result-v a span{
      font-size: 34px;
    }
  }
  @media(max-width: 560px){
    .result-v a span{
      font-size: 28px;
    }
  }

  /*  */
  .result-v a::after{
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

  #view .title__wrapper{
    font-size: 34px;
  }
.header__title img{
  width: 100%;
}
#view .title__white{
  white-space: normal;
  color: #273a65;
}
#view .title__yellow{
  white-space: normal;
  color: #ff4e00;
}
@media(max-width: 768px){
  #view .title__wrapper{
    font-size: 29px;
  }
  .header__title img{
    transform: scale(1.5);
    z-index: -1;
  }
}
.final-gift{
  position: absolute;
  max-width: 50%;
  margin: 0 auto;
  display: block;
  left: 0;
  right: 0;
  top: 60px;
}
@media(max-width: 992px){
  .final-gift{
    top: 36px;
    width: 100%;
    max-width: 79%;
  }
}

/*  */
.video__another{
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.video__another a{
  display: block;
  max-width: 80%;
  margin: 0 auto;
}
@media(max-width: 992px){
  .video__another{
    margin-top: 350px; 
  }
  .video__another a{
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }
}
@media(max-width: 560px){
  .video__another{
    margin-top: 50px;
    max-width: 100%;
  }
}

#skip{
  margin-top: 25px;
}
#skip span{
  border-radius: 13px;
  background: #ff4e00;
  border: 0 solid;
  color: #fff;
  font-size: 22px;
  padding: 8px 20px;
  position: relative;
  z-index: 15;
  display: flex;
  transition: transform .2s;
}
#skip:after {
    content: "";
    position: absolute;
    z-index: 5;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 35px;
    background: #ba3704;
    border-radius: 13px;
}
.vid-wrap{
  position: relative;
}
/* .vid-wrap::before{
  content: '';
  width: 100%;
  height: 100%;
  display: block;
  background: rgba(39,58,101,.6);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
} */
</style>