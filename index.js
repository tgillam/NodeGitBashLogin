const readline = require("readline")

const windowsPrompt = (query, password) => new Promise((resolve, reject) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const stdin = process.openStdin();
  process.stdin.on('data', char => {
    char = char + '';
    if(rl.line.length > 15){
      char = '\u0004'
    }
    switch (char) {
      case '\n':
      case '\r':
      case '\u0004':
        stdin.pause();
        break;
      default:
        if(password){
          process.stdout.clearLine();
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(query + Array(rl.line.length + 1).join('*'));
        }
        break;
    }
  });
  rl.question(query, value => {
    rl.history = rl.history.slice(1);
    resolve(value);
  });
});

const main = async () => {
  console.log('Alias: ');
  const alias = await windowsPrompt('> ', false);
  console.log('Password: ');
  const password = await windowsPrompt('> ', true);
  console.log(alias + ':' + password)
};

main().catch(error => console.error(error));
