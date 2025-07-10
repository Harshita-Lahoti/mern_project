import { useContext } from "react";
import LocationContext from "./locationcontext";
function Contact(){
    const {location,updateLocation} =useContext(LocationContext);
    return(
        <>
            <h1>Contacts</h1>
            <p>here you will see the details</p>
            {location}
        </>
    );
}
export default Contact;   