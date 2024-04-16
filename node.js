const child_process = require("child_process")


const callback = (data) => {
  console.log("cb", data)
}

child = child_process.spawn('h:\\github\\utools\\test.exe', {
  encoding: 'buffer',
  shell: true,
});

child.stdout.on('data', (data) => {
  console.log(data, "data")
  callback(data)
});

child.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
  callback(data)
});

child.stdout.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
  callback("close 执行完毕")
});