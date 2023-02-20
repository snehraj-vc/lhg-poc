import React, { useState } from 'react';
import DatePicker from 'react-date-picker';

const Datepicker = (props) => {
    const {
        onDateChange = () => null,
        name = "",
        className = "",
        dateFormat = 'dd-MM-yy',
        locale="en",
        disableCalendar = false,
        minDate,
        id="",
        maxDate,
    } = props;
    const [startDate, setStartDate] = useState(new Date());

    const setDate = (date) => {
        setStartDate(date);
        onDateChange(date, name)
    }
    return (<>
        <div className={`cp-datepicker`} date-name={name}>
            <DatePicker
                id={id}
                value={startDate}
                onChange={(d) => setDate(d)}
                className={className}
                format={dateFormat}
                locale={locale}
                disableCalendar={disableCalendar}
                minDate={minDate}
                maxDate={maxDate}
            />
        </div>
    </>);
};

export default Datepicker;