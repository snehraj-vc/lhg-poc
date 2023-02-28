const MOCK_GRAPHQL_CLIENT_URL= "https://48p1r2roz4.sse.codesandbox.io";
const X_API_KEY = "rFGDxqrSaC4KxzuZJI5KQ12BL6nVcaRY7ybG12Ej";
const ENCRYPTION_KEY = "lhglms";
const LJI_URLS = {
    CREATE_MEMBER: "https://api.aps20.gravty.io/v2/members/",
    SSO_FB_SIGN_UP: "https://api.aps20.gravty.io/v1/members/social/facebook/",
    SSO_FB_SIGN_IN: "https://api.aps20.gravty.io/v1/members/social/facebook/login",
    SSO_GG_SIGN_UP: "https://api.aps20.gravty.io/v1/members/social/google/",
    SSO_GG_SIGN_IN: " https://api.aps20.gravty.io/v1/members/social/google/login/"
};
const AEM_URLS = {
    SEARCH_OFFERS: "/content/sitea/us/en/offers/content/offers.data.json",
    EXCLUSIVE_OFFERS: "/content/lhg-lms/us/en/home.tag.tagjson?tagId=lhg:africa,lhg:asia&paths=/content/offers"
};
const LOCAL_STORAGE_KEYS = {
    RECENT_SEARCH: 'autoSuggestRecentSearch'
};
const REGEX = {
    CHAR_MIN_8: /^[a-zA-Z0-9@$!%*#?&]{8,}$/g,
    SPL_CHAR: /[@$!%*#?&]/g,
    ALPHA_NUMERIC: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9@$!%*#?&]+)$/g
}
export {
    MOCK_GRAPHQL_CLIENT_URL,
    X_API_KEY,
    LJI_URLS,
    ENCRYPTION_KEY,
    AEM_URLS,
    LOCAL_STORAGE_KEYS,
    REGEX
};