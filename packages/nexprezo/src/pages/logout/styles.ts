import { StyleRulesCallback } from "@material-ui/core";

const styles: StyleRulesCallback = (theme) => {

    return {
        paper: {
            margin: "2rem auto",
            maxWidth: "450px",
            display: "flex",            
            padding: "1rem",
            flexDirection: "column",
            alignItems: "center"
        },
        messages: {

        },
        actions: {

        },
        progress: {
            margin: "1rem"
        },
        root: {
            display: "flex",            
        }
    }
}
export default styles;