//require = import library
const fs = require("fs")

const dir = "my-files"
//this is going to make a directory on our local files
fs.mkdirSync(dir)

for (let i = 1; i <=10; i++) {
    fs.writeFileSync(`${dir}/${i}.txt`, `Hello from ${i}`)
}