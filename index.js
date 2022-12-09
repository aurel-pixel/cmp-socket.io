const cors = require('cors');
const app = require('express')();
const http = require('http').createServer(app);
app.use(cors());
const io = require('socket.io')(http, {
  cors: {
    // origins: 'http://app.coachmotivplus.com',
    origins: 'http://localhost:5173',
    methods: ["GET", "POST"],
    // credentials: true
  }
});

 nbre_connect = 0;
 chat_inbox = {matricule_usr:'sajor2019', matricule_admin:'sajor2022', data:[{date_go:'12/11/2022', data_chat:[
  {id_chat:'1', user:'user', nom:'sajor', message:'bonjour, cmt?', statut:'lu', heure_go:'20:30' }
  ]}]}

app.get('/', (req, res) => {
    console.log("nouvelle requette");
  res.send('<h1>Hey Socket.io</h1>');
  
});

io.on('connection', (socket) => {
  //console.log('new');
  socket.on('disconnect', () => {
    console.log('user disconnected'); 
  });
  socket.on('new_connect', (data_go) => {
    nbre_connect++;
    console.log('nouvelle requette '+data_go.id_user+' nbre '+nbre_connect);

    socket.emit('new_user', {nbre:nbre_connect, data_message:chat_inbox});
  });

  // traitement des messages
  socket.on('add_message', (data) => {
    nbre_connect++;
    console.log('nouveau message '+data.message);
    var new_msg  = {id_chat:'1', user:'user', nom:'company 6', message: data.message, statut:'lu', heure_go:'20:30' }
    chat_inbox.data[0].data_chat.push(new_msg);
    io.emit('new_message', {message:data.message});
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});