// import { useDispatch } from "react-redux"

import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

//  react-journal

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;
        
        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );

        dispatch( activateNote( doc.id, newNote ));

        dispatch( addNewNote(  doc.id, newNote  ));
    }
}

export const activateNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

// guardar nota en Firestore
export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;

        if( !note.url ){
            delete note.url;
        }

        // se crea la nota para borrar el id que no debe ir en el objeto del firestore
        const noteToFirestore = { ...note }
        delete noteToFirestore.id;

        try {
            await db.doc(`${uid}/journal/notes/${note.id}`).update( noteToFirestore );
    
            dispatch( refreshNotes( note.id, noteToFirestore) );
            Swal.fire('Saved', note.title, 'success');

            // dispatch( )
        } catch (error) {
            console.log(error)
            Swal.fire('Not Saved', note.title, 'error');
        }

       
    }
}

// actualiza solo la recien guardad en el store para ser mostrada en el sidebar
export const refreshNotes = ( id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})


export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {
        
        const { active: activeNote } = getState().notes

        Swal.fire({
            title: 'Uploading...',
            text: 'Please Wait...',
            allowOutsideClick: false,
            
        });
        Swal.showLoading();

        // retorna el secure_url de cloudinary
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) )
    
        Swal.close();
    }
}

export const startDeletingNote = ( id ) => {
    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid;

        const resp = await db.doc(`${uid}/journal/notes/${id}`).delete();

        console.log('resp: ',resp);
        dispatch( deleteNote( id ) );
    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
})

// limpia el state cuando se hace el logout
export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})