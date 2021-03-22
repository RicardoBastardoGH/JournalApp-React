import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activateNote, startDeletingNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active: activeNote } = useSelector(state => state.notes);
    const [ formValues, handleInputChange, reset ] = useForm( activeNote );
    const { title, body, url, id } = formValues;

    const activeId = useRef( activeNote.id );

    // para mostrar en el noteScreen la nota activa seleccionada cuando cambie
    useEffect(() => {
        
        if( activeId.current !== activeNote.id ){
            
            reset( activeNote );
            activeId.current = activeNote.id;
        }
    }, [ activeNote, reset])

    useEffect(() => {
        
        dispatch( activateNote( formValues.id, { ...formValues }) )

    }, [formValues, dispatch])

    const handleDelete = () => {

        dispatch( startDeletingNote( id ) );
    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text" 
                    placeholder="Some awasome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name = "title"
                    value = { title }
                    onChange= { handleInputChange }
                />

                <textarea
                    placeholder="What happend today"
                    className="notes__text-area"
                    name = "body"
                    value = { body }
                    onChange= { handleInputChange }
                ></textarea>

                {
                    (activeNote.url)
                    &&
                    <div className="notes__image">
                        <img 
                            src={ url }
                            alt="imagen"
                        />
                    </div>
                }

            </div>
            
            <button
                className= "btn btn-danger"
                onClick= { handleDelete }
            >
                Delete
            </button>
        </div>
    )
}
