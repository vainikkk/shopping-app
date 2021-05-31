import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CategoryManagement from "./pages/CategoryManagement";
import ProductManagement from "./pages/ProductManagement";
import Header from "./components/Navbar/Navbar";
import ToastMessage from "./components/ToastMessage/ToastMessage";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <CategoryManagement />
        </Route>
        <Route exact path="/products">
          <ProductManagement />
        </Route>
      </Switch>
      {state.showToast && (
        <ToastMessage
          show={state.showToast}
          type={state.toastType}
          delay={"3000"}
          closeToast={() => dispatch({ type: "CLOSE_TOAST" })}
          message={state.toastMessage}
        />
      )}
    </div>
  );
}

export default App;
