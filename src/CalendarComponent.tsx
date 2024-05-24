import React, { useState } from 'react';
import Calendar from 'react-calendar';
import ActivityModal from './ActivityModal';
import 'react-calendar/dist/Calendar.css';
import './CalendarComponent.css';

interface Activities {
    [date: string]: string;
}

const CalendarComponent: React.FC = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [activities, setActivities] = useState<Activities>({});

    const onDateClick = (value: Date | Date[], event: React.MouseEvent<HTMLButtonElement>) => {
        if (value && !Array.isArray(value)) {
            setDate(value);
            setModalIsOpen(true);
        }
    };

    const onChooseActivity = (activity: string) => {
        if (date) {
            setActivities({
                ...activities,
                [date.toISOString().split('T')[0]]: activity,
            });
            setModalIsOpen(false);
        }
    };

    return (
        <div>
            <Calendar
                onChange={(value, event) => onDateClick(value as Date | Date[], event as React.MouseEvent<HTMLButtonElement>)}
                value={date}
                formatDay={(locale, date) => `${date.getDate()}`}
                onClickDay={onDateClick}
                tileContent={({ date, view }) =>
                    view === 'month' && activities[date.toISOString().split('T')[0]] ? (
                        <p>{activities[date.toISOString().split('T')[0]]}</p>
                    ) : null
                }
            />
            <ActivityModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onChooseActivity={onChooseActivity}
            />
        </div>
    );
}

export default CalendarComponent;

