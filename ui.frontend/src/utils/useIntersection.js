import { useState, useEffect } from 'react'

const useIntersection = (element, rootMargin = '0px') => {
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        // const observer = new IntersectionObserver(
        //     ([entry]) => {
        //         setVisible(entry.isIntersecting);
        //     }, { rootMargin }
        // );

        // element.current && observer.observe(element.current);

        // return () => observer.unobserve(element.current);
        const connection=IntersectionObserver(setVisible,rootMargin);
        connection.observer();
        return()=>{
            connection.unobserver();
        };
    },[isVisible,rootMargin]);

    // return isVisible;
};

export default useIntersection;