import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = ({ onAddQuote, isLoading }) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    if (enteredAuthor.trim() !== "" && enteredText.trim() !== "") {
      onAddQuote({ author: enteredAuthor, text: enteredText });
    }
  }

  const formFocusHandler = () => {
    setIsFocused(true);
  };

  const finishOnFocus = () => {
    setIsFocused(false);
  };

  return (
    <Fragment>
      <Prompt when={isFocused} message="Are you sure you want to leave?" />
      <Card>
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishOnFocus} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
