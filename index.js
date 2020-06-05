const fs = require('fs');
const path = require('path');

const filesDir = './files';
const finalDir = './final';
const readDir = (filesDir) => {
    const files = fs.readdirSync(filesDir);
    files.forEach(element => {
        let localBase = path.join(filesDir, element);
        let state = fs.stat(localBase, (err, stats) => {
            if (err) {
                console.log(err);
                return;
            } else {
                if (stats.isDirectory()) {
                    readDir(localBase);
                } else {
                    let filename = path.basename(element);
                    let firstLetter = filename[0];
                    createDir(firstLetter);
                    let destination = path.join(finalDir, firstLetter, element);
                    console.log('Create dir ' + firstLetter + ' done');
                    moveFiles(localBase, destination);
                }
            }
        });
    });
}

// Make Final directory
try {
    if (!fs.existsSync('final')) {
        fs.mkdirSync('final')
    } else {
        console.info('The "final" directory is exists');
    }
} catch (err) {
    console.error(err)
}

const createDir = (firstLetter) => {
    let newDir = path.join(finalDir, firstLetter);
    if (!fs.existsSync(newDir)) {
        fs.mkdir(newDir, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}

const moveFiles = (file, destination) => {
    fs.rename(file, destination, (err) => {
        if (err) {
            return console.log(err)
        } else {
            console.info('Move files done!')
        }
    });
}

readDir(filesDir);