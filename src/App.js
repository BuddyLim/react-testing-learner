import LoginIndex from "./components/Chinapress/login/index.login";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return( <AppRoutes/> )
}

export const AppRoutes = () =>(
  <Routes>
    <Route exact path={'/login'} element={<LoginIndex />}/>
    <Route exact path={'/'} element={<AppDefaultView/>}/>
  </Routes>
)

const AppDefaultView = () =>(
  <nav>
    <ul>
      <li>
        <Link to="/login">To Login</Link>
      </li>
    </ul>
  </nav>
)

export default App;
