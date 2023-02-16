import { useEffect } from 'react';
import { setIntl, getIntl } from '../../../utils';

const Intl = (props) => {
    const {
        intl
    } = props;

    useEffect(() => {
        if (intl) {
            setIntl(intl);
        }
    }, [intl]);

    return null;
};

export default Intl;