const fs = require('fs');
const os = require('os');
const child_process = require("child_process")
const path = require("path")

const { resolve } = require('path');


function readFileAsync(filePath, encoding) {  
  return new Promise((resolve, reject) => {  
    require('fs').readFile(filePath, encoding, (error, data) => {  
      if (error) {  
        reject(error);  
      } else {  
        resolve(data);  
      }  
    });  
  });  
}  

function exec(callback) {
    child = child_process.spawn('h:\\github\\utools\\test.exe', {
      encoding: 'buffer',
      shell: true,
    });

    child.stdout.on('data', (data) => {
      callback(data)
    });

    child.stderr.on('data', (data) => {
      callback(data)
    });

    child.stdout.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      callback("close 执行完毕")
    });

    // require('child_process').exec('h:\\github\\utools\\test.exe', (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`exec error: ${error}`);
    //     return;
    //   }
    //   resolve(stdout)
    //   console.log(`stdout: ${stdout}`);
    //   console.error(`stderr: ${stderr}`);
    // });
}

window.services = {
  readFile: (inputPath, encoding = 'utf8') => {
    return readFileAsync(inputPath, encoding)
  },
  exec: (callback) => {
    exec(callback)
  }
}