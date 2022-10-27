import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { fetchAsyncCategories, fetchAsyncPostTasks, fetchAsyncGetTasks, fetchAsyncDeleteTasks, fetchAsyncPatchTasks, fetchAsyncScrollTasks } from "../../../redux/todoSlice";
import Search from "../search/Search";
import "./todoList.css"

function TodoList() {
    const [input, setInput] = useState("");
    const [select, setSelect] = useState([]);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const tasks = useSelector((state) => state.tasks);
    const [isSelect, setIsSelect] = useState(false);
    const [idTaskEdit, setIdTaskEdit] = useState("");
    const pageRef = useRef(1);

    const handleScroll = (e) => {
        if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            pageRef.current = pageRef.current + 1;
            dispatch(fetchAsyncScrollTasks(pageRef.current));
        }
    }

    useEffect(() => {
        async function fetchData() {
          // You can await here
        dispatch(fetchAsyncCategories())
        dispatch(fetchAsyncGetTasks())
        }
        fetchData();
      }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);
      
    const handleAddTask = () => {
          dispatch(fetchAsyncPostTasks({title: input, categoryIds: select.map(e => e.value)}));
          setInput("");
          setSelect([]);
    }
    const handleEditTask = (id) => {
        dispatch(fetchAsyncPatchTasks({id: idTaskEdit, data: {title: input, categoryIds: select.map(e => e.value)}}))
        setIsSelect(true);
        setInput("");
        setSelect([]);
        setIsSelect(false);
    }
    const handleDelete = (id) => {
        dispatch(fetchAsyncDeleteTasks(id));
    }  
    const handleEdit = (item) => {
        setInput(item.title);
        setSelect(item.categories.map((item) => ({ value: item.id , label: item.name })));
        setIsSelect(true);
        setIdTaskEdit(item.id); 
    }
    const options = categories.map((item) => ({ value: item.id , label: item.name }))
   
    return (
    <>
        <div className="todoList">
            <div>
                <h1 className="h1">TodoList</h1>
                <Search />
                <input 
                    type="text" 
                    className="todoList_input" 
                    placeholder="Todo List" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    />
                <Select 
                    className="todoList_select"
                    value={select}
                    options={options} 
                    isClearable={true}
                    isMulti
                    onChange={(e) => setSelect(e)}
                />
                {isSelect ? <button className="button_add" onClick={() => handleEditTask()}>Edit</button> : <button className="button_add" onClick={handleAddTask}>Add</button>}
            </div>
        </div>

        <div className="Items">
            {
                <>
                    {tasks.map(items => {
                    return (
                    <div className="show-items" key={items.id}>
                        <h2>{items.title}</h2>
                        <div className="categories_item">
                            <p className="p_item">Categories:</p>
                            {items.categories.map((item, key) => <p key={key} className="p_item">{item.name}</p>)}
                        </div>
                        <div className="show-status">
                            <p className="status_item">Status:</p>
                            <p className="status_item">{items.status}</p>
                        </div>
                        
                        {isSelect ? <></> : <button className="button" onClick={() => handleEdit(items)}>Edit</button>}
                        <button className="button" onClick={() => handleDelete(items.id)}>Delete</button>
                    </div>   
                    )
                    })}
                </>
            }
        </div>
    </>
    )
}

export default TodoList;