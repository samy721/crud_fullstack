import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { NavLink } from "react-router-dom"

export const UserDetails = () =>{

    const params = useParams()
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(false)
    const {name,age,city,gender} = user
    
    const {id} = params

    const getuser = () =>{
        axios.get(`http://localhost:1221/users/${id}`)
            .then(({ data }) => {
                console.log(data)
                setUser(data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }
    
    useEffect(()=> getuser(),[])
    
    return(
        <div>
        {loading?<div style={{textAlign:"center"}}>...Loading</div>:
        <div style={{textAlign:"center",margin:"200px auto",marginTop:"200px",width:"400px",border:"1px solid black"}}>
            <h2>{name}</h2>
            <h2>{city}</h2>
            <h2>{gender}</h2>
             <h2>{age}</h2>
             <NavLink className="btn btn-primary" to="/">
            Home
        </NavLink>
        </div>}
        
        </div>
    )
}