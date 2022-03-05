const { default: chalk } = require('chalk');
const fs = require('fs');

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes); // json
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try { // JSON 파일을 buffer로 가져와서 다시 JSON으로 변환 후 객체로 변환
        const dataBuffer = fs.readFileSync('notes.json'); // buffer
        const dataJSON = dataBuffer.toString(); // JSON (string)
        return JSON.parse(dataJSON); // object
    } catch (e) { // error, 파일 없을 시
       return []; // empty array
    }
}

const addNote = (title, body) => {
    const notes = loadNotes(); // array(object). 덮어쓰지 않고 원래 있던 객체 가져옴.

    // 반복 돌면서 중복 몇개인지 세기
    //const duplicateNotes = notes.filter((note) => note.title === title);// 이름 중복인지 확인
    const duplicateNote = notes.find((note) => note.title === title);

    debugger

    if (!duplicateNote) { // 중복 없음
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes); // 원본에 추가한것 저장
        console.log(chalk.bgGreen('New note added!'));
    } else { // 하나라도 있으면
        console.log(chalk.bgRed(`${duplicateNote.title} Note title taken.`));
    }
}

const removeNote = (title) => { // 노트 삭제
    const notes = loadNotes();
    
    // 삭제할 노트의 제목 아닌 것들만 저장 
    const notesToKeep = notes.filter((note) => note.title !== title) 

    if (JSON.stringify(notesToKeep) !== JSON.stringify(notes)) // 삭제된게 있다면
    {
        saveNotes(notesToKeep);
        console.log(chalk.bgGreen(`<<${title}>> note removed!`));
    }

    else // 없다면
    {
        console.log(chalk.bgRed('No note found!'));
    }
}

const listNotes = () => { // 전체 노트 출력
    const notes = loadNotes();
    console.log(chalk.bgGreen('Notes List.'));
    notes.forEach(note => {
        console.log(note);
    });
}

const readNote = (title) => {
    const notes = loadNotes(); // 객체
    const result = notes.find((note) => { // contain obj
        return note.title === title;
    })
    if (!result)
        console.log(chalk.bgRed('no such note.'));
    else {
        console.log(chalk.bgBlue('read note.'));
        console.log(result);
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};