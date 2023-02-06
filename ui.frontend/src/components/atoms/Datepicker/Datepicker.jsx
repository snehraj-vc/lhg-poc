import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
// import DatePicker from 'react-date-picker/dist/entry.nostyle';
// import 'react-datepicker/dist/react-datepicker.css';

const Datepicker = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const {
        onDateChange = () => null,
        name = "",
        className = "",
        dateFormat = 'dd-MM-yy',
        locale="en",
        disableCalendar = false,
        minDate,
        maxDate,
    } = props;

    const setDate = (date) => {
        setStartDate(date);
        onDateChange(date, name)
    }
    return (<>
        <div className={`cp-datepicker`} date-name={name}>
            <DatePicker
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