const fs = require('fs');
const path = require('path');

const filesDir = './files';
const finalDir = './final';
const readDir = (filesDir) => {
    const files = fs.readdirSync(filesDir);
    files.forEach(element => {
        let localBase = path.join(filesDir, element);
        fs.stat(localBase, (err, stats) => {
            if (err) {
                console.log(err);
                return;
            } else {
                if (stats.isDirectory()) {
                    readDir(localBase);
                } else {
                    let filename = path.basename(element);
                    let firstLetter = filename[0];
                    let destination = path.join(finalDir, firstLetter, element);
                    createDir(firstLetter, localBase, destination);
                }
            }
        });
    });
}

// Make Final directory
if (!fs.existsSync('final')) {
    fs.mkdir('final', (err) => {
        if (err) {
            console.log(err)
        }
    });
} else {
    console.info('The "final" directory is exists');
}

const createDir = (firstLetter, localBase, destination) => {
    let newDir = path.join(finalDir, firstLetter);
    if (!fs.existsSync(newDir)) {
        fs.mkdir(newDir, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Create dir ' + firstLetter + ' done');
                moveFiles(localBase, destination);
            }
        });
    } else {
        moveFiles(localBase, destination);
        console.info('The directory is exists');
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