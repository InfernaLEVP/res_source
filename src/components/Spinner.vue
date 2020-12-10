<template>
  <div class="spinner">
    <div class="spinner__image">
      <img src="../assets/spinner.png" alt="">
    </div>

    <div class="spinner__text">
      <p>Минуточку!</p>
      <p>Мы создаем волщебство</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.spinner{

}
.spinner__image{
  max-width: 25vw;
  margin: 0 auto;
  animation: spinner;
  animation-duration: 6s;
  animation-iteration-count: infinite;
}
@media(max-width: 992px){
  .spinner__image img{
    position: relative!important;
  }
}
.spinner__text{
  color: #fff;
  white-space: nowrap;
  text-align: center;
  font-size: 2rem;
  line-height: 1;
}
.spinner__text p {
  margin: 0;
}
.spinner__text p:first-child{
  margin-bottom: 10px;
  margin-top: 55px;
  color: #ffbd00;
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>