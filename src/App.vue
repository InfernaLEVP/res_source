<template>
  <div id="app">
    <div class="app__balls"><img src="./assets/top-right.png" alt=""></div>
    <div class="app__lines"><img src="./assets/left-btm.png" alt=""></div>
    <div class="container">
      <header class="header">
        <img class="candy candy-1" src="./assets/candy.png" alt="">
        <img class="candy candy-2" src="./assets/candy.png" alt="">
        <img class="snowflake snowflake-1" src="./assets/snowflake.svg" alt="">
        <img class="snowflake snowflake-2" src="./assets/snowflake.svg" alt="">
        <img class="snowflake snowflake-3" src="./assets/snowflake.svg" alt="">
        <img class="tree tree-1" src="./assets/tree.png" alt="">
        <div class="logo">
          <img src="./assets/logo.svg" alt="">
        </div>
        <div :class="['header__title title', isFront ? '' : 'viewpage' ]">
          <div class="title__white">Отправь коллеге</div>
          <div class="title__yellow">новогоднюю видео-открытку!</div>
        </div>
    </header>
    <main class="container">
      <router-view></router-view>
      
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
  },
  computed: {
    isFront(){
      return this.$route.name == 'Home' ? true : false;
    }
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
@font-face{
  font-family: "RostelecomBasis-Light";
  src: url("/fonts/RostelecomBasis-Light.woff") format("woff"), /* Modern Browsers */
    url("/fonts/RostelecomBasis-Light.woff2") format("woff2"); /* Modern Browsers */
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
  padding-top: 65px;
  position: relative;
  min-height: 100vh;
  padding-bottom: 29vh;
  /* overflow: hidden; */
  overflow-x: hidden;
}
@media(max-width: 992px){
  #app{
    background-position: 20% 50%;
    padding-top: 25px;
    background: #273a65;
  }
}

.container{
  max-width: 66vw;
  margin: 0 auto;
}
@media(max-width: 1400px){
   .container {
    max-width: 75vw;
  }
}
@media(max-width: 1300px){
   .container {
    max-width: 80vw;
  }
}
@media(max-width: 1200px){
   .container {
    max-width: 85vw;
  }
}
@media(max-width: 1100px){
   .container {
    max-width: 94vw;
  }
}
@media(max-width: 992px){
   .container {
    max-width: 96vw;
  }
}

.logo{
  max-width: 295px;
}
@media(max-width: 768px){
  .logo{
    max-width: 50%;
  }
}
.app__balls{
  position: absolute;
  top: 0;
  right: 6%;
  display: flex;
  pointer-events: none;
  max-width: 22%;
  align-items: flex-start;
}
.app__lines{
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  pointer-events: none;
  max-width: 26%;
  align-items: flex-start;
}

.header{
  position: relative;
}
.header__title{
  margin-top: 3.5rem;
  line-height: 1.1;
  font-size: 84px;
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
  /* padding-bottom: 15vh; */
}

@media screen and (max-width: 767px) {
  input, select, textarea {
    /* font-size: 16px!important; */
  }
}
.candy{
  position: absolute;
  display: none;
}
.snowflake{
  position: absolute;
  display: none;
}
.tree{
  position: absolute;
  display: none;
}
@media screen and (max-width: 768px) {
  .candy{
    width: 25px;
    display: flex;
  }
  .snowflake{
    width: 25px;
    display: flex;
  }
  .tree{
    width: 25px;
    display: flex;
  }
  .candy-1{
    top: 63%;
    left: 10%;
  }
  .candy-2{
    top: 83px;
    right: 24%;
  }
  .snowflake-1{
    bottom: 0;
    right: 0;
  }
  .snowflake-2{
    bottom: 0;
    left: 0;
  }
  .snowflake-3{
    left: 0;
    right: 0;
    bottom: -18%;
    margin: 0 auto;
  }
  .tree-1{
    right: 0;
    top: 35%;
  }
}
@media(max-width: 600px){
  .candy-1{
    top: 46%;
    left: 5%;
  }
}
.viewpage{
  opacity: 0;
}
</style>
