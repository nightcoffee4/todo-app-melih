import React from "react";

//*export işlemi
export class TodoList extends React.Component {
  /*
    ? Yaşam döngüsü
    constructor(){
        super();
        document.write("Constructor çalıştı.<hr />");
    }
    componentWillMount(){
        document.write("will mount çalıştı.<hr />");

    }
    componentDidMount(){
        document.write("did mount çalıştı.<hr />");
    }
    componentWillUnmount(){
        document.write("un mount çalıştı.<hr />");
    } */

  constructor() {
    super(); //listeyi güncellemek için state kullanıyoruz, sadece bu komponent içerisinde kullanacağımız için burada tanımlıyoruz.
    this.state = { todoFilter: "All" }; //state tanımlandı, default olarak ilk değeri "All"
  }

  doneTask = (e) => {
    this.props.doneTask(e.target.parentNode.id);
  };
  removeTask = (e) => {
    this.props.removeTask(e.target.parentNode.id);
  };

  todoListFilter = (param) => {
    //console.log(param)
    //this.setState({ todoFilter: param }); //state burada güncelleniyor
    //! setState dedikten sonra ardından filter stateini kullanmak istersem ve o parametreye bağlı işlem yaptırmak istersem güvenmemem lazım. bu asenkron bir işlem.
    //fonksiyon yazdırıyoruz
    this.setState({ todoFilter: param }, function () {
      console.log("state güncellendi");
    });

    //butona tıklandığında class verme
    const activeBtn = document.getElementById("filterBtn" + param);
    document.getElementById("filterBtnAll").classList.remove("active"); //classı silme
    document.getElementById("filterBtnActive").classList.remove("active"); //classı silme
    document.getElementById("filterBtnCompleted").classList.remove("active"); //classı silme
    activeBtn.classList.add("active");
  };

  render() {
    //* çıktı üret
    let items_left = 0;
    //map yani bir iterasyon döngü kullanacağız
    //map html şablo veya veri dönderecek
    //elem: her iterasyonda gelen arrayin içindeki değer, i 0dan başlar ve artar
    const items = this.props.myTasks.map((elem, i) => {
      if (elem.status === "passive") {
        items_left++;
      }
      if (
        this.state.todoFilter === "All" ||
        (this.state.todoFilter === "Active" && elem.status === "passive") ||
        (this.state.todoFilter === "Complated" && elem.status === "active")
      ) {
        let task_id = "task_" + i;
        return (
          <li key={i} id={task_id} className={elem.status}>
            <span className="id">{i + 1}. </span>
            <span className="title">
              {elem.text} - {elem.status}
            </span>
            <span className="type" onClick={this.doneTask}></span>
            <span className="delete" onClick={this.removeTask}></span>
          </li>
        );
      } else {
        return null;
      }
    });

    return (
      //* çıktıya dönecek olan
      <div>
        <div className="todo-list type1">
          <ul>{items}</ul>
        </div>
        <div className="todo-filter type1">
          <div className="left">
            <span>
              <b>{items_left}</b> items left
            </span>
          </div>
          <div className="right" id="listChanger">
            <ul>
              {/* onClick={this.changeList}*/}
              <li className="active" id="filterBtnAll">
                <span onClick={() => this.todoListFilter("All")}>All</span>
              </li>
              <li id="filterBtnActive">
                <span onClick={() => this.todoListFilter("Active")}>
                  Active
                </span>
              </li>
              <li id="filterBtnCompleted">
                <span onClick={() => this.todoListFilter("Completed")}>
                  Completed
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
