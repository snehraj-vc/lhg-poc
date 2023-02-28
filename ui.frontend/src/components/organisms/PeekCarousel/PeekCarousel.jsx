import React, {useRef} from 'react';
import {Carousel} from '../../molecules';
import './style.scss';

const PeekCarousel = props => {
    const {
        customcarousel = []
    } = props;

    const videosRef = useRef([]);

    const getCarouselItems = () => {
        const videoExtns = ['mp4', 'wmv'];

        const checkVideo = (fileName) => {
            const extn = fileName.split('.').pop();
            return videoExtns.indexOf(extn) > -1;
        }

        const items = customcarousel.map((item, idx) => {
            const {
                title,
                description,
                videopath,
            } = item;
            return (
                <div className={'item-wrapper'} key={idx}>
                    <div className="picture-wrapper">
                        {checkVideo(videopath) ?
                            (<video ref={cont => {
                                videosRef.current[idx] = cont;
                            }} id={`item-video-${idx}`} muted="muted">
                                <source src={videopath} type="video/mp4" />
                            </video>) : <img src={videopath} alt={title} />}
                    </div>
                    <div className="content-wrapper">
                        <div className="title">{title}</div>
                        <div className="description">{description}</div>
                    </div>
                </div>
            )
        });
        return items;
    };

    const slideShift = (slideNo) => {
        videosRef.current.forEach(vid => {
            if (vid) {
                vid.pause();
            }
        })
        if (videosRef.current[slideNo]) {
            videosRef.current[slideNo].play();
        }
    }

    return (<>
        <div className="cp-peek-carousel">
            <Carousel
                autoplay={false}
                autoPlayWithProgressBar={false}
                secondsPerSlide={0}
                onSlideChangeCallback={slideShift}
            >
                {getCarouselItems()}
            </Carousel>
        </div>
    </>)
}

export default PeekCarousel;