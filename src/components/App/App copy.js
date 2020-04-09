import React, { Component } from 'react';
import './App.scss';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';
import apiAgent from '../../util/api';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         query: '',
         users: [],
         //  totalHits: 0,
      };
   }

   searchAction = (value = '') => {
      console.log('fired search', value);
      this.setState({ query: value });
      Promise.all([apiAgent.users.getAll({ query: value })]).then(([val]) => this.setState({ users: val.data }));
   };

   render() {
      return (
         <div className='container-fluid'>
            <Navbar />
            <div className='container'>
               <div className='row'>
                  <div className='col-12 text-center'>
                     <SearchBar action={this.searchAction} />
                  </div>
               </div>
               <div className='row'>
                  <div className='col-4'>
                     <div className='user'>
                        <Card />
                     </div>
                  </div>
                  <div className='col-4'>
                     <div className='user'>
                        <Card />
                     </div>
                  </div>

                  <div className='col-4'>
                     <div className='user'>
                        <Card />
                     </div>
                  </div>

                  <div className='col-4'>
                     <div className='user'>
                        <Card />
                     </div>
                  </div>

                  <div className='col-4'>
                     <div className='user'>
                        <Card />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default App;
