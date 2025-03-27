<!-- <script setup>
import { ref, onMounted } from 'vue';

const dataJson = ref({ obj: {} });
// Загрузка данных из data.json
onMounted(() => {
    fetch("./data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Сеть не ответила");
      }
      return response.json();
    })
    .then((data) => {
      dataJson.value = data; // Обновляем реактивное значение
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
    });
});
console.log(dataJson.value)
</script> -->
<script setup>

import dataJson from './data.json'
import { ref, onMounted } from 'vue';

// let dataJson = [];

// onMounted(async () => { // Добавляем async здесь
//     fetch(dJson)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error("Сеть не ответила");
//             }
//             return response.json();
//         })
//         .then((data) => {
//             dataJson = data;
//             console.log(dataJson); // Здесь вы можете использовать загруженные данные
//         })
//         .catch((error) => {
//             console.error("Ошибка при загрузке данных:", error);
//         });
// });


</script>

<style scoped>
.table {
    width: 100%;
    margin-top: 20px;
}
</style>
<template>
    <div class="container">
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">Объект</th>
                    <th scope="col">Признак 1</th>
                    <th scope="col">Признак 2</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, key) in dataJson.obj" :key="key">
                    <th scope="row">{{ key }}</th>
                    <td>{{ value[0] }}</td>
                    <td>{{ value[1] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>