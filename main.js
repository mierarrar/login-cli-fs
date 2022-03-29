var readlineSync = require('readline-sync');
const fs = require("fs");
const { v4: uuidv4 } =  require("uuid");
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

function main() {
    console.log("-------------");
    console.log("1.Register")
    console.log("2.Login");
    console.log("0.Exit");
    console.log("-------------"); 
  }

main();

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

/*
const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrpyted.toString();
};
*/

do {
    var option = readlineSync.questionInt("Enter Your Option: ");
    switch (option) {

            case 0:

                console.log("Bye!");
                break;

            case 1:
                
            var name_reg = readlineSync.question('Enter Name: ');
            var email_reg = readlineSync.question('Enter Email: ');
            var password_reg = readlineSync.question('Enter Password: ', {hideEchoBack: true});
            var password_confirm_reg = readlineSync.question('Confirm Password: ', {hideEchoBack: true});
            
            fs.readFile("user.json", (err, presentData) => {
                if (err) throw err;
                if (presentData.includes(email_reg)){
                    console.log("Account exists")}
                else {
                    if (password_reg == password_confirm_reg){
                    let id = uuidv4();
                    let encryptedPassword=encrypt(password_reg)
                    data = {Name:name_reg, Email: email_reg, Password: encryptedPassword, ID: id}
                    var fData = JSON.stringify(data)
                    fs.appendFile("user.json", fData + " ", (err) => {
                        if (err) throw err;
                    });
                        console.log("Registration Successful") 
                          }
                    else {console.log("password do not match, try again")}
                        }
            });
            break;
            case 2:

            var email_login = readlineSync.question('Enter Email: ');
            var password_login = readlineSync.question('Enter Password: ', {hideEchoBack: true});
        
            
            fs.readFile("user.json", (err, fileContent) => {
                if (err) throw err;
                a=JSON.parse(fileContent);
                if (a.Password==password_login && a.Email==email_login){
                    console.log("Login Success")
                }
                else {
                    console.log("Username/Password Incorrect")
                }
               
            });
        }
    if (option != 0) {
        break;
    }
} while (option === '0' || option === '1' || option === '2');

