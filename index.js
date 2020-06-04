const fs = require('fs');
const path = require('path');

const filesDir = './files';
const finalDir = './final';
const readDir = (filesDir) => {
    const files = fs.readdirSync(filesDir);
    files.forEach(element => {
        let localBase = path.join(filesDir, element);
        let state = fs.statSync(localBase);
        if (state.isDirectory()) {
            readDir(localBase);
        } else {
            let filename = path.basename(element);
            let firstLetter = filename[0];
            createDir(firstLetter);
            console.log('Create dir ' + firstLetter + ' done');
            moveFiles(localBase, firstLetter);
        }
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
    try {
        if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir);
        }
    } catch (err) {
        console.error(err)
    }
}

const moveFiles = (file, destination) => {
    try {
        let dest = path.join(finalDir, destination);
        fs.renameSync(file, dest);
        console.info('Move files done!')
    } catch (err) {
        console.log(err)
    }
}

readDir(filesDir);