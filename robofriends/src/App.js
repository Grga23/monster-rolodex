import React, { Component } from 'react';
import CardList from './CardList';
import { robots } from './robots';
import SearchBox from './Searchbox';
import ErrorBoundry from './ErrorBoundry'; 

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        // Pulling it from the file 
        //this.setState({robots: robots});
        // Pulling it from API
        
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}));
    
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value });
     
    };

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        console.log(filteredRobots);
        return (
            <div className="tc">
                <h1>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <ErrorBoundry>
                    <CardList robots={filteredRobots} />
                </ErrorBoundry>
            </div>
        )
    }
}

export default App;