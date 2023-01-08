import { useHistory } from "react-router-dom";
import QuoteForm from "../quotes/QuoteForm";
import useHttp from "../../hooks/use-http";
import { addQuote } from "../../lib/api";
import { useEffect } from "react";

export const NewQuote = () => {
    const history = useHistory();
    const { sendRequest, status } = useHttp(addQuote);

    useEffect(() => {
        if (status === 'completed'){
        history.push('/quotes');
        }
    },[status, history]);

    const addQuoteData = quoteData => {
        sendRequest(quoteData);
    }
    return <div>
        <QuoteForm isLoading={status === "Pending"} onAddQuote={addQuoteData}/>
    </div>
}