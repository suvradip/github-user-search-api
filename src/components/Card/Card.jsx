import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import apiAgent from '../../util/api';
import './Card.scss';

const Card = ({ data }) => {
   const { login, avatar_url /* score */ } = data;

   const [show, setShow] = useState(false);
   const [userInfo, setUserInfo] = useState({});

   const handleClose = () => setShow(false);
   const handleShow = async () => {
      const promises = [apiAgent.users.get(login)];
      Promise.all(promises).then(([items]) => {
         setUserInfo(items);
         setShow(true);
      });
   };

   const getDateFormat = (param) => {
      const d = new Date(param);
      const [since] = d.toLocaleString().split(',');
      return since;
   };

   return (
      <div className='card'>
         {/* eslint-disable-next-line */}
         <div className='card-body' onClick={handleShow}>
            <div className='dp mb-3'>
               <img src={avatar_url} className='card-img' alt='' />
               <div className='user-info'>
                  <h5 className='card-title'>{login}</h5>
               </div>
            </div>

            {/* <p className='card-text score'>
               <span>{score}</span>
            </p> */}
         </div>

         <Modal show={show} onHide={handleClose}>
            <Modal.Body>
               <div className='row'>
                  <div className='col-12'>
                     <div className='card'>
                        <div className='card-body modal-card'>
                           <div className='modal-dp'>
                              <img src={userInfo.avatar_url} className='card-img' alt='...' />
                           </div>
                           <div className='p-info text-center'>
                              <h4 className='card-title'>{userInfo.name}</h4>
                              <div className='h6'>
                                 <p>
                                    @{userInfo.login}
                                    {userInfo.site_admin && <span className='ml-1 badge badge-info'>Admin</span>}
                                 </p>
                                 <p>
                                    <span>Since {getDateFormat(userInfo.created_at)}</span>
                                 </p>
                              </div>
                           </div>
                           <div className='github-info'>
                              <button type='button' className='btn btn-sm btn-outline-dark'>
                                 Repository <span className='badge badge-light'>{userInfo.public_repos}</span>
                              </button>
                              <button type='button' className='btn btn-sm btn-outline-dark'>
                                 Followers <span className='badge badge-light'>{userInfo.followers}</span>
                              </button>
                              <button type='button' className='btn btn-sm btn-outline-dark'>
                                 Following <span className='badge badge-light'>{userInfo.following}</span>
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer bsPrefix='modal-footer'>
               <button type='button' className='btn btn-secondary' onClick={handleClose}>
                  Close
               </button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};

Card.propTypes = {
   data: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
   }),
};

Card.defaultProps = {
   data: {},
};

export default Card;
