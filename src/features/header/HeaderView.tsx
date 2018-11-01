import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class HeaderView extends React.Component<{}, {}> {
  public render() {
    return <header>
      <div className='bg-dark collapse' id='navbarHeader'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-8 col-md-7 py-4'>
              <h4 className='text-white'>About</h4>
              <p className='text-muted'>A simple Flickr photo streamer.</p>
            </div>
            <div className='col-sm-4 offset-md-1 py-4'>
              <h4 className='text-white'>Links</h4>
              <ul className='list-unstyled'>
                <li><NavLink to={'/'} className='text-white'>Home</NavLink></li>
                <li><NavLink to={'/contact'} className='text-white'>Contact</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='navbar navbar-dark bg-dark shadow-sm'>
        <div className='container d-flex justify-content-between'>
          <Link to={'/'} className='navbar-brand d-flex align-items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='mr-2'><path d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z'></path><circle cx='12' cy='13' r='4'></circle></svg>
            <strong>Flickr Photo Stream</strong>
          </Link>
          <button className='navbar-toggler collapsed' type='button' data-toggle='collapse' data-target='#navbarHeader' aria-controls='navbarHeader' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
        </div>
      </div>
    </header>;
  }
}