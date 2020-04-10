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
         enableBtn: false,
         page: 1,
         noResultState: false,
      };
   }

   //  componentDidMount() {
   //     const { query, page } = this.state;
   //     if (query !== '') {
   //        const promises = [apiAgent.users.getAll({ query, page })];
   //        Promise.all(promises).then(([usersData]) => {
   //           this.setState({
   //              users: usersData.items,
   //              enableBtn: usersData.items.length === 12,
   //           });
   //        });
   //     }
   //  }

   searchAction = (value = '') => {
      const { page } = this.state;
      this.setState({ query: value });
      if (value !== '') {
         const promises = [apiAgent.users.getAll({ query: value, page })];
         Promise.all(promises).then(([userData]) => {
            this.setState({ users: userData.items, enableBtn: userData.items.length === 12, noResultState: true });
         });
      } else {
         this.setState({ page: 1 });
      }
   };

   actionLoadMore = () => {
      this.setState(
         (state) => ({ page: state.page + 1 }),
         () => {
            const { page, query, users } = this.state;
            const promises = [apiAgent.users.getAll({ page, query })];
            Promise.all(promises).then(([val]) => {
               this.setState({ users: users.concat(val.items), enableBtn: val.items.length === 12 });
            });
         }
      );
   };

   render() {
      const { users, enableBtn, noResultState, query } = this.state;
      const LoadMoreBtn = () => {
         return (
            <p className='text-center'>
               <button className='mt-3 btn btn-outline-secondary' type='button' onClick={this.actionLoadMore}>
                  LOAD MORE
               </button>
            </p>
         );
      };

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
                  {users.length > 0 &&
                     users.map((user) => (
                        <div className='col-4' key={user.id}>
                           <div className='user'>
                              <Card data={user} />
                           </div>
                        </div>
                     ))}
               </div>

               {users.length === 0 && noResultState && query !== '' && (
                  <div className='row no-result'>
                     <div className='col-12'>
                        <div className=' alert alert-warning' role='alert'>
                           No result found
                        </div>
                     </div>
                  </div>
               )}

               <div className='row'>
                  <div className='col-12'>{enableBtn && <LoadMoreBtn />}</div>
               </div>
            </div>
         </div>
      );
   }
}

export default App;
