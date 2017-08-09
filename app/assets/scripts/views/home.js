'use strict';
import React, { Component } from 'react';
import TestDescendant from '../components/test-descendant';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      testState: ''
    };
  }

  render () {
    return (
      <section className='page__home'>
        <h1>Home</h1>
        <div className='home__test-control'>
          <p><strong>Hot Module Reloading (HMR) </strong>makes it possible to develop components without initializing the state between saves. Try below by updating the state then saving edits to this module or its descendant.</p>
          <input type='text' placeholder='Enter example state value' value={this.state.testState} onChange={this.onChange.bind(this)} />
          <p><strong>Local component value: </strong>{this.state.testState}</p>
          <p><strong>Descendant component value: </strong><TestDescendant testValue={this.state.testState} /></p>
        </div>
      </section>
    );
  }

  onChange (e) {
    this.setState({
      testState: e.target.value
    });
  }
}

export default Home;
