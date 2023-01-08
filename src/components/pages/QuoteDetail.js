import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import useHttp from "../../hooks/use-http";
import { getSingleQuote } from "../../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";



export const QuoteDetail = () => {
  const params = useParams();
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  const routeMatch = useRouteMatch();

  useEffect(() => {
    sendRequest(params.id);
  }, [sendRequest, params.id]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (status === 'completed' && !loadedQuote.text) {
    return <p>No quote found</p>;
  }
  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`${routeMatch.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${routeMatch.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Switch>
        <Route path={`${routeMatch.path}/comments`}>
          <Comments />
        </Route>
      </Switch>
    </>
  );
};
