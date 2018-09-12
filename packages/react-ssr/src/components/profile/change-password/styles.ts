import { css } from "styled-components";
export default css`
    .container {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        margin: 0 auto;
    }
    .input {
        padding: 0 1rem;
    }
    .form {
        display: flex;
        flex-direction: column;
    }
    .label {
        padding: 0 1rem;
    }
    .row {
        display: flex;
        flex-direction: row;
        padding: 1rem;
        justify-content: space-between;
    }
    .button {
        padding: 0.5rem 1rem
    }
`;