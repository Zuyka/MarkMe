import express from 'express'
import filesystem from 'fs'
import reporter from './reporter.js'

const app = express();

app.listen(8080, () =>  {
	console.log('Server is up!');
});

app.get('/', (req, res) => sendHtml(res,'./view/admin.html'));

app.get('/report/:id/:group', (req,res) => {
	if (reporter.sendReport(req.params.id,
		req.params.group)) {
		res.send("success");
	}
	else {
		res.send('Something happened, we can`t create your report');
	}
});

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