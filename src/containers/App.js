import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import { robots } from './robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            return response.json();
        })
        .then(users => {
            this.setState({ robots: users });
        })

        // reducing to one line:
        // fetch('https://jsonplaceholder.typicode.com/users')
        // .then(response => response.json())
        // .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render () {
        // const { robots, searchfiled } = this.state;
        // with this we can remove all the 'this.state' from this part of the code.
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        // if(!robots.lenght).... if there's no robots we're loading. (again this.state removed cause the const above)
        //another form
        // return !robots.length ?
        //     <h1>Loading</h1> :
        //     (
        //         <div className='tc'>
        //             <h1 className='f1'>RoboFriends</h1>
        //             <SearchBox searchChange={this.onSearchChange}/>
        //             <Scroll>
        //                 <CardList robots={filteredRobots}/>
        //             </Scroll>
        //         </div> 
        //     );

        if (this.state.robots.length === 0) {
            return <h1>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }

    }

}

export default App;