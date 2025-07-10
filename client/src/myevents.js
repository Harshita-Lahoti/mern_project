import { useState, useEffect, useContext } from "react";
import LocationContext from "./locationcontext";

const MyEvents=()=>{
    const {location,updateLocation} =useContext(LocationContext);
    //      variable always starts with small letter , method                 initial value
    const [eventType,setEventType]=useState('Sports'); 
    const [eventName,setEventName]=useState('Cricket Match');
    const [eventDesc,setEventDesc]=useState('Test');
    const handleEventTypeChange=(e)=>{  
        setEventType('Conference');
    }
    // useEffect(()=>{
    //     console.log('triggered useEffect');
    // },[eventType]);  //componentDidMount equivalent
    useEffect(()=>{
        console.log('triggered useEffect');
    });  //componentDidMount equivalent
    return(
        <div>
            <h1>My Events</h1>
            <p>List of events will be displayed here.</p>
            {/* <h3>{eventType}</h3>
            <h3>{eventName}</h3>
            <h3>{eventDesc}</h3> */}
            {location}
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <form>
                            
                        </form>
                    </div>
                    <div className="col-md-5">

                    </div>
                </div>
            </div>
           
            <form>
                EventName:<input type="text" value={eventName} ></input>
                EventType:<input type="text" value={eventType} onChange={handleEventTypeChange}></input>
                EventDesc:<input type="text" value={eventDesc} ></input>
            </form>
            <button onClick={handleEventTypeChange}>Change Event Type</button>
        </div>
    );
}
export default MyEvents;

// function MyEvents(){
//     return(
//         <div>
//             <h1>My Events</h1>
//             <p>List of events will be displayed here.</p>
//         </div>
//     );
// }
// export default MyEvents;