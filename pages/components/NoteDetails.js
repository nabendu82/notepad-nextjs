import { database } from '../../firebaseConfig';
import { doc, getDoc, getDocs, collection, updateDoc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styles from '../../styles/Notepad.module.css'

const NoteDetails = ({ ID }) => {
    const [singleNote, setSingleNote] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDesc, setNoteDesc] = useState('');

    const dbInstance = collection(database, 'notes');

    useEffect(() => {
        getSingleNote();
    }, [ID])

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setSingleNote(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })[0]);
            })
    }

    const getSingleNote = async () => {
        if (ID) {
            const singleNote = doc(database, 'notes', ID)
            const data = await getDoc(singleNote)
            setSingleNote({ ...data.data(), id: data.id })
        }
    }

    const getEditData = () => {
        setIsEdit(true);
        setNoteTitle(singleNote.noteTitle);
        setNoteDesc(singleNote.noteDesc)
    }

    const editNote = (id) => {
        const collectionById = doc(database, 'notes', id)

        updateDoc(collectionById, {
            noteTitle: noteTitle,
            noteDesc: noteDesc,
        })
            .then(() => {
                window.location.reload()
            })
    }

    const deleteNote = (id) => {
        const collectionById = doc(database, 'notes', id)

        deleteDoc(collectionById)
            .then(() => {
                window.location.reload()
            })
    }

    return (
        <>
            <div>
                <button
                    className={styles.editBtn}
                    onClick={getEditData}
                >Edit
                </button>
                <button
                    className={styles.deleteBtn}
                    onClick={() => deleteNote(singleNote.id)}
                >Delete
                </button>
            </div>
            {isEdit && (
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        placeholder='Enter the Title..'
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}
                    />
                    <div className={styles.textarea}>
                        <textarea className={styles.textarea} value={noteDesc} onChange={e => setNoteDesc(e.target.value)} placeholder="Enter the post"></textarea>
                    </div>
                    <button
                        onClick={() => editNote(singleNote.id)}
                        className={styles.saveBtn}>
                        Update Note
                    </button>
                </div>
            )}
            <h2>{singleNote.noteTitle}</h2>
            <p>{singleNote.noteDesc}</p>
        </>
    )
}

export default NoteDetails