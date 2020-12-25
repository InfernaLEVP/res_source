<template>
  <div id="info-block" class="info-block">
    <img src="../assets/info-bg.png" alt="" v-if="wait">
    <form action="#" class="form" v-if="wait" v-show="!success" autocomplete="off" @submit="formSend($event)">
      <input autocomplete="false" name="hidden" type="text" style="display:none;">

      <div class="rr">
        <div class="input__inline" style="position: relative;">
          <label for="name">Имя</label>
          <div class="name__wrapper">
            <textarea 
              :class="inputH ? 'fullH' : ''" 
              @focus="nameFocus" 
              @blur="nameUnFocus"
              :value='searchName'
              @input='evt=>searchName=evt.target.value'
              name="name" id="name">

            </textarea>
            <div class="auto" v-if="isFocused">
              <div v-for="item in filteredNames" :key="item.FullName">
                <div @click="setName(item.FullName, item)" class="auto-item">{{item.FullName}}</div>
                <!-- <div @click="setName(short, item)" class="auto-item" v-for="short in item.ShortName.split(', ')" :key="short">
                  {{short}}
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="input__inline sex-input">
          <label for="sex">Пол</label>
          <CustomSelect v-if="sexes"
              :options="sexes"
              :default="{index: 0, Name: 'Выбери из списка'}"
              class="select"
              id="sex-input"
              @input="sexChange($event)"
            />
        </div>
      </div>

      <div class="ll">
        <div class="input__columns">
          <label for="achievements">Главное достижение твоего коллеги в 2020 году</label>
          <CustomSelect v-if="selectedAchievements"
            :options="selectedAchievements"
            :default="{index: 0, Name: 'Выбери из списка'}"
            class="select"
            id="a-input"
            @input="setAchievements($event)"
          />
        </div>

        <div class="input__columns wish-input">
          <label for="achievements">Пожелание</label>
          <CustomSelect v-if="wishes"
            :options="wishes"
            :default="{index: 0, Name: 'Выбери из списка'}"
            class="select"
            id="w-input"
            @input="setWishes($event)"
          />
        </div>
      </div>
      

      <button type="submit"><span>Создать поздравление</span></button>
    </form>
    <Spinner v-if="!wait"/>
    <Result :fileName="resFile" :domain="subDomain" v-if="success"/>
  </div>
</template>

<script>
import CustomSelect from "./CustomSelect.vue";
import Spinner from "./Spinner.vue";
import Result from "./Result.vue";
import _achievements from '../data/male_achievements.json';
import _femAchievements from '../data/female_achievements.json';
import _wishes from '../data/wishes.json';
import _names from '../data/names.json';

