import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import filesystem from 'fs';
const dbAgent = require('./mysqlprovider.js');

var credentials = require('./config.json').mailCredentials;
const mailservice = nodemailer.createTransport(credentials);

let maildata = 
{
	from: '"MarkMe Reporting Service" <markmenotify@yandex.ru>',
	to: 'adress@domain.com',
	subject: 'Group report',
	html: '<b style = "font-size:150%">Your sincerely, \nMarkMe Team</b>'
};



export function sendReport(teacherId, group) {
	var success = true;
	var teacher = dbAgent.getReportInfo(teacherId);
	var attach = prepareReport(teacher.surname,group,null);
	maildata.attachments = [
	{filename:attach.substring(10), 
		path:attach } ];
	maildata.to = teacher.email;
	mailservice.sendMail(maildata, (err, info) => {
		if (err) {
			success = false;
			console.log(info); 
		}
	});
	return success;
}

// Функция для подготовки отчета для преподавателя и сохранения его в файловой системе
function prepareReport(name, group, room){
	let reportName = './reports/' + group + '.pdf';
	filesystem.exists(reportName, (exists) => {
		if (exists) {
			filesystem.unlinkSync(reportName); // Удаляем предыдущий отчет
		}
		let report = new PDFDocument;
		report.pipe(filesystem.createWriteStream(reportName));
		report.fontSize(25);
		report.text('Report for ' + name + ', ' + Date(),100,100); //Здесь прописать имя преподавателя, заказвшего отчет
		report.fontSize(10);
		report.moveDown();
		for (let i = 0; i < 10; i++) {
			report.text(name + i + '\n'); // Здесь прописать извлечение из БД всех присутствующих студентов группы 
			//с использованием переданных group и room
		}
		report.end();
	});
	return reportName;
}
