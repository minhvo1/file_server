const net = require('net');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');


//Client connect to server
const conn = net.createConnection({ 
  host: 'localhost', // change to IP address of computer or ngrok host if tunneling
  port: 3000 // or change to the ngrok port if tunneling
});

conn.setEncoding('utf8');
//When connected to server, prompts a message asking to for user to input the local file name to be retrieved
conn.on('connect', () => {
  console.log("Connected to server!\n");
  const rl = readline.createInterface({ input,output });
  rl.question('Please enter the local filename (e.g. "index.html")\n', (answer1) => {
    conn.write(answer1);
    rl.close()
  })

});

//Printing data content from server
conn.on('data', (data) => {
  console.log('Server says: ', data);
});
