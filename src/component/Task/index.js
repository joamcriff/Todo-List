import React from "react";
import Header from "./todolist/Header";
import TodoList from "./todolist/TodoList"

function Task() {
        return (
        <div className="Main">
               <Header />
               <TodoList />
        </div>
          );
}

export default Task;