import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/detail/:id" element={<DetailPage />} exact></Route>
      <Route path="/" element={<MainPage />} exact></Route>
      <Route path="" component={<NotFound />} />
    </Routes>
  );
}

export default App;

//TODO:
// make time module
// export utility functions
// make bidding functionality

// add related items in detail page
// make footer
// make pagination
// make searchbar

//create routing functionality

// finetune design
// make responsive
