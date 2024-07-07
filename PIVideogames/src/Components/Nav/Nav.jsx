import "./Nav.css"



function Nav( ){


    return (
        <div className="divNav">

            <div>
                <button className="buttonNav">Home</button>
                <button className="buttonNav">Create VideoGame</button>
               
            </div>
            <div>
                <input type="text"
                       className="inputNav" />
                <button>Search</button>
            </div>
        </div>
    )
}

export default Nav;