let fs = require('fs');
let os = require('os');
let site = 'https://bingxl.cn/';
let data = site + os.EOL;
fs.readdir('./source/_posts/', (err, files) => {
    files.forEach(item => {
        const article = item.replace('.md', '');
        data += site + encodeURI(article) + '.html' + os.EOL;
        // 
        
    })
    console.log(data);
    let write = fs.writeFileSync('./source/urls.txt', data);
});
