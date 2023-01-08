import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { NewQuote } from "./components/pages/NewQuote";
import { NotFound } from "./components/pages/NotFound";
import { QuoteDetail } from "./components/pages/QuoteDetail";
import { Quotes } from "./components/pages/Quotes";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/quotes">
          <Quotes />
        </Route>
        <Route path="/quotes/:id">
          <QuoteDetail />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        <Route exact path="/">
          <Redirect to="/quotes" />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
