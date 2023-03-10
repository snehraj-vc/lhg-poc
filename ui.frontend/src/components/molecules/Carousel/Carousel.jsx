import React, { useState, useEffect, useRef, createRef } from 'react';
import './style.scss';
import useIntersection from '../../../utils/useIntersection';

const Carousel = props => {
    const {
        autoplay = false,
        autoPlayWithProgressBar = false,
        secondsPerSlide = 0,
        onSlideChangeCallback = () => null,
        children
    } = props;
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
        if(autoplay) {
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
                    if (currIndex !== length - 1) {
                        next();
                        runTimer(currIndex + 1);
                    } else {
                        //REPEATING CYCLE
                        setCurrentIndex(0);
                        progressBarRef.current.forEach(ref => {
                            ref.current.style.width = `0%`;
                        });
                        runTimer(0);

                    }
                    return;
                }
                initTime += 100;
                if (autoPlayWithProgressBar) {
                    progressBarRef.current[currIndex].current.style.width = `${parseInt(initTime / targetTime * 100)}%`;
                }
            }, 100);
        }
        runTimer(slideIdx);
    }

    useEffect(() => {
        if (autoplay && inViewport && !autoplayStarted) {
            
        }
        
    }, [autoplay, autoplayStarted, autoPlayWithProgressBar, inViewport])
    
    initiateAutoplay();

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
                        <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 85}%) translateX(-${currentIndex * 20}px)` }}>
                            {children}
                        </div>
                    </div>
                    {/* {currentIndex < (length - 1) && <button  onClick={next} className="right-arrow">
                        &gt;
                    </button>} */}
                </div>
                {autoplay && autoPlayWithProgressBar && <div className={"progress-bar-wrapper"}>
                    {
                        children.map((el, idx) => {
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
            </div>
        </>
    )
}

export default Carousel;