import React, { useReducer } from "react";
import GlobalStyle from "./globalStyles";
import "./App.css";
import { Container } from "./containers/Container";
import { Switch, Route, Redirect } from "react-router-dom";
import { InitPage } from "./pages/InitPage";
import { ConfigPage } from "./pages/ConfigPage";

const App: React.FC = () => {
  // const [] = useReducer();
  return (
    <>
      <GlobalStyle />
      <Container>
        <Switch>
          <Route path="/" exact>
            <InitPage />
          </Route>
          <Route path="/config">
            <ConfigPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Container>
    </>
  );
};

export default App;
