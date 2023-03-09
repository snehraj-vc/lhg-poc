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

let sessionVars = {
    sessionSet: false,
    attemptCount: 0,
    intlVals: {}
};

const updateIntlVals = () => {
    const intls = getSession('intl');
    sessionVars.intlVals = {
        ...JSON.parse(intls)
    };
};

window.addEventListener('updateIntl', () => {
    updateIntlVals();
});

export const setIntl = (intlVals) => {
    setSession('intl', JSON.stringify(intlVals));
    sessionVars.sessionSet = true;
}

export async function getIntl() {
    return new Promise((res, rej) => {
        const session = setInterval(() => {
            if(sessionVars.attemptCount > 50) {
                clearInterval(session)
                console.log('**** No Translation Component Found *****');
                res({});
            }
            if (sessionVars.sessionSet) {
                clearInterval(session);
                res(sessionVars.intlVals)
            }
            sessionVars.attemptCount++;
        }, 100);
    });
}

export const isMobile = () => {
    const width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;
    return width <= 767;
};

export const isTablet = () => {
    const width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;
    return width > 767 && width < 1400;
};

export const isDesktop = () => {
    const width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;
    return width >= 1280;

};

export const getViewport = () => {
    if(isMobile()) {
        return 'mobile';
    } else if(isTablet()) {
        return 'tablet';
    } else {
        return 'desktop';
    }
};