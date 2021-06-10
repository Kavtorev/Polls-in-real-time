import React, { useCallback, useEffect, useRef } from "react";
import "./App.css";
import GlobalStyle from "./globalStyles";
import { Container } from "./containers/Container";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { InitPage } from "./pages/InitPage";
import { ConfigPage as ProtectedConfigPage } from "./pages/ConfigPage";
import { usePollContext, InitialStateType } from "./globalProvider";
import { ToastContainer, Slide } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";

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

enum LocalStorage {
  applicationState = "state",
}

const App: React.FC = () => {
  let location = useLocation();
  let { state, dispatch } = usePollContext();

  let throttledState = useRef(
    _.throttle(() => {
      localStorage.setItem(
        LocalStorage.applicationState,
        JSON.stringify(state)
      );
    }, 1000)
  );

  useEffect(() => {
    let localStorageState = localStorage.getItem(LocalStorage.applicationState);
    if (localStorageState) {
      dispatch({
        type: "restoreState",
        payload: JSON.parse(localStorageState),
      });
    }
  }, [dispatch]);

  useEffect(() => {
    throttledState.current();
  }, [state]);

  return (
    <>
      <GlobalStyle />
      <StyledToastContainer
        position="bottom-center"
        autoClose={1200}
        transition={Slide}
      />
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
                <ProtectedConfigPage />
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
