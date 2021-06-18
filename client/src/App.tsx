import React from "react";
import "./App.css";
import GlobalStyle from "./globalStyles";
import { Container } from "./containers/Container";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { InitPage } from "./pages/InitPage";
import { ConfigPage } from "./pages/ConfigPage";
import { PollPage } from "./pages/PollPage";
import { ToastContainer, Slide } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { GoogleSignOut } from "./components/GoogleSignOut";
import { usePollContext } from "./globalProvider";

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

const InnerContainer = styled.div`
  width: 500px;
  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 1em;
  }
`;

const App: React.FC = () => {
  let location = useLocation();
  let { state } = usePollContext();

  return (
    <>
      <GlobalStyle />
      <StyledToastContainer
        position="bottom-center"
        autoClose={1200}
        transition={Slide}
      />
      {state.isSignedIn && <GoogleSignOut />}
      <Container>
        <InnerContainer>
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
                <Route path="/poll/:id">
                  <PollPage />
                </Route>
                <Redirect to="/" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </InnerContainer>
      </Container>
    </>
  );
};

export default App;
