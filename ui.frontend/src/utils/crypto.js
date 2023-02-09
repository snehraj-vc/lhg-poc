import Cryptr from 'cryptr';
import {ENCRYPTION_KEY} from './constants';

const crypto = () => {
    const crpt = new Cryptr(ENCRYPTION_KEY);

    const encrpt = (text) => {
        return crpt.encrypt(text);
    }

    const decrpt = (text) => {
        return crpt.decrypt(text);
    }
    return {
        encrpt,
        decrpt
    }
}
export default crypto;
