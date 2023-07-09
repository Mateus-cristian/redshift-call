import React, { useState } from 'react'
import CalendarStep from './CalendarStep/index.page'
import ConfirmStep from './ConfirmStep'


export default function ScheduleForm() {

    const [selectedDateTime, setSelectDateTime] = useState<Date | null>()

    function handleClearSelectDateTime() {
        setSelectDateTime(null)
    }

    if (selectedDateTime) {
        return (
            <ConfirmStep schedulingDate={selectedDateTime} onCancelConfirmationStep={handleClearSelectDateTime} />
        )
    }

    return (
        <CalendarStep onSelectDateTime={setSelectDateTime} />
    )
}

