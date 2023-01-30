import React from 'react';
import './style.scss';
const HeaderSearch = (props) => {
    {console.log(props)}
    const {
        id = "",
        resultsSize="",
        searchTermMinimumLength="",
        searchRootPagePath=""
    } = props;
    return (
        <div className="search">
        <section id={id} className="cmp-search" role="search" data-cmp-min-length={searchTermMinimumLength} data-cmp-results-size={resultsSize}>
    <form className="cmp-search__form" data-cmp-hook-search="form" method="get" action={`${searchRootPagePath}/en.searchresults.json/_jcr_content/root/search`} autoComplete="off">
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