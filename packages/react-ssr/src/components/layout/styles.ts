import { css } from "styled-components";

const styles = css`
  html body {
    margin: 0;
    padding: 0;
  }
  /* React: Entry point */
  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
  }
  /* App 1st element */ 
  .layout-root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  /* routes target element*/
  .layout-content {
    flex: 1 0;
    background-color: whitesmoke;
    padding: 0 1rem
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
  footer nav {
    display: flex;
    flex-direction: row;
    justify-content: "space-between";
    flex: 1 0;
    justify-content: flex-end;
  }
  footer nav a {
    margin: 0 0.5rem 0 0 ;    
  }
`;
export default styles;