import React, { useState, useEffect, useRef, createRef } from 'react';
import './style.scss';
import useIntersection from '../../../utils/useIntersection';
import { isMobile, isTablet, isDesktop } from '../../../utils';

const Carousel = props => {
    const {
        autoplay = false,
        autoPlayWithProgressBar = false,
        secondsPerSlide = 0,
        progressBarType = "none",
        onSlideChangeCallback = () => null,
        isInfinite = false,
        children
    } = props;
    const pgBar = ['grpSlider', 'indSlider'].indexOf(progressBarType) > -1 ? progressBarType : 'none';
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null);
    const [autoplayStarted, setAutoplayStarted] = useState(false);
    const [length, setLength] = useState(children.length);
    const elRef = useRef(null);
    const progressBarRef = useRef(children.map(() => createRef()));
    const inViewport = useIntersection(elRef);

    useEffect(() => {
        setLength(children.length);
    }, [children]);

    const next = () => {
        if (currentIndex < (length - 1)) {
            setCurrentIndex(prevState => {
                onSlideChangeCallback(prevState + 1);
                return prevState + 1;
            });
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => {
                onSlideChangeCallback(prevState - 1);
                return prevState - 1;
            });
        }
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown)
    }
    const handleTouchMove = (e) => {
        if (autoplay) {
            return;
        }
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            next();
        }

        if (diff < -5) {
            prev();
        }

        setTouchPosition(null);
    }

    const initiateAutoplay = (slideIdx = 0) => {
        setAutoplayStarted(true);
        const runTimer = (currIndex) => {
            let initTime = 0;
            const targetTime = 1000 * secondsPerSlide;
            const timerInterval = setInterval(() => {
                if (initTime >= targetTime) {
                    clearInterval(timerInterval);
                    if (currIndex !== length - (isMobile() ? 1 : 2)) {
                        next();
                        runTimer(currIndex + 1);

                    } else {
                        //REPEATING CYCLE
                        if (isInfinite) {
                            setCurrentIndex(0);
                            if (pgBar === 'indSlider') {
                                progressBarRef.current.forEach(ref => {
                                    if(ref) {
                                        ref.current.style.width = `0%`;
                                    }
                                });
                            }
                            runTimer(0);
                        }
                    }
                    return;
                }
                initTime += 100;
                if (autoPlayWithProgressBar && pgBar === 'indSlider' && progressBarRef.current[currIndex].current) {
                    progressBarRef.current[currIndex].current.style.width = `${parseInt(initTime / targetTime * 100)}%`;
                }
            }, 100);
        }
        runTimer(0);
    }

    useEffect(() => {
        if (autoplay && inViewport && !autoplayStarted) {
            initiateAutoplay();
        }
    }, [autoplay, autoPlayWithProgressBar, inViewport, elRef]);

    const getTransformOnDevice = () => {
        if (isMobile()) {
            return {
                transform: `translateX(-${currentIndex * 85}%) translateX(-${currentIndex * 20}px)`
            }
        } else if (isTablet()) {
            return {
                transform: `translateX(-${currentIndex * 40}%) translateX(-${currentIndex * 20}px)`
            }
        }
        return {
            transform: `translateX(-${currentIndex * 25}%) translateX(-${currentIndex * 20}px)`
        }
    }

    return (
        <>
            <div className={'cp-carousel'} ref={elRef}>
                <div className="carousel-wrapper">
                    {/* {currentIndex > 0 && <button onClick={prev} className="left-arrow">
                        &lt;
                    </button>} */}
                    <div className="carousel-content-wrapper"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    >
                        <div className="carousel-content" style={getTransformOnDevice()}>
                            {children}
                        </div>
                    </div>
                    {/* {currentIndex < (length - 1) && <button  onClick={next} className="right-arrow">
                        &gt;
                    </button>} */}
                </div>
                {autoplay && autoPlayWithProgressBar && progressBarType === 'indSlider' && <div className={"progress-bar-wrapper"}>
                    {
                        children.map((el, idx) => {
                            if((isTablet() || isDesktop()) && idx === children.length - 1) {
                                return null;
                            }
                            return (
                                <span key={idx} className={'progress-bar'} style={{
                                    width: `calc(${100 / length}% - 4px)`
                                }}>
                                    <span ref={progressBarRef.current[idx]} className={'progress-denote'}></span>
                                </span>
                            )
                        })
                    }
                </div>}
                {autoplay
                    && autoPlayWithProgressBar
                    && pgBar === 'grpSlider'
                    && <div className={"progress-bar-wrapper"}>
                        {!(isTablet() || isDesktop()) &&  `${currentIndex + 1} / ${children.length}`}
                        <div className="slider-bar">
                            <span className="slider-bar-filled" style={{
                                width: `${(currentIndex + 1) / (children.length - ((isTablet() || isDesktop()) ? 1 : 0)) * 100}%`
                            }}></span>
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default Carousel;