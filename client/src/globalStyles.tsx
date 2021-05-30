import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    };
    :root{
        --inactive-dark-color: #C5C5C5;
        --active-dark-color: #525151;
        --active-checkbox-color: rgb(255, 167, 196);
        --primary-button-backgroundColor: rgb(242, 173, 167);
        --primary-button-color: rgb(119, 26, 17);
        --top-bottom-margin: 0.8em;
        --right-left-margin: 1.5em;
        --primary-font-family: font-family: 'Lato', Helvetica, sans-serif;
        font-size: 16px;
    };
    
    body{
        font-family: var(--primary-font-family) !important;
    }
`;

export default GlobalStyle;
