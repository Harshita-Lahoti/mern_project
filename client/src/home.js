import { useContext } from "react";
import LocationContext from "./locationcontext";
function Home(){
    const {location,updateLocation}=useContext(LocationContext);
    return(
        <>
            <h1>Home</h1>
            <p>Location:{location}</p>
            <select onClick={(e)=>updateLocation(e.target.value)}>
                <option value="Banglore">Banglore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="New York">New York</option>
                <option value="London">London</option>
                <option value="Dubai">Dubai</option>
            </select>
            <button onClick={()=>updateLocation('New York')}>Change Location</button>
            <p></p>
        </>
    );
}
export default Home;