import { css } from "styled-components";

const styles = css`
  html body {
    margin: 0;
    padding: 0;
  }
  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
  }
  .layout-root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .layout-content {
    flex: 1 0;
    background-color: whitesmoke;
  }

  header {
    justify-content: space-between;
  }

  header nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: cornflowerblue;
    color: aliceblue;
  }

  header nav h1 {
    margin: 0;
    padding: 0.5rem;
    color: inherit;
  }

  header nav a {
    text-decoration: none;
    color: inherit;
  }

  footer {
    margin: 0;
    padding: 0.5rem;
    background-color: cornflowerblue;
    color: aliceblue;
  }
`;
export default styles;