import React, {useState, useEffect} from 'react';
import { Datepicker } from '../../atoms';

const CheckInDateRangePicker = (props) => {
    const {} = props;
    const DAY_SECONDS = (1000 * 60 * 60 * 24);
    const startDate = new Date();
    let endDate = new Date();
    endDate.setTime(startDate.getTime() + DAY_SECONDS);
    const [checkInDate, setCheckInDate] = useState(startDate);
    const [minCheckOutDate, setMinCheckOutDate] = useState(endDate);
    const [checkOutDate, setCheckOutDate] = useState(endDate);

    useEffect(() => {

    }, []);

    const getNightCount = () => {
        let totalNights = checkOutDate.getTime() - checkInDate.getTime();
        totalNights = Math.ceil(totalNights / DAY_SECONDS);
        if(totalNights < 2) {
            return totalNights + ' night';
        }
        else {
            return totalNights + ' nights';
        }
    }

    const selectCheckInDate = (d) => {
        let newCheckoutDate = new Date(d);
        newCheckoutDate.setTime(d.getTime() + DAY_SECONDS);
        setCheckInDate(d);
        setMinCheckOutDate(newCheckoutDate);
        if(newCheckoutDate.getTime() >= checkOutDate.getTime()) {
            setCheckOutDate(newCheckoutDate);
        }
    };

    const selectCheckOutDate = (d) => {
        setCheckOutDate(new Date(d));
    }
    return (<>
        <Datepicker
            minDate={startDate}
            onDateChange={selectCheckInDate}
        />

        Total Nights: {getNightCount()}

        <Datepicker
            minDate={minCheckOutDate}
            onDateChange={selectCheckOutDate}
        />
    </>)
};

export default CheckInDateRangePicker;