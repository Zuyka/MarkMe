import express from 'express'
import filesystem from 'fs'
import reporter from './reporter.js'

const app = express();

app.listen(8080, () =>  {
	console.log('Server is up!');
});

//Админская страничка
app.get('/', (req, res) => sendHtml(res,'./view/admin.html'));

//Метод заказа преподавателем отчета
app.get('/report/:id/:group', (req,res) => {
	if (reporter.sendReport(req.params.id,
		req.params.group)) {
		res.send("success");
	}
	else {
		res.send('Something happened, we can`t create your report');
	}
});

// CRUD методы для работы с базой данных
app.post('/students', (req,res) => {
	//Здесь создаем нового студента
});

app.post('/teachers', (req,res) => {
	//Здесь создаем нового преподавателя
})

app.post('/groups', (req,res) =>{
	//Здесь создаем новую группу
})

app.delete('/groups/:id', (req,res) => {
	//Здесь удаляем группу
})

app.delete('/students/:id', (req,res) => {
	//Здесь удаляем студента
})

app.delete('/teachers/:id', (req,res) => {
	//Здесь удаляем преподавателя
})

app.put('/groups/:id', (req,res) => {
	//Здесь изменяем группу
})

app.put('/students/:id', (req,res) => {
	// Здесь изменяем студента
	// Основной метод получения геолокационных данных от студента
})

app.put('/teachers/:id', (req,res) => {
	//Здесь изменяем преподавателя
})

function sendHtml(res, pathToHtml) {
	filesystem.readFile(pathToHtml, (err,html) =>{
		if (err){
			console.log(err);
			res.send('<b style = "font-size:250%" > 404 : Not found </b>"');
			return;
		}
		res.write(html);
		res.end();
	});
}