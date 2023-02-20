import React, { useEffect } from 'react';

const AuthLogout = (props) => {
    const {
        children
    } = props;

    const events = [
        "load",
        "mousemove",
        "mousedown",
        "click",
        "scroll",
        "keypress",
    ];
    let timer;

    // this function sets the timer that logs out the user after 10 secs
    const handleLogoutTimer = () => {
        timer = setTimeout(() => {
            // clears any pending timer.
            resetTimer();
            // Listener clean up. Removes the existing event listener from the window
            Object.values(events).forEach((item) => {
                window.removeEventListener(item, resetTimer);
            });
            // logs out user
            logoutAction();
        }, 10000); // 10000ms = 10secs. You can change the time.
    };

    // this resets the timer if it exists.
    const resetTimer = () => {
        if (timer) clearTimeout(timer);
    };

    // when component mounts, it adds an event listeners to the window
    // each time any of the event is triggered, i.e on mouse move, click, scroll, keypress etc, the timer to logout user after 10 secs of inactivity resets.
    // However, if none of the event is triggered within 10 secs, that is app is inactive, the app automatically logs out.
    useEffect(() => {
        const startTimer = () => {
            let userInfoLS = localStorage.getItem('userDataToken');
            if(userInfoLS) {
                userInfoLS = JSON.parse(userInfoLS);
                if(userInfoLS.step === 'loggedIn') {
                    Object.values(events).forEach((item) => {
                        window.addEventListener(item, () => {
                            resetTimer();
                            handleLogoutTimer();
                        });
                    });
                }
            }
        }
        window.addEventListener('loggedIn', () => {
            startTimer();
        });
        startTimer();
    });

    // logs out user by clearing out auth token in localStorage and redirecting url to /signin page.
    const logoutAction = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    };

    return (<>{children}</>);
};

export default AuthLogout;