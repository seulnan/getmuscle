import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import ActivityModal from './ActivityModal';
import Toolbar from './Toolbar';
import 'react-calendar/dist/Calendar.css';
import './CalendarComponent.css';

interface Activities {
    [date: string]: string;
}
const CalendarComponent: React.FC = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [activities, setActivities] = useState<Activities>(() => {
        const savedActivities = localStorage.getItem('activities');
        return savedActivities ? JSON.parse(savedActivities) : {};
    });

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(activities));
    }, [activities]);

    const onDateClick = (value: Date | Date[], event: React.MouseEvent<HTMLButtonElement>) => {
        if (value && !Array.isArray(value)) {
            setDate(value);
            setModalIsOpen(true);
        }
    };

    const onChooseActivity = (activity: string) => {
        if (date) {
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            const dateString = format(localDate, 'yyyy-MM-dd');

            setActivities({
                ...activities,
                [dateString]: activity,
            });
            setModalIsOpen(false);
        }
    };

    return (
        <div>
            <h1>Calendar</h1>
            <Calendar
                onChange={(value, event) => onDateClick(value as Date | Date[], event as React.MouseEvent<HTMLButtonElement>)}
                value={date}
                formatDay={(locale, date) => `${date.getDate()}`}
                onClickDay={(value, event) => onDateClick(value, event as React.MouseEvent<HTMLButtonElement>)}
                tileContent={({ date, view }) =>
                    view === 'month' ? (
                        <div className="tile-content">
                            {activities[format(date, 'yyyy-MM-dd')] && (
                                <p>{activities[format(date, 'yyyy-MM-dd')]}</p>
                            )}
                        </div>
                    ) : null
                }
                showNeighboringMonth={false}
            />
            <ActivityModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onChooseActivity={onChooseActivity}
            />
            <Toolbar/>
            </div>
    );
};

export default CalendarComponent; 
