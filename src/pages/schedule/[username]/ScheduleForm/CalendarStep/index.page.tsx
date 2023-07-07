import React, { useEffect, useState } from 'react'
import Calendar from '../../../../../components/Calendar/index.page'
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from './styles'
import dayjs from 'dayjs';
import { api } from '../../../../../lib/axios';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';


interface Avaiability {
    possibleTimes: number[];
    availableTimes: number[];
}

export default function CalendarStep() {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    // const [availability, setAvailability] = useState<Avaiability | null>(null)
    const router = useRouter()

    const isSelectedDate = !!selectedDate;
    const username = String(router.query.username);

    const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
    const describedDate = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null

    const selectedDateWithoutTime = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null

    const { data: availability } = useQuery<Avaiability>(['availability', selectedDateWithoutTime],
        async () => {
            const response = await api.get(`/users/${username}/availability`, {
                params: {
                    date: selectedDateWithoutTime
                }
            })

            return response.data
        }, {
        enabled: !!selectedDate,
    })


    return (
        <Container isTimePickerOpen={isSelectedDate}>
            <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
            {isSelectedDate && (
                <TimePicker >
                    <TimePickerHeader>
                        {weekDay} <span>{describedDate}</span>
                    </TimePickerHeader>

                    <TimePickerList>
                        {availability?.possibleTimes.map((hour) => (
                            <TimePickerItem key={hour} disabled={!availability.availableTimes.includes(hour)}>
                                {String(hour).padStart(2, '0')}:00h
                            </TimePickerItem>
                        ))}
                    </TimePickerList>
                </TimePicker>
            )}
        </Container>
    )
}

