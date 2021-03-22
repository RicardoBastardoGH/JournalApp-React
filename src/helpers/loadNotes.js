import { db } from "../firebase/firebase-config"



export const loadNotes = async( uid ) => {
    
    // obteniendo la lista de de notas segun un id
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();

    const notes = [];

    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    } )

    return notes;
}