<template>
  <div id="app">
    <div class="app__balls"><img src="./assets/top-right.png" alt=""></div>
    <div class="app__lines"><img src="./assets/left-btm.png" alt=""></div>
    <div class="container">
      <header class="header">
        <div class="logo">
          <img src="./assets/logo.png" alt="">
        </div>
        <div class="header__title title">
          <div class="title__white">Отправь коллеге</div>
          <div class="title__yellow">Новогоднюю видео-открытку!</div>
        </div>
    </header>
    <main class="container">
      <InfoBlock />
    </main>
    </div>
    
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import InfoBlock from './components/InfoBlock.vue';


export default {
  name: 'App',
  components: {
    HelloWorld,
    InfoBlock,
  }
}
</script>

<style>
@font-face{
  font-family: "RostelecomBasis-Bold";
  src: url("/fonts/RostelecomBasis-Bold.woff") format("woff"), /* Modern Browsers */
    url("/fonts/RostelecomBasis-Bold.woff2") format("woff2"); /* Modern Browsers */
  font-weight: normal;
  font-style: normal;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}

img{
  max-width: 100%;
}
body{
  font-family: "RostelecomBasis-Bold", sans-serif;
  margin: 0;
  background-image: url(./assets/bg.jpg);
  min-height: 100vh;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  padding-top: 20px;
  position: relative;
  min-height: 100vh;
}
@media(max-width: 992px){
  #app{
    background-position: 20% 50%;
  }
}

.container{
  max-width: 70vw;
  margin: 0 auto;
}
@media(max-width: 992px){
   .container {
    max-width: 96vw;
  }
}

.logo{
  max-width: 220px;
}
.app__balls{
  position: absolute;
  top: 0;
  right: 8%;
  display: flex;
  pointer-events: none;
  max-width: 18%;
  align-items: flex-start;
}
.app__lines{
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  pointer-events: none;
  max-width: 18%;
  align-items: flex-start;
}


.header__title{
  margin-top: 3rem;
  font-size: 60px;
  text-align: center;
}
@media (max-width: 1500px) {
  .header__title {
    font-size: 50px;
  }
}
@media (max-width: 1400px) {
  .header__title {
    font-size: 45px;
  }
}
@media (max-width: 1300px) {
  .header__title {
    font-size: 40px;
  }
}
@media (max-width: 1200px) {
  .header__title {
    font-size: 38px;
  }
}
@media(max-width: 992px){
   .header__title {
    font-size: 28px;
  }
}
@media(max-width: 370px){
   .header__title {
    font-size: 22px;
  }
}

.title__white{
  white-space: nowrap;
}
.title__yellow{
  color: #ffbd00;
  white-space: nowrap;
}
@media(max-width: 768px){
   .title__white {
    white-space: normal;
  }
  .title__yellow{
    white-space: normal;
  }
}

main{
  padding-bottom: 15vh;
}

@media screen and (max-width: 767px) {
  input, select, textarea {
    font-size: 16px!important;
  }
}
</style>
