<template>
  <div id="info-block" class="info-block">
    <img src="../assets/info-bg.png" alt="" v-if="wait">
    <form action="#" class="form" v-if="wait" v-show="!success" autocomplete="off" @submit="formSend($event)">
      <input autocomplete="false" name="hidden" type="text" style="display:none;">
      <div class="input__inline" style="position: relative;">
        <label for="name">Имя</label>
        <div class="name__wrapper">
          <input v-model="searchName" @focus="isFocused = true" @blur="isfocused = false" type="text" name="name" id="name" placeholder="Впиши полное имя коллеги, например, Мария">
          <div class="auto" v-if="isFocused">
            <div v-for="item in filteredNames" :key="item.FullName">
              <div @click="setName(item.FullName, item)" class="auto-item">{{item.FullName}}</div>
              <div @click="setName(short, item)" class="auto-item" v-for="short in item.ShortName.split(', ')" :key="short">
                {{short}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input__inline">
        <label for="sex">Пол</label>
         <CustomSelect v-if="sexes"
            :options="sexes"
            :default="{index: 0, Name: 'Выбери из списка'}"
            class="select"
            id="sex-input"
            @input="sexChange($event)"
          />
      </div>

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

      <div class="input__columns">
        <label for="achievements">Пожелание</label>
        <CustomSelect v-if="wishes"
          :options="wishes"
          :default="{index: 0, Name: 'Выбери из списка'}"
          class="select"
          id="w-input"
          @input="setWishes($event)"
        />
      </div>

      <button type="submit"><span>Создать поздравление</span></button>
    </form>
    <Spinner v-if="!wait"/>
    <Result :fileName="resFile" v-if="success"/>
  </div>
</template>

<script>
import CustomSelect from "./CustomSelect.vue";
import Spinner from "./Spinner.vue";
import Result from "./Result.vue";

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
      achievements: undefined,
      femAchievements: undefined,
      wishes: undefined,
      searchName: '',
      isFocused: false,
      wait: true,
      success: false,
      resFile: ''
    }
  },
  mounted(){

    document.addEventListener('click', (e) => {
      
      if(e.target.id !== 'name'){
        if(e.target.classList.contains('auto-item') === false){
          window.app.$children[0].$children[0].isFocused = false;
        }
      }

    });

    fetch('/data/names.json')
      .then(response => response.json())
      .then(data => {
        this.names = data;
        // console.log(data);    
      });

    fetch('/data/wishes.json')
      .then(response => response.json())
      .then(data => {
        this.wishes = data;
        // console.log(data);    
      });

    fetch('/data/male_achievements.json')
      .then(response => response.json())
      .then(data => {
        this.achievements = data;
        this.selectedAchievements = this.achievements;
        // console.log(data);    
      });

    fetch('/data/female_achievements.json')
      .then(response => response.json())
      .then(data => {
        this.femAchievements = data;
        // console.log(data);    
      });
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
      console.log(`1 ${item}`);
      this.form.achievements = item.index;
    },
    setWishes(item){
      console.log(`2 ${item}`);
      this.form.wishes = item.index;
    },
    formSend(e){
      e.preventDefault();

      let valid = true;
      if(this.form.name === ''){
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
      if(this.form.achievements === 0){
        document.getElementById('w-input').classList.add('validation-error');
        valid = false;
      }

      if(valid){
        // localhost:9000/render
        this.wait = false;
        async function postData(url = '', data = {}) {
          const response = await fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data) 
          });
          return response.json(); 
        }
        postData('http://161.35.96.151:9000/render', this.form)
          .then(data => {
            console.log('FINISHED');
            console.log(data);
            // console.log(data.body);
            this.resFile = data.file;
            this.wait = true;
            this.success = true;
          })
          .catch(err => {
            console.log('FINISHED with error');
            this.wait = true;
          });
      }

    }
  },
  computed: {
    filteredNames(){
      if(this.searchName.length >= 3){

        let names = this.names;
        let resultNames = [];

        resultNames = names.filter(n => {
          if(n.FullName.toLowerCase().indexOf(this.searchName.toLowerCase()) >= 0){
            return true;
          }else{
             
            if(n.ShortName.toLowerCase().indexOf(this.searchName.toLowerCase()) >= 0){
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
    }
  }
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

    max-width: 65%;
    margin: 0 auto;
    margin-top: 8rem;
  }
  @media (max-width: 1500px) {
    .info-block {
      max-width: 75%;
    }
  }
  @media (max-width: 1300px) {
    .info-block {
      max-width: 75%;
    }
  }
  @media (max-width: 1200px) {
    .info-block {
      max-width: 70%;
    }
  }
  @media(max-width: 992px){
    .info-block {
      max-width: 65%;
      margin-top: 4rem;
    }
  }
  @media (max-width: 768px) {
    .info-block {
      max-width: 65%;
    }
  }

  .info-block img{
    width: 100%;
  }
  @media(max-width:768px){
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
    padding: 35px 75px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  @media (max-width: 1400px) {
    .form {
      padding: 35px 65px;
    }
  }
  @media (max-width: 1300px) {
    .form {
      padding: 35px 45px;
    }
  }
  @media (max-width: 1200px) {
    .form {
      padding: 35px 35px;
    }
  }
  @media (max-width: 768px) {
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
    top: 0;
    left: 0;
    transform: translateX(-65%);
    width: 13vw;
    height: 13vw;
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

  /*  */
  .input__inline{
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
  }
  @media (max-width: 1400px) {
    .input__inline {
      margin-bottom: 2rem;
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

  /*  */
  .input__inline label{
    margin-right: 35px;
  }

  /*  */
  .input__inline input[type=text]{
    border-radius: 6px;
    border: 2px solid #273a65;
    padding: 0 9px;
    flex: 1;
    width: 100%;
    line-height: 47px;
  }
  @media (max-width: 1400px) {
    .input__inline input[type=text] {
      line-height: 39px;
    }
  }
  @media (max-width: 1300px) {
    .input__inline input[type=text] {
      line-height: 32px;
    }
  }
  @media (max-width: 1200px) {
    .input__inline input[type=text] {
      line-height: 28px;
    }
  }

  /*  */
  .name__wrapper{
    flex: 1;
    position: relative;
  }

  /*  */
  .input__columns{
    margin-bottom: 1rem;
    text-align: center!important;;
  }

  /*  */
  .input__columns label{
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }

  /*  */
  .input__columns .custom-select{
    text-align: center;
  }

  /*  */
  .info-block label{
    font-size: 22px;
    white-space: nowrap;
  }
  @media (max-width: 1400px) {
    .info-block label {
      font-size: 20px;
    }
  }
  @media (max-width: 1300px) {
    .info-block label {
      font-size: 18px;
    }
  }
  @media (max-width: 1200px) {
    .info-block label {
      font-size: 16px;
    }
  }
  @media (max-width: 992px) {
    .info-block label {
      white-space: normal;
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
  }

  /*  */
  .form button:hover span{
    transform: translateY(2px);
  }

  /*  */
  .form button span{
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
    .form button span{
      font-size: 18px;
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
</style>