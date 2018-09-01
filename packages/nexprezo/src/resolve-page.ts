const { PAGES } = process.env;
/** 
 * server loads default export webpack bundles index
 */
export default (page: string)=>{
    return require([
        PAGES, 
        process.env.NODE_ENV === "production" ? "dist": undefined,
        page
    ].join("/")).default
}