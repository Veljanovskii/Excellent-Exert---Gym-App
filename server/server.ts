const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});

server.get('/exercises', (req: any, res: { send: (arg0: any) => void; }, next: any) => { 
  const exercises = readExercises();

  res.send(exercises);  
});

function readExercises() {
    const dbRaw = fs.readFileSync('./server/db.json');
    const exercises = JSON.parse(dbRaw).exercises
    return exercises;
}