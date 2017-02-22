const express = require('express');
const swig = require('swig');
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const settings = require('./config/settings')
const mongoose = require('./config/db')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)

const app = express();
const port = process.env.PORT || 4000

//设置swig页面不缓存
swig.setDefaults({
  cache: false
})
app.set('view cache', false);
app.set('views','./app/views/pages/')
app.set('view engine','html')
app.engine('html', swig.renderFile)

app.use(cookieParser())
//https://github.com/jdesboeufs/connect-mongo
app.use(session({
	secret: settings.sessionSecret,
	store: new mongoStore({
		mongooseConnection: mongoose.connection,
		collection: 'sessions', //不写的话default: sessions
		ttl: 1 * 60 //14 * 24 * 60 * 60 = 14天
	}),
	resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))

if('development' === app.get('env')){
	app.set('showStackError', true)
	app.use(morgan('dev'))
	mongoose.set('debug',true)
}else if('production' === app.get('env')){
	// create a write stream (in append mode)
	var accessLogStream = fs.createWriteStream(__dirname + '/access.log',{flags: 'a'});
	// setup the logger
	app.use(morgan('combined', {stream: accessLogStream}))

}
//加载routers文件
require('./config/router')(app)
//app.locals的各属性值将贯穿程序的整个生命周期，与其相反的是res.locals，它只在这次请求的生命周期中有效
// app.locals.moment = require('moment')
app.listen(port)



console.log('server is started at http://localhost:'+port);

