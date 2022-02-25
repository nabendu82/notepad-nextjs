import Head from 'next/head'
import NoteOperations from './components/NoteOperations'
import styles from '../styles/Notepad.module.css'
import { useState } from 'react';
import NoteDetails from './components/NoteDetails';

export default function Home() {
  const [ID, setID] = useState(null);

  const getSingleNote = id => {
    setID(id);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Notepad Clone</title>
        <meta name="description" content="Notepad Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
        <div className={styles.left}>
          <NoteOperations getSingleNote={getSingleNote} />
        </div>
          <div className={styles.right}>
            <NoteDetails ID={ID} />
          </div>
        </div>
      </main>
    </div>
  )
}
