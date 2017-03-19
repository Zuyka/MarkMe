import dbProvider from 'sequelize'

var connection = new dbProvider('testnode', 'root', '0451', {
	host: 'localhost',
	dialect: 'mysql'
});


//Код, создающий модели преподавателя, студента и группы
export var Teacher = connection.define('teacher',
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

export var Student = connection.define('student', {
	id:
	{
		type : dbProvider.STRING,
		primaryKey : true,
	},
	name : dbProvider.STRING,
	surname : dbProvider.STRING,
	latitude :{ 
		type : dbProvider.DOUBLE,
		defaultValue : 0.0
	}, 
	longtitude:{ 
		type : dbProvider.DOUBLE,
		defaultValue : 0.0
	}
});

export var Group  = connection.define('group',
{
	name :
	{
		type: dbProvider.STRING,
		primaryKey: true
	},
});

Student.belongsTo(Group, {as: 'group'});

connection.sync();


export function getReportInfo(teacherId)
{
	return { surname: teacherId, email : teacherId + '@yandex.ru'}
	 //заглушка, вообще функция должна возвращать email преподавателя и его имя по айдишнику
}


