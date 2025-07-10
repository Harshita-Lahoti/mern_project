// import Menubar from "./menubar";
import AddMovie from "./addmovie";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,Routes,Route} from 'react-router-dom';
import MyEvents from "./myevents";
import Home from "./home";
import MyBookings from "./mybookings";
import Contact from "./Contact";
import LocationContext from "./locationcontext"; //''
import { useState } from "react";
import Login from './login';

function App() {
  const [location,setLocation]=useState('Banglore');
  const updateLocation =(newLocation)=>{
    setLocation(newLocation);
  };

  return (
    <LocationContext.Provider value={{location,updateLocation}}>
      <div>
        {/* <h1>Welcome- asjjsc</h1> */}
        {/* <Menubar mytitle="Welcome to my show" location="Banglore"></Menubar>
        <AddMovie title="Ticketnewsite"></AddMovie> */}
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">MyShow - {location}</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link class="nav-link" href="#" to="/">Home<span class="sr-only">(current)</span></Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/movies">Movies</Link>
              </li>
              {(location==='Banglore')?
                  <li class="nav-item">
                    <Link class="nav-link" to="/events">Events</Link>
                  </li>
                :''}
              {/* <li class="nav-item dropdown">
                <Link class="nav-link" to="/events">Events</Link>
              </li> */}
              <li class="nav-item">
                <Link class="nav-link" to="/bookings">Bookings</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <Link to="/login" class="btn btn-outline-succes my-2 my-sm-0" >Login</Link>
            </form>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movies" element={<AddMovie title="Movies"/>}/>
          <Route path="/events" element={<MyEvents/>}/>
          <Route path="/bookings" element={<MyBookings/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </LocationContext.Provider>
  );
}

export default App; 