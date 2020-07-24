function showNotes(){
    const list = document.getElementById('list');
    const notes = { ...localStorage };
    Object.entries(notes).map(ele => {
        const time = '' + ele[0];
        const note = JSON.parse(ele[1]);
        var note_div = document.createElement('div');
        note_div.classList.add('note');
        note_div.setAttribute("onclick", `showModal('${time}')`);
        let el = `<h3>${note.title}</h3>
            <hr id="divider">
            <p>${note.desc}</p>`
        note_div.innerHTML = el;
        list.appendChild(note_div);       
    });
}

function showModal(id){
    const modal = document.getElementById('modal');
    const title = document.getElementById('title');
    const desc = document.getElementById('desc');
    const noteTime = document.getElementById('note-time');
    modal.style.visibility = 'visible';  
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    const note = JSON.parse(localStorage.getItem(id)) ;

    if(id !== '-1'){
        title.value = note.title;
        desc.value = note.desc;
        noteTime.innerText = id;    
        document.getElementById('del-btn').style.display = 'inline-block';
    }  
    else{
        title.value = '';
        desc.value = '';
        noteTime.innerText = '';
        document.getElementById('del-btn').style.display = 'none';
    }
}

function closeNote(){
    const modal = document.getElementById('modal');
    modal.style.visibility = 'hidden';
    document.getElementsByTagName('body')[0].style.overflow = 'visible';
}

function saveNote(){
    const title = document.getElementById('title');
    const desc = document.getElementById('desc');
    let note = {
        title : title.value,
        desc : desc.value,
    }

    if(note.title === '' || note.desc === ''){
        alert('Fields cannot be empty :(');
    }
    else{
        let str = '' + new Date().toLocaleString();
        localStorage.setItem(str, JSON.stringify(note));
        location.reload();
    }
}

function deleteNote(){
    const noteTime = document.getElementById('note-time');
    const id = noteTime.innerText;

    localStorage.removeItem(id);
    location.reload();
}
