const  express = require('express');
const fs = require('fs');
const app = express()

app.get('/', processRequest)

function processRequest(request, response){
  readText(request, response)
  console.log('Requisição terminou!')
}

function readText(request, response){
  fs.readFile('teste.txt', function(err, data){
  if(err){
    console.log('Erro na leitura do arquivo!')
    return response.status(500).send('Erro ao tentar ler o arquivo')
    }
  response.write(data)
  response.end()
  console.log('Leu o arquivo com sucesso!')
  });
  console.log('Lendo o arquivo, aguarde!')
}


app.listen(3000)

