import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nave from './Nave'
import Home from './Components/Home'
import Login from './Components/Login';
import Logout from './Components/Logout';
import Signup from './Components/Signup';
import Edit from './Components/Edit'
import Delete from './Components/Delete'
import Add from './Components/Add';
import TagsInput from './Components/TagsInput';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Nave />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/delete/:id' element={<Delete />} />
            <Route path='/add' element={<Add />} />
            <Route path='/tag' element={<TagsInput />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
