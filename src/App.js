import React, { useState } from "react";
import { URLContext } from "./Context";
import BookStore from "./container/BookStore";
function App() {
  const urlHook = useState("https://sheltered-taiga-67637.herokuapp.com/book/");
  return (
    <div className="App">
      <URLContext.Provider value={urlHook}>
        <BookStore />
      </URLContext.Provider>
    </div>
  );
}

export default App;
