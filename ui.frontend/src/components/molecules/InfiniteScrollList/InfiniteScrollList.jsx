import React, { useEffect, useState } from 'react';

const InfiniteScrollList = props => {
    const {
        children,
        next,
        hasMore,
        loader,
        el
    } = props;
    const [currentPage, setCurrentPage] = useState(1);

    const onScroll = () => {
        if((el.current.scrollTop + el.current.clientHeight) >= (el.current.scrollHeight)) {
            if(!loader) {
                next(currentPage);
                setCurrentPage(currentPage + 1);
            }
        }
    };

    useEffect(() => {
        if(hasMore) {
            return()=>{
                el.removeEventListener();
            }
            
        }
        // return () => el.current.removeEventListener('scroll', onScroll);
        
    },);

    useEffect(() => {
        el.current.addEventListener('scroll', onScroll)
        return()=> {
            el.removeEventListener();

        }
        // return () => el.current.removeEventListener('scroll', onScroll)
        
    });

    return (<>
        <div className={'cp-infinite-scroll'}>
            {children}
        </div>
    </>);
};

export default InfiniteScrollList;
