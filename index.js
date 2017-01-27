const fs = require('fs');
const path = require('path');

const oriPath = './txt';
const dest = './dest';

// 要批量删除的内容
const regs = [
    [/(On.*)?wrote:(\n)+(\>+.*\n)+/mg, ''],
    [/From.*\n/g, ''],
    [/Date.*\n/g, ''],
    [/Subject.*\n/g, ''],
    [/References.*\n/g, ''],
    [/\s+Solutions.*\n/g, ''],
    [/In\-Reply\-To.*\n/g, ''],
    [/Message\-ID.*\n/g, '\n=============伟大的短分割线=============以下是邮件内容=============\n\n\n\n'],
    [/\-+\snext\spart\s\-+\nAn\sHTML\s.*\nURL\:.*\n/mg, ''],
    //清理扫尾
    [/\.*<.+\@.+\>.*\n/g, ''],
    [/\>+.*\n/g, ''],
];

// 读取文件
console.log('\033[91m 初始化txt文件们... \033[0m' + '\n');

if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
}

if (fs.existsSync(oriPath)) {
    let txtFolder = fs.readdirSync(oriPath);

    txtFolder.forEach(fileName => {
        if (fileName.indexOf('.txt') != -1) {
            fs.readFile(oriPath + '/' + fileName, 'utf8', (err, data) => {
                if (err) throw err;
                for (let i of regs) {
                    data = data.replace(i[0], i[1] || '');
                }
                // 更新文件
                fs.writeFile(dest + '/' + fileName, data, 'utf8', (err) => {
                    // if (err) throw err;
                    console.log('\033[92m ' + fileName + ' 清理成功 \033[0m');
                });
            });
        }
    });
}