//import logo from './logo.svg';
//import './App.css';
import React, { Component } from "react";
import { TodoList } from "./components/todoList";
import { TodoForm } from "./components/todoForm";
import { Header } from "./inc/header";
import { Footer } from "./inc/footer";

//const myTasks = ["Yapılacak ilk iş", "Kitap oku", "Film izle"];

class App extends Component {
  //constructor'a alığ state'e çevirilmesi işlemi
  constructor() {
    super();
    this.state = {
      myTasks: [
        { text: "Yapılacak ilk işler", status: "passive" },
        { text: "Kitap oku", status: "passive" },
        { text: "Film izle", status: "passive" },
      ],
    };
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.doneTask = this.doneTask.bind(this);
  }

  addTask(val) {
    //console.log(myTasks); önceki
    //myTasks.push(val);
    //console.log(myTasks);sonraki
    let updatedList = this.state.myTasks;
    updatedList.push({ text: val, status: "passive" });
    this.setState({ myTasks: updatedList });
  }
  //! Fonksiyonu event comppnentten child componente

  doneTask(task_id) {
    task_id = task_id.replace("task_", "");
    let updatedList = this.state.myTasks;
    let newStatus = "active";
    let currentStatus = updatedList[task_id].status;
    if (currentStatus === "active") {
      newStatus = "passive";
    }

    updatedList[task_id].status = newStatus;
    this.setState({ myTasks: updatedList });

    //console.log(task_id + "tamamlandı");
  }
  removeTask(task_id) {
    task_id = task_id.replace("task_", "");
    let updatedList = this.state.myTasks;
    updatedList.splice(task_id, 1); //iterasyondur. 1 kez yap demek
    this.setState({ myTasks: updatedList });
  }

  render() {
    //TODO| RENDER İŞLEMİ

    return (
      <div className="content">
        <Header />
        <TodoForm addTasks={this.addTask} />
        {/*<TodoList myTasks={myTasks} /> artık state göndericez */}
        <TodoList
          myTasks={this.state.myTasks}
          doneTask={this.doneTask}
          removeTask={this.removeTask}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
