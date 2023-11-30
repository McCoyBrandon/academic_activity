import React, { useEffect, useState } from "react";
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
    background: 'linear-gradient(45deg, #6DD5FA, #FF758C)', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledButton = styled(Button)({
    marginBottom: '20px',
    fontWeight: 'bold',
    background: '#4C51BF', 
    '&:hover': {
        background: '#667EEA', 
    },
});
const CalendarContainer = styled('div')({
    boxShadow: '0 10px 25px 0 rgba(0, 0, 0, 0.1)', 
    borderRadius: '20px', 
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: '20px',
    width: '80%', 
    height: '80vh', 
});

function getRandomTime() {
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    return {
        hours: randomHour,
        minutes: randomMinutes,
    };
}

export default function ReactBigCalendar() {
    const [eventsData, setEventsData] = useState(events);
    const navigate = useNavigate();

    const handleSelect = ({ start, end }) => {
        const title = window.prompt("New Event name");
        if (title)
            setEventsData([...eventsData, { start, end, title }]);
    };

    useEffect(() => {
        fetch(`http://localhost:5038/api/user/viewAllTasksByperson?userID=${JSON.parse(localStorage.getItem("user_creds"))?._id}`)
            .then(response => response.json())
            .then(apiData => {
                const calendarData = apiData.map((item, index) => ({
                    id: index,
                    title: item.projectName,
                    start: new Date(item.startDate),
                    end: new Date(item.endDate),
                    desc: item.description,
                }));

                calendarData.forEach(event => {
                    const randomTime = getRandomTime();
                    event.start.setHours(randomTime.hours, randomTime.minutes);
                    event.end.setHours(randomTime.hours, randomTime.minutes + Math.floor(Math.random() * 60));
                });

                setEventsData(calendarData);
                console.log("eventsdata",eventsData);
            })
            .catch(error => {
                console.error("Error fetching data from API: ", error);
            });
    }, []);




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
                    onSelectEvent={(event) => alert(event.desc)}
                    onSelectSlot={handleSelect}
                    className="myCalendarClass"                />
            </CalendarContainer>
        </ProjectsPageDiv>
    );
}