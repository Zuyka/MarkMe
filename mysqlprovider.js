import dbProvider from 'sequelize'

var connection = new dbProvider('testnode', 'root', '0451', {
	host: 'localhost',
	dialect: 'mysql'
});


//Код, создающий модели преподавателя, студента и группы
var Teacher = connection.define('teacher',
{
	id: 
	{
		type : dbProvider.STRING,
		primaryKey : true
	},
	name : dbProvider.STRING,
	surname : dbProvider.STRING,
	email: dbProvider.STRING
});

var Student = connection.define('student', {
	id:
	{
		type : dbProvider.STRING,
		primaryKey : true,
	},
	name : dbProvider.STRING,
	surname : dbProvider.STRING,
	latitude : dbProvider.DOUBLE,
	longtitude : dbProvider.DOUBLE,
});

var Group  = connection.define('group',
{
	name :
	{
		type: dbProvider.STRING,
		primaryKey: true
	},
});

Student.belongsTo(Group, {as: 'group'});

connection.sync();


exports.getReportInfo = function(teacherId)
{
	return { surname: teacherId, email : teacherId + '@yandex.ru'}
	 //заглушка, вообще функция должна возвращать email преподавателя и его имя по айдишнику
}


