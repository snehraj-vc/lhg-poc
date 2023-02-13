import Cryptr from 'cryptr';
import {ENCRYPTION_KEY} from './constants';

const crypto = () => {
    const crpt = new Cryptr(ENCRYPTION_KEY, { pbkdf2Iterations: 10000, saltLength: 10 });

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
