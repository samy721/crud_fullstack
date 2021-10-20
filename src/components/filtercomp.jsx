import { useContext, useState } from "react"
import { Radio, RadioGroup, FormControlLabel,InputLabel,MenuItem,FormControl,Select  } from '@mui/material';
import { Context } from "../contextapi/context";

export const Filter = () => {
   
    const {filter,handleFilter} = useContext(Context)
   
    const [name, setName] = useState(filter.name)
    const [age, setAge] = useState(filter.age)
    const [city, setCity] = useState(filter.city)
    const [gender,setGender] = useState(filter.gender)

    const handleApplyFilter = () => {
      
        const query = {
            name,
            age,
            gender,
            city
        }
       handleFilter(query)

    }

    const clearFilter = () => {


        const query = {
            name:"",
            age: "",
            gender: "",
            city: ""
        }

       handleFilter(query)
       setName("")
       setAge("")
       setCity("")
       setGender("")
    }
    return (
        <div style={{padding:"20px",position:"sticky", top:"20px",borderRadius:"15px",margin:"20px",width:"308px",height:"fit-content" ,border:"1px solid rgba(0,0,0.1)"}}className="d-flex flex-column">
            <h3>Filter</h3>
            <div style={{marginTop:"10px"}}className="d-flex flex-column">
                <input style={{padding:"10px"}}placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div style={{marginTop:"10px"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={e => setAge(e.target.value)}
                    >   
                        <MenuItem value={20}>20+</MenuItem>
                        <MenuItem value={30}>30+</MenuItem>
                        <MenuItem value={40}>40+</MenuItem>
                        <MenuItem value={50}>50+</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{marginTop:"10px"}}className="d-flex flex-column">
                <input style={{padding:"10px"}} placeholder="City" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div style={{marginTop:"10px"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
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
            <div style={{marginTop:"15px"}}className="d-flex justify-content-between"><button onClick={handleApplyFilter} className="btn btn-primary">Filter</button>
            <button onClick={clearFilter} className="btn btn-link">Clear</button>
            </div>
        </div>

    )
}