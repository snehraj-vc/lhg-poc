import React from 'react';
import { Label, Datepicker } from '../../atoms';

const DatepickerSegment = (props) => {
    const {
        labelText = "",
        name="",
        onDateChange,
        locale,
        disableCalendar,
        minDate,
        maxDate,
        id=""
    } = props;

    return (
        <>
            <div className={`cp-datepicker-segment`}>
                {labelText && <Label id={name} text={labelText} />}
                <Datepicker
                    id={id}
                    name={name}
                    onDateChange={onDateChange}
                    locale={locale}
                    minDate={minDate}
                    maxDate={maxDate}
                    disableCalendar={disableCalendar}
                />
            </div>
        </>
    );
};

export default DatepickerSegment;