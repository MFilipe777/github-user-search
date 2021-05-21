import React from 'react';
import './App.css';
import UserPage from './UserPage'
import { Input } from 'antd';
import {Redirect, Route} from 'react-router-dom';

class App extends React.Component {

    state = {
        userName: null
    }

    handleChange = e => {
        this.setState({ userName: e.target.value }, () => {
            if (this.props.onPressEnter) {
                this.props.onPressEnter(this.state.userName);
            }
        })
    };

    render() {
        return(
            <>
            <Route path = "/user" render = {(props) => <UserPage {...props} userName = {this.state.userName}/>}/>
            <div className="App">
                {this.state.userName === null? <Input placeholder="Insira um usuário" size="large" onPressEnter={this.handleChange} />:null}
            </div>     
                {!this.state.userName ? null : <Redirect to = "/user" />}
            </>
        );
    }
}

export default App;