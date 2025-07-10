function Menubar(props){
    return(
        <div>
            <h2>{props.mytitle}-{props.location}</h2>
            <ul>
                <li>Home</li>
                <li>Movies</li>
                <li>Events</li>
                <li>Contact</li>
            </ul>
        </div>
    )
}
export default Menubar;