export default {
  name: 'InfoBlock',
  data() {
    return {
      form: {
        name: '',
        sex: '',
        achievements: '',
        wishes: ''
      },
      names: undefined,
      sexes: [
        {
          index: 1,
          Name: 'Мужчина'
        },
        {
          index: 2,
          Name: 'Женщина'
        }
      ],
      selectedAchievements: undefined,
      searchName: 'Впиши полное имя коллеги, например, Мария',
      placeholder: `Впиши полное имя коллеги, например, Мария`,
      isFocused: false,
      wait: true,
      success: false,
      resFile: '',
      achievements: undefined,
      femAchievements: undefined,
      wishes: undefined,
      subDomain: undefined
    }
  },
  mounted(){

        this.names = _names;
        this.wishes = _wishes;
        this.achievements = _achievements;
        this.selectedAchievements = this.achievements;
        this.femAchievements = _femAchievements;

    document.addEventListener('click', (e) => {
      
      if(e.target.id !== 'name'){
        if(e.target.classList.contains('auto-item') === false){
          window.app.$children[0].$children[0].isFocused = false;
        }
      }

    });

    // fetch('/data/names.json')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.names = data;
    //     // console.log(data);    
    //   });

    // fetch('/data/wishes.json')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.wishes = data;
    //     // console.log(data);    
    //   });

    // fetch('/data/male_achievements.json')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.achievements = data;
    //     this.selectedAchievements = this.achievements;
    //     // console.log(data);    
    //   });

    // fetch('/data/female_achievements.json')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.femAchievements = data;
    //     // console.log(data);    
    //   });
    
    // const requestNames = new XMLHttpRequest();
    // requestNames.open('GET', '/data/names.json');
    // requestNames.onreadystatechange = () => {
    //   const q = JSON.parse(requestNames.responseText);
    //   this.names = q;
    //   console.log({q})
    // };
    // requestNames.send();

    // // 
    // const requestWishes = new XMLHttpRequest();
    // requestWishes.open('GET', '/data/wishes.json');
    // requestWishes.onreadystatechange = () => {
    //   const q = JSON.parse(requestWishes.responseText);
    //   this.wishes = q;
    // };
    // requestWishes.send();
    // // 
    // const requestMale = new XMLHttpRequest();
    // requestMale.open('GET', '/data/male_achievements.json');
    // requestMale.onreadystatechange = () => {
    //   const q = JSON.parse(requestMale.responseText);
    //   this.achievements = q;
    //   this.selectedAchievements = this.achievements;
    // };
    // requestMale.send();
    // // 
    // const requestFemale = new XMLHttpRequest();
    // requestFemale.open('GET', '/data/female_achievements.json');
    // requestFemale.onreadystatechange = () => {
    //   const q = JSON.parse(requestFemale.responseText);
    //   this.femAchievements = q;
    // };
    // requestFemale.send();
    // // 

  },
  components: {
    CustomSelect,
    Spinner,
    Result,
  },
  methods: {
    log(event) {
      console.log(event);
    },
    setName(name, obj){
      this.searchName = name;
      this.isFocused = false;
      this.form.name = obj;
      this.form.name.actualName = name;
    },
    sexChange(type){
      if(type.index === 2){
        this.selectedAchievements = this.femAchievements;
        this.form.sex = 2;
      }else if(type.index === 1){
        this.selectedAchievements = this.achievements;
        this.form.sex = 1;
      }else{
        this.selectedAchievements = this.achievements;
        this.form.sex = 0;
      }
    },
    setAchievements(item){
      // console.log(`1 ${item}`);
      this.form.achievements = item.index;
    },
    setWishes(item){
      // console.log(`2 ${item}`);
      this.form.wishes = item.index;
    },
    random(min, max){
      return Math.ceil(min + Math.random() * (max - min));
    },
    formSend(e){
      e.preventDefault();

      let valid = true;
      if(this.searchName === ''){
        document.getElementById('name').classList.add('validation-error');
        valid = false;
      }
      if(this.form.sex === 0){
        document.getElementById('sex-input').classList.add('validation-error');
        valid = false;
      }
      if(this.form.achievements === 0){
        document.getElementById('a-input').classList.add('validation-error');
        valid = false;
      }
      if(this.form.wishes === 0){
        document.getElementById('w-input').classList.add('validation-error');
        valid = false;
      }

      if(valid){
        // localhost:9000/render
        if(this.form.name === ''){

          if(this.searchName.replaceAll(' ', '').toLowerCase() === 'Саша'.toLowerCase()){
            this.form.name = {
              index: 1000,
              actualName: 'Саша'
            }
          }else if(this.searchName.replaceAll(' ', '').toLowerCase() === 'Женя'.toLowerCase()){
            this.form.name = {
              index: 1001,
              actualName: 'Женя'
            }
          }else if(this.searchName.replaceAll(' ', '').toLowerCase() === 'Валя'.toLowerCase()){
            this.form.name = {
              index: 1002,
              actualName: 'Валя'
            }
          }else if(this.searchName.replaceAll(' ', '').toLowerCase() === 'Аня'.toLowerCase()){
            this.form.name = {
              index: 38,
              actualName: 'Аня',
              FullName: 'Анна',
            }
          }else if(this.searchName.replaceAll(' ', '').toLowerCase() === 'Алик'.toLowerCase()){
            this.form.name = {
              index: 0,
              actualName: 'Алик',
              FullName: 'Алик',
            }
          }else if(this.searchName.replaceAll(' ', '').toLowerCase() === 'Ася'.toLowerCase()){
            this.form.name = {
              index: 0,
              actualName: 'Ася',
              FullName: 'Ася',
            }
          }else{
            // 
            console.log('q');
            let names = this.names;
            let resultNames = [];

            resultNames = names.filter(n => {
              if(n.FullName.toLowerCase().indexOf(this.searchName.replaceAll(' ', '').toLowerCase()) >= 0){
                return true;
              }else{
                
                if(n.ShortName.toLowerCase().indexOf(this.searchName.replaceAll(' ', '').toLowerCase()) >= 0){
                  return true;
                }else{
                  return false;
                }

              }
            });
            console.log(resultNames);
            // 
            if(resultNames.length >= 1){
              this.form.name = resultNames[0];
              this.form.name.actualName = this.searchName;
            }else{
              this.form.name = {
                index: 0,
                actualName: this.searchName
              }
            }
            
          }
          
        }
        
        this.wait = false;

        // async function postData(url = '', data = {}) {
        //   const response = await fetch(url, {
        //     method: 'POST', 
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     redirect: 'follow',
        //     referrerPolicy: 'no-referrer',
        //     body: JSON.stringify(data) 
        //   });
        //   return response.json(); 
        // }

        // postData('http://dedmoroz-rt.com:9000/render', this.form)
        //   .then(data => {
        //     console.log('FINISHED');
        //     console.log(data);
        //     // console.log(data.body);
        //     this.resFile = data.file;
        //     this.wait = true;
        //     this.success = true;
        //   })
        //   .catch(err => {
        //     console.log('FINISHED with error');
        //     alert('Что-то пошло не так. Попробуйте еще раз');
        //     this.wait = true;
        //   });

        // Hello IE - no fetch API support...

        // 
        // =================================
        // const balance = new XMLHttpRequest();

        // let _balanceUrl = '';
        // const _origin = window.location.origin;

        // if(_origin.includes('https:')){
        //   theUrl = window.location.origin + ':9001/test';
        // }else{
        //   theUrl = window.location.origin + ':9000/test';
        // }
        // balance.open("POST", theUrl);
        // balance.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // balance.onload = () => {
        //   const q = JSON.parse(balance.responseText);
        //   console.log(q);
        //   this.subDomain = q.domain;
          
          

        // };
        // balance.send(JSON.stringify({check: 'it'}));
        // ============================================

        // // 
        this.subDomain = 's' + this.random(0, 6);
          const xmlhttp = new XMLHttpRequest();   // new HttpRequest instance .replace('https://', 'http://')
          let renderUrl = '';
          
          if(window.location.origin.includes('https:')){
            renderUrl = window.location.origin.replace('https://', `https://${this.subDomain}.`) + ':9001/render';
          }else{
            renderUrl = window.location.origin.replace('http://', `http://${this.subDomain}.`) + ':9000/render';
          }
          
          xmlhttp.open("POST", renderUrl);
          xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xmlhttp.onload = () => {
            const q = JSON.parse(xmlhttp.responseText);
            console.log(q);
            this.resFile = q.file;
            this.wait = true;
            this.success = true;
          };
          xmlhttp.send(JSON.stringify(this.form));
        // //

        // // 
        // const xmlhttp = new XMLHttpRequest();   // new HttpRequest instance .replace('https://', 'http://')
        // let theUrl = '';
        
        // if(_origin.includes('https:')){
        //   theUrl = window.location.origin + ':9001/render';
        // }else{
        //   theUrl = window.location.origin + ':9000/render';
        // }
        
        // xmlhttp.open("POST", theUrl);
        // xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // xmlhttp.onload = () => {
        //   const q = JSON.parse(xmlhttp.responseText);
        //   console.log(q);
        //   this.resFile = q.file;
        //   this.wait = true;
        //   this.success = true;
        // };
        // xmlhttp.send(JSON.stringify(this.form));
        // // 
      }

    },
    nameFocus(e){
      this.isFocused = true;
      if(this.searchName === this.placeholder){
        this.searchName = '';
      }
    },
    nameUnFocus(e){
      // this.isFocused = false;
      if(this.searchName === ''){
        this.searchName = this.placeholder;
      }
    },
    autoComplete(e){
      console.log({e});
    }
  },
  computed: {
    filteredNames(){
      if(this.searchName.length >= 3 && this.searchName !== 'ася' && this.searchName !== 'Ася'){
        console.log('puted');
        let names = this.names;
        let resultNames = [];

        resultNames = names.filter(n => {
          if(n.FullName.toLowerCase().indexOf(this.searchName.replaceAll(' ', '').toLowerCase()) >= 0){
            return true;
          }else{
             
            if(n.ShortName.toLowerCase().indexOf(this.searchName.replaceAll(' ', '').toLowerCase()) >= 0){
              return true;
            }else{
              return false;
            }

          }
        });

        return resultNames;

      }else if(this.searchName < 3){

        return [];

      }
    },
    inputH(){
      if(this.searchName.length < 20){
        return true;
      }else{
        return false;
      }
    }
  },
  // watch: {
  //   searchName: function (val) {
  //     console.log(val);
  //   },
  // }
}
</script>

