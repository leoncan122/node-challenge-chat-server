const express = require("express");
const cors = require("cors");
const fs = require('fs')

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
    response.status(200).json(welcomeMessage);
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

app.use(express.json())

app.post("/messages", function (request, response) {
  let newMessage = request.body

  if (newMessage.from && newMessage.text) {
    let id = messages.length
  
    newMessage.id = id

    messages.push(newMessage)

    response.status(201).json(newMessage)
  } else {
    response.status(400).send("The message sintax it's not correct")
  }
  

});

app.delete("/messages/:id", function (request, response) {
  let id = parseInt(request.params.id)

  if (typeof id === 'number') {

    if (id >= 0 && id <= messages.length-1) {
      let msgIndex = messages.findIndex( msg => msg.id === id)

      messages.splice(msgIndex, 1)

      response.status(201).send(`Message with id = ${id} was deleted`)
    }else {
      response.status(404).send(`The ID=${id} doesn't exist`);
    }

  } else {
    response.status(404).send('Id must be a number');
  }
  

  
});

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
