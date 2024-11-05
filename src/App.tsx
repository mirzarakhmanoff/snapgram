import { useEffect } from "react";
import "./App.css";
import Routers from "./router";
import { useDispatch } from "react-redux";
import { setSavedItems } from "./redux/slice/saved-slice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // const savedItems = JSON.parse(localStorage.getItem("saved")!);
    dispatch(setSavedItems());
  }, []);
  return (
    <>
      <Routers />
    </>
  );
}

export default App;
