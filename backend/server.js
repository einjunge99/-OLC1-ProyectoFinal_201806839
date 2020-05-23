const http=require('http');
const app=require('./app');

const puerto=process.env.PORT||3000;
const servidor =http.createServer(app);


servidor.listen(puerto);