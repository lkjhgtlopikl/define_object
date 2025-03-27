import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; // Если вам нужны JavaScript компоненты

// Создаем приложение
const app = createApp(App);

// Применяем любые дополнительные плагины или настройки
// Например, если вы используете Vue Router или Vuex, добавьте их здесь

// Монтируем приложение в элемент с id="app"
app.mount('#app');
