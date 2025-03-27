<script setup>
import { ref } from 'vue';
import './assets/main.css';
//import { RouterLink, RouterView } from 'vue-router'
import Table from './components/icons/Table.vue';
import Modal from './components/icons/Modal.vue';
import ModalList from './components/icons/Form.vue';
import dataJson from '../src/components/icons/data.json'
console.log(dataJson.mark2)
let i1 = ref(null);//признак 1
let i2 = ref(null);//признак 2
let e1 = ref(false);// доступность поля для ввода для признака 1
let e2 = ref(false);// доступность поля для ввода для признака 2
let res = null;
let showModalList = ref(false);
let showRes = ref(false);
let showTab = ref(true);



const hanleNo1 = (value) => {
  console.log(dataJson.mark1[value])
  i1.value = dataJson.mark1[value]
  console.log(i1.value, i2.value)
}
const hanleNo2 = (value) => {
  console.log(dataJson.mark2[value[1]])
  i2.value = dataJson.mark2[value[1]]
  console.log(i1.value, i2.value)
  //search();
  console.log(showModalList.value);
}
const search = () => {
  // Проверяем, установлены ли значения для i1 и i2
  if (i1.value !== null && i2.value !== null) {
    res = Object.entries(dataJson.obj).filter(([key, val]) => {
      return val[0] === i1.value && val[1] === i2.value;
    }).map(([key]) => key);

    if (res.length !== 0) {
      showRes.value = true;
      showModalList.value = false;
      showTab.value = false;
    } else {
      e1.value = true; // Делаем доступным поле для ввода признака 1
      e2.value = true; // Делаем доступным поле для ввода признака 2
      showModalList.value = true;
      showRes.value = false;
      showTab.value = false;
    }
  } else {
    // Если хотя бы одно из значений равно null
    if (i1.value === null) {
      e1.value = false;  // Делаем доступным поле для ввода признака 1
    } else {
      e1.value =true ; // Делаем недоступным поле для ввода признака 1
    }

    if (i2.value === null) {
      e2.value = false;  // Делаем доступным поле для ввода признака 2
    } else {
      e2.value =true ; // Делаем недоступным поле для ввода признака 2
    }

    showModalList.value = true; // Показываем модальное окно
    showTab.value = false; // Скрываем таблицу
  }
};

const clear = () => {
  showRes.value = false;
  showModalList.value = false;
  showTab.value = true;
  i1.value = null;
  i2.value = null;
  e1.value = false;
  e2.value = false;
};
</script>

<template>
  <div class="navbar bg-dark btn-group-horizontal" role="group" aria-label="Вертикальная группа кнопок-переключателей">
    <input type="radio" class="btn-check" data-bs-toggle="modal" data-bs-target="#0" name="vbtn-radio" id="vbtn-radio1"
      autocomplete="off" checked>
    <label class="btn btn-outline-secondary" @click="clear" for="vbtn-radio1">Начать</label>
    <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio2" autocomplete="off">
    <label class="btn btn-outline-secondary"  @click="search" for="vbtn-radio2">Результаты</label>
    <input type="radio" class="btn-check" @click="clear" name="vbtn-radio" id="vbtn-radio3" autocomplete="off">
    <label class="btn btn-outline-secondary" for="vbtn-radio3">Таблица</label>
  </div>



  <Table v-if="showTab" />

  <!-- <button type="button" @click="clear" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#0">Начать</button> -->

  <template v-for="(m, index) in Object.entries(dataJson.mark1)" :key="m[0]">
    <template v-if="(index == (Object.entries(dataJson.mark1).length - 1))">
      <Modal :ID="m[0]" :no="9" :yes="9" :title=m[1] @sendno='hanleNo1' btn1="Да" btn2="Нет" />
    </template>
    <template v-else>
      <Modal :ID="m[0]" :no=m[0] :yes="9" :title=m[1] @sendno='hanleNo1' btn1="Да" btn2="Нет" />
    </template>
  </template>
  <template v-for="(m) in Object.entries(dataJson.mark2)">
    <Modal :ID="'1' + m[0]" :no="'1' + (parseInt(m[0]))" :title=m[1] btn1="Да" @sendno='hanleNo2' btn2="Нет" />
  </template>
  <!-- <button type="button" @click="search" class="btn btn-dark">Результаты</button>
  <button type="button" @click="clear" class="btn btn-dark">На главную</button> -->
  <div v-if="showRes" class="card text-bg-success" id="res">
    <h5 class="card-title">Результаты поиска: {{ res[0] }}</h5>
  </div>
  <ModalList :i1=i1 :i2=i2 :e1=e1 :e2=e2 v-if="showModalList"></ModalList>

</template>