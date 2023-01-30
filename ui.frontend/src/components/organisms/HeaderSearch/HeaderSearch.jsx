import React from 'react';

const HeaderSearch = (props) => {
    {console.log(props)}
    const {
        id = ""
    } = props;
    return (
        <div className="search">
        <section id="search-5827664789" className="cmp-search" role="search" data-cmp-min-length="3" data-cmp-results-size="10">
            <form className="cmp-search__form" data-cmp-hook-search="form" method="get" action="/content/lhgsite/us/en.searchresults.json/_jcr_content/root/search" autocomplete="off">
                <div className="cmp-search__field">
                    <i className="cmp-search__icon" data-cmp-hook-search="icon"></i>
                    <span className="cmp-search__loading-indicator" data-cmp-hook-search="loadingIndicator"></span>
                    <input className="cmp-search__input" data-cmp-hook-search="input" type="text" name="fulltext" placeholder="Search" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-invalid="false" aria-expanded="false" aria-owns="cmp-search-results-0"/>
                    
                </div>
            </form>
            <div className="cmp-search__results" aria-label="Search results" data-cmp-hook-search="results" role="listbox" aria-multiselectable="false" id="cmp-search-results-0"></div>
            
        <script data-cmp-hook-search="itemTemplate" type="x-template">
            <a className="cmp-search__item" data-cmp-hook-search="item" role="option" aria-selected="false">
                <span className="cmp-search__item-title" data-cmp-hook-search="itemTitle"></span>
            </a>
        </script>
        
        </section>
        </div>
    )
};

export default HeaderSearch;