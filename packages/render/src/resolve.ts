const { PAGES } = process.env;
/** 
 * server loads default export webpack bundles index
 */
export default (page: string)=>{
    return require([
        PAGES, 
        page
    ].join("/")).default
}