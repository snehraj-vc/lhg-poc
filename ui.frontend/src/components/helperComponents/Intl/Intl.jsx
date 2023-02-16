import { useEffect } from 'react';
import { setIntl, getIntl } from '../../../utils';

const Intl = (props) => {
    const {
        intl
    } = props;

    useEffect(() => {
        if (intl) {
            const intlItemSS = getIntl();
            if (!intlItemSS) {
                setIntl(intl);
            }
        }
    }, [intl]);

    return null;
};

export default Intl;