import React, { useMemo, useState } from 'react'
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from './styles'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '../../utils/get-week-days'
import dayjs from 'dayjs'


interface CalendarWeek {
    week: number;
    days: Array<{
        date: dayjs.Dayjs,
        disabled: boolean
    }>
}

type CalendarWeeks = CalendarWeek[];

function Calendar() {

    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs().set('date', 1)
    })

    const shortWeekDays = getWeekDays({ short: true })


    function handlePreviousMonth() {
        const previousMonthDate = currentDate.subtract(1, 'month')
        setCurrentDate(previousMonthDate)
    }

    function handleNextMonth() {
        const nextMonthDate = currentDate.add(1, 'month')
        setCurrentDate(nextMonthDate)
    }

    const currentMonth = currentDate.format('MMMM');
    const currentYear = currentDate.format('YYYY');

    const calendarWeeks = useMemo(() => {
        const daysInMonthArray = Array.from({
            length: currentDate.daysInMonth(),
        }).map((_, i) => {
            return currentDate.set('date', i + 1)
        })
        const firstWeekDay = currentDate.get('day');

        const lastDayInCurrentMonth = currentDate.set('date', currentDate.daysInMonth())
        const lastWeekDay = lastDayInCurrentMonth.get('day');

        const previousMonthFillArray = Array.from({
            length: firstWeekDay,
        }).map((_, i) => {
            return currentDate.subtract(i + 1, 'day');
        }).reverse();

        const nextMonthFillArray = Array.from({
            length: 7 - (lastWeekDay + 1),
        }).map((_, i) => {
            return lastDayInCurrentMonth.add(i + 1, 'day');
        });

        const calendarDays = [
            ...previousMonthFillArray.map(date => {
                return { date, disabled: true }
            }),
            ...daysInMonthArray.map(date => {
                return { date, disabled: false }
            }),
            ...nextMonthFillArray.map(date => {
                return { date, disabled: true }
            }),
        ];

        const calendarWeeks = calendarDays.reduce<CalendarWeeks>((weeks, _, i, original) => {
            const isNewWeek = i % 7 === 0;

            if (isNewWeek) {
                weeks.push({
                    week: i / 7 + 1,
                    days: original.slice(i, i + 7), //faz um push no array, separando o index e o index + 7
                });
            }

            return weeks;
        }, [])



        return calendarWeeks;
    }, [currentDate])



    return (
        <CalendarContainer>
            <CalendarHeader>
                <CalendarTitle>{currentMonth} <span>{currentYear}</span></CalendarTitle>

                <CalendarActions>
                    <button title='previousMonth' onClick={handlePreviousMonth}>
                        <CaretLeft />
                    </button>
                    <button title='nextMonth' onClick={handleNextMonth}>
                        <CaretRight />
                    </button>
                </CalendarActions>
            </CalendarHeader>

            <CalendarBody>
                <thead>
                    <tr>
                        {shortWeekDays.map(weekday => <th key={weekday}>{weekday}.</th>)}
                    </tr>
                </thead>

                <tbody>
                    {calendarWeeks.map(({ week, days }) => (
                        <tr key={week}>
                            {days.map(({ date, disabled }) => (
                                <td key={date.toString()}>
                                    <CalendarDay disabled={disabled}>{date.get('date')}</CalendarDay>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </CalendarBody>
        </CalendarContainer>
    )
}

export default Calendar