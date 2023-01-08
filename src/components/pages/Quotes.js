import QuoteList from "../quotes/QuoteList";
import useHttp from "../../hooks/use-http";
import { getAllQuotes } from "../../lib/api"
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoQuotesFound from "../quotes/NoQuotesFound"

export const Quotes = () => {
    const {sendRequest, status, data: loadedQuotes, error } = useHttp(getAllQuotes, true)
    
    useEffect(() => {
       sendRequest();
    }, [sendRequest]);

    if (status === "pending") {
        return <div className="centerd">
            <LoadingSpinner />
        </div>
    }

    if(error) {
        return <div className="centered focused">{error}</div>
    }

    if(status === "completed" && (!loadedQuotes || loadedQuotes.length < 1)) {
        return <div className="centered">
            <NoQuotesFound />
        </div>
    }
    

    return <section>
        <h2>All Quotes</h2>
        <QuoteList quotes={loadedQuotes}/>
    </section>
}