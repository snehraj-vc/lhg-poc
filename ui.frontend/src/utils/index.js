export const setLocal = (key, val) => {
    localStorage.setItem(key, val);
}

export const getLocal = (key) => {
    return localStorage.getItem(key);
}

export const setSession = (key, val) => {
    sessionStorage.setItem(key, val);
}

export const getSession = (key) => {
    return sessionStorage.getItem(key);
}

export const setIntl = (intlVals) => {
    setSession('intl', JSON.stringify(intlVals));
}

export const getIntl = () => {
    const intlVals = getSession('intl');
    if(intlVals) {
        return JSON.parse(intlVals);
    }
    return false;
}
