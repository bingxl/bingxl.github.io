let fs = require('fs');
let os = require('os');
let site = 'https://www.bingxl.cn/';
let data = site + os.EOL;
fs.readdir('./source/_posts/', (err, files) => {
    files.forEach(item => {
        data += site + item.replace('.md','') + '.html' + os.EOL;
        // 
        
    })
    console.log(data);
    let write = fs.writeFileSync('./source/urls.txt', data);
});
