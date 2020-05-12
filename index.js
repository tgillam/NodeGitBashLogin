const read = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const readline = require("readline")


const stdout = process.stdout
const stdin = process.stdin

let username = ''
let password = ''

const pn = (data, key) => {
    const c = data
    switch (c) {
        case '\u0004': // Ctrl-d
        case '\r':
        case '\n':
            return enter()
        case '\u0003': // Ctrl-c
            return ctrlc()
        default:
            // backspace
            if (c.charCodeAt(0) === 8) return
            else return newchar(c)
    }
}

login()

async function login(){
  await enterUsername()
}


async function enterUsername(){
  read.question('Username: ', name => {
    username = name
    read.close();
    enterPassword()
  });
}

async function enterPassword(){
  stdout.write("Password: ")
  stdin.setRawMode(true)
  stdin.resume()
  stdin.setEncoding('utf-8')
  stdin.on("data", pn)
}

function enter() {
    stdin.removeListener('data', pn)
    stdin.setRawMode(false)
    stdin.pause()
}

function ctrlc() {
    stdin.removeListener('data', pn)
    stdin.setRawMode(false)
    stdin.pause()
}

function newchar(c) {
    password += c
    stdout.write("*")
}
