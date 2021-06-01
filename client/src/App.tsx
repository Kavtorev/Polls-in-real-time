import React from "react";
import "./App.css";
import GlobalStyle from "./globalStyles";
import { Container } from "./containers/Container";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { InitPage } from "./pages/InitPage";
import { ConfigPage } from "./pages/ConfigPage";
import { GlobalProvider } from "./globalProvider";

const App: React.FC = () => {
  let location = useLocation();
  return (
    <GlobalProvider>
      <GlobalStyle />
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
