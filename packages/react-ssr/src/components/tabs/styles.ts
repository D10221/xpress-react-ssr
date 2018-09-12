import { css } from "styled-components";

const styles = css`
    .root {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
    .content {
        display: flex;
        flex-direction: column;        
        flex: 1 0;
        height: 100%;
        padding: 1rem;
    }
    .menu {
        display: flex;
        flex-direction: row;        
        align-items: center; 
        border-bottom: 1px solid lightgray;
        padding: 1rem;       
    }
    .menu-item {
        flex: 1;
        display: unset;
        cursor: pointer;
    }
    .menu-item:active {
        color: orange
    }
`;
export default styles;
