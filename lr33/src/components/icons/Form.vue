<template>
  <div class="card text-bg-dark ">
    <form :v-on:submit='(e) => e.prevent()'>
      <div class="mb-3">
        <h3> Объект, который вы ввели отсутствует в нашей базе!</h3>
        <p>Пожалуйста, укажите наименование объекта и его признаки</p>
        <label for="objName" class="form-label">Наименование объекта</label>
        <input type="text" class="form-control" id="objName" aria-describedby="emailHelp">
        <label for="i1Name" class="form-label">Признак 1</label>
        <input type="text" class="form-control" id="i1Name" aria-describedby="emailHelp" :value=i1 :readonly=e1>
        <label for="i2Name" class="form-label">Признак 2</label>
        <input type="text" class="form-control" id="i2Name" aria-describedby="emailHelp" :value=i2 :readonly=e2>
      </div>
      <button type="button" v-on:click="sub" class="btn btn-secondary">Добавить</button>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  obj: String,
  i1: String,
  i2: String,
  e1: Boolean,
  e2: Boolean,
})
import dataJson from './data.json';

function sub() {
  const objName = document.getElementById('objName').value;
  const i1Name = document.getElementById('i1Name').value;
  const i2Name = document.getElementById('i2Name').value;

  for (const [key, value] of Object.entries(dataJson.obj)) {
    console.log(key, value);

    if (objName === key) {
      alert("Такой объект уже был добавлен!");
      clearInp();
      return; // Выход из функции
    } else if (i1Name === value[0] && i2Name === value[1]) {
      alert("Объект с такими признаками уже был добавлен!");
      clearInp();
      return; // Выход из функции
    }
  }
  console.log(dataJson.mark1.includes(i1Name))
  if (!dataJson.mark1.includes(i1Name)) {

    dataJson.mark1.push(i1Name)
    console.log(dataJson.mark1)
  }
  console.log(dataJson.mark2.includes(i2Name))
  if (!dataJson.mark2.includes(i2Name)) {
    dataJson.mark2.push(i2Name)
    console.log(dataJson.mark2)
  }
  dataJson.obj[objName] = [i1Name, i2Name];
  writeData();
  document.getElementById('objName').value = '';
  document.getElementById('i1Name').value = '';
  document.getElementById('i2Name').value = '';
}

function clearInp(params) {
  document.getElementById('objName').value = '';
  if (!props.e1) {
    document.getElementById('i1Name').value = '';
  }
  if (!props.e2) {
    document.getElementById('i2Name').value = '';
  }
}

function writeData() {
  return fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataJson),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка сети ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then((result) => {
      console.log("data.json ", result); // Выводим результат
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
}

</script>