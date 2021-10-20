import { useParams } from "react-router"
import { Radio, RadioGroup, FormControlLabel,InputLabel,MenuItem,FormControl,Select  } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export const EditPage = () => {
    
    const params = useParams()
  
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [city, setCity] = useState("")
    const [gender,setGender] = useState("")
    const [loading,setLoading] = useState(true)
    
    const {id}= params

    const handleSubmit=(e)=>{
        setLoading(true)

        e.preventDefault()
        const payload = {
            name,
            age,
            city,
            gender
        }

        axios.patch(`http://localhost:1221/users/${id}`,payload)
        .then(({ data }) => {
            getuser()
        })
        .catch((err) => console.log(err))
    }

    const getuser = () =>{
        axios.get(`http://localhost:1221/users/${id}`)
            .then(({ data }) => {
                console.log(data)
                setName(data.name)
                setAge(data.age)
                setCity(data.city)
                setGender(data.gender)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }
    
     useEffect(()=> getuser(),[])
    
    if(loading){
        return(
            <h3 style={{textAlign:"center",marginTop:"250px"}}>...Loading</h3>
        )
    }
    
    return (
        <Box sx={style}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group my-3">
                <label className="my-1" for="exampleInputEmail1">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name" />
            </div>
            <div className="form-group my-3">
                <label className="my-1" for="exampleInputPassword1">City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="eg:London" />
            </div>
            <div className="form-group my-3">
                <label className="my-1" for="exampleInputPassword1">Gender</label>
                <div style={{ marginTop: "10px" }}>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Gender"
                            onChange={e => setGender(e.target.value)}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="form-group my-3">
                <label className="my-1" for="exampleInputPassword1">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Age" />
            </div>
            <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-success">Update</button>
            <NavLink to="/">Home</NavLink>
            </div>
        </form>
        </Box>
    )
}

