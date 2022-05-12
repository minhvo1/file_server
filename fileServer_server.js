const net = require('net');
const fs = require('fs');

//Create server
const server = net.createServer();
//On server connection
server.on('connection', (client) => {
  client.setEncoding('utf8');
  //Upon receiving fileName as data from the client:
  client.on('data', (fileName) => {
    console.log('Client requested local file: ', fileName);
    localFile = "./" + fileName; //Adding ./ to the file name (local)
    //Reads the local file and write back to client the content
    fs.readFile(localFile, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      client.write(data);
    })
  })
  // Exit server when CTRL + C is pressed
  const stdin = process.stdin;
  stdin.on('data', (key) => {
    if (key === '\u0003') {
      process.exit();
    }
  })

//Displays message when listening
})
server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