<style>

  .info-block{
    /* background-image: url(../assets/info-bg.png); */
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    color: #273a65;
    position: relative;

    max-width: 77%;
    margin: 0 auto;
    margin-top: 8rem;
  }
  @media (max-width: 1860px) {
    .info-block {
      max-width: 95%;
    }
  }
  @media (max-width: 1600px) {
    .info-block {
      max-width: 100%;
    }
  }
  @media (max-width: 1300px) {
    .info-block {
      max-width: 100%;
    }
  }
  @media (max-width: 1200px) {
    .info-block {
      max-width: 100%;
    }
  }
  @media(max-width: 992px){
    .info-block {
      max-width: 100%;
      margin-top: 4rem;
    }
  }
  @media (max-width: 768px) {
    .info-block {
      max-width: 100%;
    }
  }

  .info-block img{
    width: 100%;
  }
  @media(max-width:992px){
    .info-block img{
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }

  /*  */
  .form{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 55px 87px 35px 55px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .rr{
    margin-top: 18px;
  }
  .ll{
    flex: 1;
    padding-top: 30px;
  }
  @media (max-width: 1400px) {
    .form {
      padding: 35px 65px 55px;
    }
  }
  @media (max-width: 1300px) {
    .form {
      padding: 35px 45px 55px;
    }
  }
  @media (max-width: 1200px) {
    .form {
      padding: 35px 35px;
    }
  }
  @media (max-width: 992px) {
    .form {
      padding: 15px 45px;
      height: initial;
      position: relative;
    }
  }
  @media (max-width: 560px) {
    .form {
      padding: 15px 15px;
      height: initial;
      position: relative;
    }
  }

  /*  */
  .form::before, .form::after{
    content: '';
    position: absolute;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  /*  */
  .form::before{
    background-image: url(../assets/gift.png);
    top: -14%;
    left: 0;
    transform: translateX(-70%);
    width: 300px;
    height: 300px;
  }
  @media (max-width: 1600px) {
    .form::before{
      top: -12%;
      transform: translateX(-70%);
    }
  }
  @media (max-width: 1500px) {
    .form::before{
      top: -14%;
      transform: translateX(-70%);
    }
  }
  @media (max-width: 1400px) {
    .form::before{
      top: -14%;
      transform: translateX(-60%);
    }
  }
   @media (max-width: 992px) {
     .form::before{
        top: -14%;
        transform: translateX(-70%);
      }
   }
  @media (max-width: 768px) {
    .form::before{
      width: 16vw;
      height: 16vw;
      top: -9%;
      transform: translateX(-12%);
    }
  }
  @media (max-width: 560px) {
    .form::before{
      width: 22vw;
      height: 22vw;
      top: -4%;
      transform: translateX(10%);
    }
  }
    
  /*  */
  .form::after{
    background-image: url(../assets/info-balls.png);
    bottom: 0;
    left: 8%;
    transform: translateY(58%);
    width: 11vw;
    height: 100px;
  }
  @media(max-width: 768px){
    .form::after{
        left: 0%;
      transform: translateY(92%);
      width: 30vw;
      height: 114px;
    }
  }
  @media(max-width: 560px){
    .form::after{
      left: 8%;
      transform: translateY(73%);
      width: 30vw;
      height: 114px;
    }
  }

  /*  */
  .input__inline{
    display: flex;
    align-items: center;
    padding-left: 11%;
  }
  .sex-input{
    padding-right: 41%;
    margin-top: 30px;
  }
  .wish-input{
    margin-top: 43px;
  }
  @media (max-width: 1400px) {
    .input__inline {
      margin-bottom: 2rem;
    }
    .wish-input{
      margin-top: 30px;
    }
  }
  @media (max-width: 1300px) {
    .input__inline {
      margin-bottom: 1rem;
    }
  }
  @media (max-width: 1200px) {
    .input__inline {
      margin-bottom: 1rem;
    }
  }
   @media (max-width: 992px) {
     .sex-input{
      padding-right: 0;
    }
   }
  @media (max-width: 768px) {
    .input__inline {
      padding-left: 0;
      flex-direction: column;
    }
    
  }

  /*  */
  .input__inline label{
    margin-right: 35px;
  }

  /*  */
  .input__inline textarea{
    border-radius: 18px;
    border: 4px solid #273a65;
    padding: 0 9px;
    flex: 1;
    width: 100%;
    line-height: 60px;
    font-size: 22.3px;
    color: #273a65;
    font-family: "RostelecomBasis-Light", sans-serif;
    resize: none;
    overflow: hidden;
    height: 68px;
    padding-left: 1em;
  }
  .input__inline textarea::placeholder {
    color: #273a65;
  }
  @media (max-width: 1400px) {
    .input__inline input[type=text] {
      /* line-height: 39px; */
    }
  }
  @media (max-width: 1300px) {
    .input__inline input[type=text] {
      /* line-height: 32px; */
    }
  }
  @media (max-width: 1200px) {
    .input__inline input[type=text] {
      /* line-height: 28px; */
      /* font-size: 16px; */
    }
  }
  @media (max-width: 992px) {
    .input__inline textarea {
      padding-top: 7px;
      line-height: 1;
      font-size: 17px;
    }
  }
  

  /*  */
  .name__wrapper{
    flex: 1;
    position: relative;
  }
  @media (max-width: 768px) {
    .name__wrapper{
      width: 100%;
    }
  }

  /*  */
  .input__columns{
    margin-bottom: 1rem;
    text-align: center!important;;
  }

  /*  */
  .input__columns label{
    margin-bottom: 17px;
    display: flex;
    justify-content: center;
  }

  /*  */
  .input__columns .custom-select{
    text-align: center;
  }

  /*  */
  .info-block label{
    font-size: 34px;
    white-space: nowrap;
  }
  @media (max-width: 1400px) {
    .info-block label {
      /* font-size: 20px; */
    }
  }
  @media (max-width: 1300px) {
    .info-block label {
      /* font-size: 18px; */
    }
  }
  @media (max-width: 1200px) {
    .info-block label {
      /* font-size: 16px; */
    }
  }
  @media (max-width: 992px) {
    .info-block label {
      white-space: normal;
      margin-right: 0;
    }
  }

  /*  */
  .form button{
    position: relative;
    background: transparent;
    border: none;
    padding: 0px;
    cursor: pointer;
    margin: 0 auto;
    display: block;
    margin-top: 30px;

    max-width: 60%;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  @media(max-width: 1400px){
    .form button{
      margin-top: 17px;
    }
  }
  @media(max-width: 992px){
    .form button{
      max-width: 100%;
    }
  }

  /*  */
  .form button:hover span{
    transform: translateY(2px);
  }

  /*  */
  .form button span{
    border-radius: 18px;
    background: #ff4e00;
    border: 0px solid;
    color: white;
    font-size: 34px;
    padding: 10px 32px;
    position: relative;
    z-index: 15;
    display: flex;
    transition: transform .2s;
    text-align: center;
    justify-content: center;
  }
  @media(max-width: 1200px){
    .form button span{
      /* font-size: 18px; */
    }
  }

  /*  */
  .form button::after{
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

  /*  */
  .auto{
    position: absolute;
    overflow: hidden;
    background: rgba(255,255,255,.95);
    padding: 0px;
    border-radius: 8px;
    width: 100%;
    bottom: 0;
    transform: translateY(100%);
    z-index: 555;
  }
  .auto-item{
    padding: 4px 10px;
    text-align: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all .3s;
    background: rgba(255,255,255,.05);
  }
  .auto-item:hover{
    background: #273a65;
    color: white;
  }

  /*  */
  .validation-error{
    border-color: #ff4e00!important;
  }

  .fullH{
    line-height: 60px!important;
    padding-top: 0!important;
  }
</style>