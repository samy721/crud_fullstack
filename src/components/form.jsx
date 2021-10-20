import { Radio, RadioGroup, FormControlLabel,InputLabel,MenuItem,FormControl,Select  } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Redirect } from 'react-router';

export const UserForm = ({handleCreateUser}) => {

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [city, setCity] = useState("")
    const [gender,setGender] = useState("")
    const [user,setUser] = useState(false)
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const payload = {
            name,
            age,
            city,
            gender
        }

        axios.post(`http://localhost:1221/users`,payload)
            .then(({ data }) => {
                setUser(data._id)
            })
            .catch((err) => console.log(err))
    }
    
    if(user){
        return <Redirect to={`/userDetails/${user}`}/>
    }
    return (
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}