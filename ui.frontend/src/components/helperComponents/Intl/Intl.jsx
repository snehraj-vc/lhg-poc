import { useEffect } from 'react';
import { setIntl } from '../../../utils';

const Intl = (props) => {
    const {
        intl
    } = props;

    useEffect(() => {
        if (intl) {
            setIntl(intl);
            window.dispatchEvent(new Event("updateIntl"));
        }
    }, [intl]);

    return null;
};

export default Intl;