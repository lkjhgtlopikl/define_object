import express from 'express';
import cors from 'cors'; // Импортируем cors
import fs from 'fs';
import path from 'path';

const PORT = 3000;
const app = express();
app.use(cors()); // Разрешаем CORS
app.use(express.json()); // Middleware для парсинга JSON

const p = path.resolve('./src/components/icons/data.json');

app.post('/', (req, res) => {
  const data = req.body;
  console.log('/data: ', data);

  fs.writeFile(p, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Ошибка записи файла:', err);
      return res.status(500).send('Ошибка записи файла');
    }
    res.send('Данные успешно записаны');
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
