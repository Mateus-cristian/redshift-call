import React from 'react'
import Calendar from '../../../../../components/Calendar/index.page'
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from './styles'

export default function CalendarStep() {

    const isDateSelected = true;

    return (
        <Container isTimePickerOpen={isDateSelected}>
            <Calendar />
            {isDateSelected && (
                <TimePicker >
                    <TimePickerHeader>
                        terça-feira <span>20 de setembro</span>
                    </TimePickerHeader>

                    <TimePickerList>
                        <TimePickerItem>00:00h</TimePickerItem>
                        <TimePickerItem>01:00h</TimePickerItem>
                        <TimePickerItem>02:00h</TimePickerItem>
                        <TimePickerItem>03:00h</TimePickerItem>
                        <TimePickerItem>04:00h</TimePickerItem>
                        <TimePickerItem>05:00h</TimePickerItem>
                        <TimePickerItem>06:00h</TimePickerItem>
                        <TimePickerItem>07:00h</TimePickerItem>
                        <TimePickerItem>08:00h</TimePickerItem>
                        <TimePickerItem>09:00h</TimePickerItem>
                        <TimePickerItem>10:00h</TimePickerItem>
                        <TimePickerItem>11:00h</TimePickerItem>
                        <TimePickerItem>12:00h</TimePickerItem>
                        <TimePickerItem>13:00h</TimePickerItem>
                        <TimePickerItem>14:00h</TimePickerItem>
                        <TimePickerItem>15:00h</TimePickerItem>
                        <TimePickerItem>16:00h</TimePickerItem>
                        <TimePickerItem>17:00h</TimePickerItem>
                        <TimePickerItem>18:00h</TimePickerItem>
                        <TimePickerItem>19:00h</TimePickerItem>
                        <TimePickerItem>20:00h</TimePickerItem>
                        <TimePickerItem>21:00h</TimePickerItem>
                        <TimePickerItem>22:00h</TimePickerItem>
                        <TimePickerItem>23:00h</TimePickerItem>
                        <TimePickerItem>24:00h</TimePickerItem>
                        <TimePickerItem>00:00h</TimePickerItem>
                    </TimePickerList>
                </TimePicker>
            )}
        </Container>
    )
}

