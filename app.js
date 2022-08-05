const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const crypto_key = crypto.randomBytes(32).toString('hex');
const crypto_iv = crypto.randomBytes(16);


app.use(express.json())


app.post('/encryptedData',async (req,res) => {
  let text = req.body.id;
  //encrypt_data = async function(text){
  let crypto_key_val = await get_random_string(crypto_key);

  let cipher = crypto.createCipheriv(algorithm, crypto_key_val, crypto_iv);

  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  

  let data = { crypto_salt: crypto_iv.toString('hex'), crypto_encrypted_data: encrypted.toString('hex'),str_crypto_key:crypto_key_val };
  // console.log(data)
  // return
  res.send(data);
      
  //}
});

app.post('/decryptedData',async (req,res) => {
  let text = {
    crypto_salt:req.body.crypto_salt,
    crypto_encrypted_data:req.body.crypto_encrypted_data,
    crypto_key:req.body.str_crypto_key,
  }
    let crypto_key = text.crypto_key;
    let crypto_iv = Buffer.from(text.crypto_salt, 'hex');

    let encryptedText = Buffer.from(text.crypto_encrypted_data, 'hex');

    let decipher = crypto.createDecipheriv(algorithm, crypto_key, crypto_iv);

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);
  let result = decrypted.toString();
  let response = {data : result}
  res.json(response);

});


app.listen(3000, () => {
    console.log('Server is running at port 3000');
});

get_random_string = async function(specific_text='',length=32) {
  var text = "";
  var possible;
  if(specific_text != ''){
      possible = specific_text;
  }else{
      possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  }

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}