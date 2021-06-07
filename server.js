const express = require("express");
const cors = require("cors");

const { response } = require("express");

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};
//functions
function findById (input, id) {
  return input.find( once => once.id === id)
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  if (messages) {
    response.status(200).json(messages);
  }else {
    response.status(404).send("There aren't any messages yet");
  }
});

app.get("/messages/:id", function (request, response) {

  let id = parseInt(request.params.id)

  if (typeof id === 'number') {

    if (id >= 0 && id <= messages.length-1) {

      let message = findById(messages, id);
      response.status(200).json(message);  

    } else {
      response.status(404).send(`The ID=${id} doesn't exist`);
    }
  
  } else {
    response.status(404).send('Id must be a number');
  }
  
});

app.get('/search', function (request, response) {
  let textQuery = request.query.text.toLocaleLowerCase()
  const matches =  messages.filter( m => m.text.toLocaleLowerCase().includes(textQuery))
  
  response.status(200).send(matches)
})

app.get('/latest', function (request, response) {

  let latest = messages.slice(messages.length - 10)
  response.status(200).send(latest)

})
app.use(express.json())

app.post("/messages", function (request, response) {
  let newMessage = request.body

  if (newMessage.from && newMessage.text) {
    const id = Math.max(...messages.map((q) => q.id)) + 1;
    const timeSent = new Date()

    newMessage.id = id
    newMessage.timeSent = timeSent

    messages.push(newMessage)

    response.status(201).json(messages)
  } else {
    response.status(400).send("The message sintax it's not correct")
  }
  

});

app.delete("/messages/:id", function (request, response) {
  let id = parseInt(request.params.id)

  if (typeof id === 'number') {
    let msgIndex = messages.findIndex( msg => msg.id === id)
    if (msgIndex !== -1) {
      
      messages.splice(msgIndex, 1)
      response.status(201).send(`Message with id = ${id} was deleted`)

    }else {
      response.status(400).send(`The ID=${id} doesn't exist`);
    }

  } else {
    response.status(400).send('Id must be a number');
  }
});

app.put('/messages/:id',function(req, res) {
  const id = parseInt(req.params.id)
  const msgIndex = messages.findIndex( msg => msg.id === id)

  if (msgIndex !== -1) {
    const newMessage = { ...messages[msgIndex], ...req.body }
    
    messages[msgIndex] = newMessage

    res.status(200).send(newMessage)
  } else {
    res.status(400)
  }
})

app.listen(3001, () => {
   console.log("Listening on port 3001")
  });
