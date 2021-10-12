const express = require('express');
const server = express();
const port = 5000;
const path = require('path');

//app.use(express.static(path.join(__dirname,'img')));
//app.use(express.static(path.join(__dirname,'public')));
//app.use('/',(req,res,next)=>{
//    res.sendFile(path.join(__dirname,'public','index.html'));
//});

server.get('/api', (req, res) => res.send('Its working!'));
//app.use(express.static(path.join(__dirname,'public')));
server.use(express.json());
server.use('/api', require('../router/api'));
server.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
