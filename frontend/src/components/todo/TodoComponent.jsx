import React, {Component} from 'react'
import moment from 'moment'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import TodoDateService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            id : this.props.match.params.id,
            description : "",
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(values){
        let username = AuthenticationService.getLoggedInUserName();
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }
        if(this.state.id === '-1'){
            TodoDateService.createTodo(username, todo)
            .then(() => {this.props.history.push('/todos')})
        }else{
            TodoDateService.updateTodo(username, this.state.id, todo)
            .then(() => {this.props.history.push('/todos')})
        }
       
    }
    validate(values){
        let errors = {}
        if(!values.description){
            errors.description = "Please enter a description！"
        }else if(values.description.length < 5){
            errors.description = "Please enter at least 5 characters in Description!"
        }
        if(!moment(values.targetDate).isValid()){
            errors.targetDate = "Please select a valid date!"
        }
        return errors;
    }
    componentDidMount(){
        AuthenticationService.setupAxiosInterceptor();
        if(this.state.id === '-1') //if id=-1, I don't go to retrieveTodo
            return;
        let username = AuthenticationService.getLoggedInUserName();
        TodoDateService.retrieveTodo(username, this.state.id)
        .then(response => this.setState({
            description : response.data.description,
            targetDate : moment(response.data.targetDate).format("YYYY-MM-DD")
        }))
    }
    render(){
        //This way is better than the way used for loginComponent
        let {description, targetDate} = this.state;
        return(
            <div>
                <h1>Todo</h1>
                <div className = "container">
                    <Formik 
                        initialValues = {{description, targetDate}}
                        onSubmit = {this.onSubmit}
                        validateOnChange = {false}
                        // validateOnBlur = {false}
                        validate = {this.validate}
                        enableReinitialize = {true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>TargetDate</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
            
        )
    }
}
export default TodoComponent