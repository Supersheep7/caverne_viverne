import React, { Component } from 'react'
import { Navigate }  from 'react-router-dom'
import axios from 'axios'

class LogoutForm extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        axios.defaults.withCredentials = true
    }

    logout(event) {
        event.preventDefault()
        console.log("logging out")
        axios
            .post('http://localhost:9000/user/logout')
            .then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: false,
                        username: null
                    })
                }
            })
            .catch(error => {
                console.log('logout error: ')
                console.log(error);
                
            })
    }

    render() {
            return (
                <div>
                    <h4>Logout</h4>
                    <form className="form-horizontal">
                        <div className="form-group ">
                            <div className="col-7"></div>
                            <button
                                className="btn btn-primary col-1 col-mr-auto"
                                onClick={this.logout}
                                type="submit">Logout</button>
                        </div>
                    </form>
                </div>
            )
        }
}

export default LogoutForm