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
        maxDate
    } = props;

    return (
        <>
            <div class={`cp-datepicker-segment`}>
                {labelText && <Label id={name} text={labelText} />}
                <Datepicker
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