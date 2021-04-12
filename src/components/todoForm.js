import React from "react";

export class TodoForm extends React.Component {
  //! CHILD COMPONENT   -child komponente göndericez
  constructor() {
    super();
    this.addTask = this.addTask.bind(this);
  }

  addTask(e) {
    e.preventDefault(); // enter'a basıldığında sayfayı yenileme.
    const inp = document.getElementById("todoInput"); //input yakalama
    const val = inp.value; //değeri aldık
    inp.value = ""; // formu temizleme
    this.props.addTasks(val);
  }
  //* BINDING YAPMAK İÇİNYAKLAŞIMLAR
  //? 1-) RENDER AŞAMASINDA İKEN BİNDİNG YAPMA (İKİSİ)    e => this.addTask(e) this.addTask.bind(this)
  //? 2-) CONSTRUCTOR AŞAMASINDA BİNDİNG YAPMA (BİRİ)
  //? 3-) FONKSİYON KULLANARAK BİNDİNG YAPMA (BİRİ) (BAŞKA SONUNCUSU KULLANILMIYOR)

  render() {
    return (
      <div>
        <div className="todo type1">
          <form className="input-wrapper" onSubmit={this.addTask.bind(this)}>
            <input
              id="todoInput"
              type="text"
              className="add-todo"
              placeholder="Ne yapmamı istersin?"
              autoComplete="off"
            />
          </form>
        </div>
        <button type="button" className="add-btn" onClick={this.addTask} />
      </div>
    );
  }
}
