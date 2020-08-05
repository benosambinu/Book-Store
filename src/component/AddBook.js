import React, { useState } from "react";
import AddUpdateBook from "./AddUpdateBook";
import AddIcon from "@material-ui/icons/Add";

import { Tooltip } from "@material-ui/core";

function AddBook() {
  let [addBook, setAddBook] = useState(false);

  function handleChange(newValue) {
    setAddBook(newValue);
  }
  return (
    <>
      {addBook ? (
        <AddUpdateBook onChange={handleChange} />
      ) : (
        <Tooltip title="Add Book">
          <AddIcon
            style={{ marginTop: "24px", marginLeft: "8px" }}
            color="primary"
            onClick={() => setAddBook(true)}
          />
        </Tooltip>
      )}
    </>
  );
}

export default AddBook;
