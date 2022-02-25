import { useEffect, useState } from 'react';
import styles from '../../styles/Notepad.module.css'
import { database } from '../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const NoteOperations = ({ getSingleNote }) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [isInputVisible, setInputVisible] = useState(false);
    const [noteDesc, setNoteDesc] = useState('')
    const dbInstance = collection(database, 'notes');
    const [notesArray, setNotesArray] = useState([]);

    useEffect(() => {
        getNotes();
    }, [])

    const inputToggle = () => {
        setInputVisible(!isInputVisible);
    }

    const saveNote = () => {
        addDoc(dbInstance, {
            noteTitle: noteTitle,
            noteDesc: noteDesc
        }).then(() => {
            setNoteTitle('')
            setNoteDesc('')
            getNotes()
        })
    }

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setNotesArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }));
            })
    }

    return (
        <>
            <button onClick={inputToggle} className={styles.button}>Add a New Note</button>
            {isInputVisible && (
                <>
                    <input className={styles.input} placeholder="Enter the Title" type="text" value={noteTitle} onChange={e => setNoteTitle(e.target.value)} />
                    <textarea className={styles.textarea} value={noteDesc} onChange={e => setNoteDesc(e.target.value)} placeholder="Enter the post"></textarea>
                    <button
                        onClick={saveNote}
                        className={styles.saveBtn}>
                        Save Note
                    </button>

                </>
            )}
            {notesArray.map((note) => {
                return (
                    <div className={styles.notesInner} key={note.id} onClick={() => getSingleNote(note.id)}>
                        <h3>{note.noteTitle}</h3>
                        <p>{note.noteDesc}</p>
                    </div>
                )
            })}
        </>
    )
}

export default NoteOperations