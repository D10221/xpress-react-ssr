import { css} from "styled-components";

const styles = css`
  .app {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
  }

  .app-logo {
    animation: app-logo-spin infinite 20s linear;
    height: 80px;
  }

  .app-header {
    display: flex;
    flex: 1 0;
    padding: 20px;
  }

  .app-title {
    font-size: 1.5em;
    text-transform: uppercase;
  }

  .app-content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .app-form {
    display: "flex";
    flex-direction: column;
    align-items: center;
  }

  .app-form-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .app-form-input {
    margin: 1rem;
  }

  .app-form-input-label {
    margin: 1rem;
    text-transform: uppercase;
  }

  .app-form-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 1rem;
  }

  .app-form-action-button {
    text-transform: uppercase;
    margin: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  busy {
    display: flex;
    flex-direction: row;
  }

  .busy-text {
    text-transform: uppercase;
  }

  .error {
    display: flex;
    flex-direction: row;
  }

  .error-text {
    color: red;
  }
`;
export default styles;
