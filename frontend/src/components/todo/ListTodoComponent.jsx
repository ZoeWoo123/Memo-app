import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTodoComponenet extends Component{
    constructor(props){
        super()
        this.state = {
            todos: [],
            message: null
        }

        this.addTodoClick = this.addTodoClick.bind(this);
        this.updateTodoClick = this.updateTodoClick.bind(this);
        this.deleteTodoClick = this.deleteTodoClick.bind(this);
        this.refreshTodo = this.refreshTodo.bind(this);

    }
    componentDidMount(){
        AuthenticationService.setupAxiosInterceptor();
        this.refreshTodo();
    }
    refreshTodo(){
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
        .then(response => {
            // console.log(response)
            this.setState({
                todos:response.data
            })
        })
    }
    addTodoClick(){
        this.props.history.push("/todos/-1")
    }
    updateTodoClick(id){
        this.props.history.push(`todos/${id}`);

    }
    deleteTodoClick(id){
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.deleteTodo(username, id)
        .then(
            response =>{
                this.setState({message:`Delete of todo ${id} successful`})
                this.refreshTodo()
            }
        )
    }
    render(){
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target date</th>
                                <th>Is completed?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                                        <td>{todo.isDone.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={() =>this.updateTodoClick(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() =>this.deleteTodoClick(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            }
                            
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success btn-lg mx-auto px-md-5" onClick={this.addTodoClick}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodoComponenet;