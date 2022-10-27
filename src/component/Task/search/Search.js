import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "./Search.css"
import { fetchAsyncSearchTasks, fetchAsyncGetTasks } from '../../../redux/todoSlice';

const Search = () => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const handleSearch = (e) => {
        setSearch(e.target.value);
        if(e.target.value==="") {
        dispatch(fetchAsyncGetTasks());
        }
        else {
        dispatch(fetchAsyncSearchTasks(e.target.value));
        }
    }
    return (
        <div className='search'>
            <input className='search_input' value={search} type="text" placeholder='Search Title Todo' onChange={handleSearch}/>
        </div>
    );
};

export default Search;