import React from 'react'
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch } from 'react-redux';
import { activateNote } from '../../actions/notes';

export const JournalEntry = ( { id, date, title, body, url } ) => {
    
    const noteDate = moment(date)

    const dispatch = useDispatch();

    const handleEntryClick = (e) => {
        e.preventDefault();
        dispatch( activateNote(id, { date, title, body, url }) );
    }

    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={ handleEntryClick }    
        >
            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                        // backgroundImage: 'url(https://i0.wp.com/www.oakridge.in/wp-content/uploads/2020/02/Sample-jpg-image-500kb.jpg)'
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>
            <div className="journal__entry-date-box">
            <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}
