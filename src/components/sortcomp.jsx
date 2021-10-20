import { useContext, useState } from "react"
import { Context } from "../contextapi/context"
import { Radio, RadioGroup, FormControlLabel,InputLabel,MenuItem,FormControl,Select  } from '@mui/material';

export const Sort = () => {

    const {sort,handleSort} = useContext(Context)

    const [sortby,setSortBy] = useState(sort.sortby)
    const [order,setOrder] = useState(sort.order)

    const handleApplyFilter = () => {
      
        const query = {
            sortby,
            order
        }
       handleSort(query)

    }

    const clearFilter = () => {


        const query = {
            sortby: "",
            order: ""
        }

       handleSort(query)
       setOrder("")
       setSortBy("")
    }

    return(
        <div style={{padding:"20px",position:"sticky", top:"430px",borderRadius:"15px",margin:"20px",width:"308px",height:"fit-content" ,border:"1px solid rgba(0,0,0.1)"}}className="d-flex flex-column">
            <h3>Sort</h3>
            <div style={{marginTop:"10px"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortby}
                        label="Sort By"
                        onChange={e => setSortBy(e.target.value)}
                    >   
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="age">Age</MenuItem>
                        <MenuItem value="city">City</MenuItem>
                        <MenuItem value="gender">Gender</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{marginTop:"10px"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Order</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={order}
                        label="Order"
                        onChange={e => setOrder(e.target.value)}
                    >
                        <MenuItem value="asc">Ascending</MenuItem>
                        <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{marginTop:"15px"}}className="d-flex justify-content-between"><button onClick={handleApplyFilter} className="btn btn-primary">Sort</button>
            <button onClick={clearFilter} className="btn btn-link">Clear</button>
            </div>
        </div>
    )
}