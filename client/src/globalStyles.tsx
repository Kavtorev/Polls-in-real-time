import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif !important;
    };
    :root{
        --inactive-dark-color: #C5C5C5;
        --active-dark-color: #525151;
        --active-checkbox-color: rgb(39, 33, 35);
        --primary-button-backgroundColor: rgb(242, 173, 167);
        --primary-button-color: rgb(119, 26, 17);
        --gray-backgroundColor: #F6F6F6;
        --top-bottom-margin: 0.8em;
        --top-bottom-padding: 0.2em;
        --right-left-margin: 1.5em;
        font-size: 16px;
        color: var(--active-dark-color)
    };
`;

export default GlobalStyle;
