import React from "react";
import "./App.css";
import GlobalStyle from "./globalStyles";
import { Container } from "./containers/Container";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { InitPage } from "./pages/InitPage";
import { ConfigPage } from "./pages/ConfigPage";
import { GlobalProvider } from "./globalProvider";
import { ToastContainer, Slide } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    border: 3px solid var(--primary-button-backgroundColor);
  }
  .Toastify__toast-body {
    color: var(--primary-button-color);
    text-align: center;
  }

  .Toastify__progress-bar {
    background: var(--primary-button-backgroundColor);
  }
`;

const App: React.FC = () => {
  let location = useLocation();
  return (
    <GlobalProvider>
      <GlobalStyle />
      <StyledToastContainer
        position="bottom-center"
        autoClose={2500}
        transition={Slide}
      />
      <Container>
        <TransitionGroup>
          <CSSTransition
            timeout={{ enter: 400, exit: 0 }}
            classNames="fade"
            key={location.key}
          >
            <Switch location={location}>
              <Route path="/" exact>
                <InitPage />
              </Route>
              <Route path="/config">
                <ConfigPage />
              </Route>
              <Redirect to="/" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Container>
    </GlobalProvider>
  );
};

export default App;
