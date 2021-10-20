import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({children}) => {
    const [filter, setFilter] = useState({
        name:"",
        age:"",
        city:"",
        gender:"",
    })
    const [sort,setSort] = useState({
        sortby:"",
        order:""
    })
    
    const handleFilter = (e) => {
      setFilter(e);
    };

    const handleSort = (e) => {
        setSort(e);
      };
      
    const value = {
      filter,
      sort,
      handleFilter,
      handleSort

    };
  

    return <Context.Provider value={value}> {children} </Context.Provider>
}