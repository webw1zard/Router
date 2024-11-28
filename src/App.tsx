import { Routes, Route } from "react-router-dom";
import Users from "./Users";
import Cabinet from "./Cabinet";
import Posts from "./Posts";
import Todos from "./Todos";
import Albums from "./Albums";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users/:id" element={<Cabinet />}>
          <Route path="posts" element={<Posts />} />
          <Route path="todos" element={<Todos />} />
          <Route path="albums" element={<Albums />} />
        </Route>
      </Routes>
  );
}

export default App;
