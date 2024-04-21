import { FC, useState } from "react";
import "./app.scss";
import { Link, Outlet } from "react-router-dom";
import AboutPage from "@/pages/about/About";


export const App: FC = () => {
  const [counter, setCouter] = useState(0);

  const fn = () => {
    setCouter(counter + 1)
  }

  return (
    <div>
      <Link to={"/about"} >about</Link>
      <br />
      <Link to={"/user"} >user</Link>

      <p>count {counter}</p>

      <button className="asd" onClick={fn}>
        <p className="asd__qwe">up</p>
      </button>

      <AboutPage />

      <Outlet />
    </div>
  )
}