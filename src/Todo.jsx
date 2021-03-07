import React from 'react';
import './index.css';


class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [{
                name: "ごろごろする"
            },
            {
                name: "ああああ"
            }],
            newTask: ""
        };
    }
    handleChange = (e) => {
        this.setState({newTask: e.target.value})
    }
    handleClick = (e) => {
        const tasks = this.state.tasks.slice()
        tasks.push({
            name: this.state.newTask
        })
        this.setState({
            tasks: tasks,
            newTask: ""})
    }
    render() {
        return (
            <div>
                <h2>ここにタスクを入力</h2>
                <input type="text" value={this.state.newTask} onChange={this.handleChange}></input>
                <button onClick={this.handleClick}>追加</button>
                <p>{this.state.newTask}</p>

                <TaskList tasks={this.state.tasks}/>

                <SaveFile data={this.state}/>         
            </div>

        )
    }
}


const PreviewText = (props) => {
    return (
        <div>
            <h2>JSONの内容</h2>
            <p>{props.json_text}</p>
        </div>
    )
}

class SaveFile extends React.Component {
    handleClick = (e) => {
        const data = this.json_text
        const fileName = "data.json"
        const link = document.createElement('a');
        link.href = 'data:text/plain,' + encodeURIComponent(data);
        link.download = fileName;
        link.click();
    }

    render() {
        this.json_text = JSON.stringify(this.props.data)
        return (
            <div>
                <h2>データの保存・読み込み</h2>
                <button onClick={this.handleClick}>保存</button>
                <PreviewText json_text={this.json_text} />
            </div>
        )
    }
}

const TaskList = (props) => {
    const takslist = props.tasks.map((task)=> {
        return (
            <li>{task.name}</li>
        )
    })
    return (
        <div>
            <ul>
                {takslist}
            </ul>
        </div>
    )
}

export default Todo;