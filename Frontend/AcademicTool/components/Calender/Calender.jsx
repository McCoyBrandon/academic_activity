import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled from '@emotion/styled';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Calender.css"

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const ProjectsPageDiv = styled('div')({
    padding: '0px 20px',
    animation: 'fadeIn 1s ease-in-out',
    background: 'linear-gradient(45deg, #6DD5FA, #FF758C)', // Updated gradient colors
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledButton = styled(Button)({
    marginBottom: '20px',
    fontWeight: 'bold',
    background: '#4C51BF', // Custom button color
    '&:hover': {
        background: '#667EEA', // Custom hover color
    },
});
const CalendarContainer = styled('div')({
    boxShadow: '0 10px 25px 0 rgba(0, 0, 0, 0.1)', // Enhanced shadow
    borderRadius: '20px', // Rounded corners
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // 50% transparent white background
    padding: '20px',
    width: '80%', // Adjusted width
    height: '80vh', // Adjusted height
});

export default function ReactBigCalendar() {
    const [eventsData, setEventsData] = useState(events);
    const navigate = useNavigate();

    const handleSelect = ({ start, end }) => {
        const title = window.prompt("New Event name");
        if (title)
            setEventsData([...eventsData, { start, end, title }]);
    };

    return (
        <ProjectsPageDiv>
            <StyledButton
                variant="contained"
                onClick={() => navigate('/dashboard')}
            >
                Go to Dashboard
            </StyledButton>
            <CalendarContainer>
                <Calendar
                    views={["day", "agenda", "work_week", "month"]}
                    selectable
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={eventsData}
                    onSelectEvent={(event) => alert(event.title)}
                    onSelectSlot={handleSelect}
                    className="myCalendarClass"                />
            </CalendarContainer>
        </ProjectsPageDiv>
    );
}
