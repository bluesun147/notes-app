const chalk = require('chalk');
const yargs = require('yargs'); 
const notes = require('./notes');

yargs.version('1.1.0');

// create add command
yargs.command({
    command: 'add', // 커맨드 명령어
    describe: 'Add a new note!', // 설명
    builder: { // 옵션
        title: {
            describe: 'Note title',
            demandOption: true, // 필수
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    }, 
    handler(argv) { // 실제 동작
        notes.addNote(argv.title, argv.body);
    }
})

// load existing notes
// use filter to keep other notes
// save new arr

yargs.command({
    command: 'remove',
    describe: 'remove note!',
    builder: {
        title: { // 입력한 title이 제목인 노트 삭제
            describe: 'title of note.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { 
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: "List your notes!",
    handler() {
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: "Read a note!",
    builder: {
        title: {
            describe: 'title of note.',
            demandOption: true,
            type: 'string'
        }
    },

    handler(argv) {
        notes.readNote(argv.title);
    }
})

//console.log(yargs.argv);

yargs.parse();