import * as React from 'react';

interface IProps {
  searchByTag: (value: string) => void;
}

export class FeedFilter extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
    this.handleClickSearchButton = this.handleClickSearchButton.bind(this);
  }
  public render() {
    return (
      <div className='feed-filter'>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span
              className='input-group-text clear-button'
              id='basic-addon1'
              onClick={this.handleClearClick}
            >
              X
            </span>
          </div>
          <input
            type='text'
            className='form-control'
            placeholder='Search by multiple tags separated by comma...'
            aria-label='Search by tags'
            aria-describedby='button-addon2'
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              id='button-addon2'
              onClick={this.handleClickSearchButton}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  private handleClickSearchButton = (e: any) => {
    e.preventDefault();
    const value = e.target.parentNode.previousSibling.value;
    this.props.searchByTag(value);
  }

  private handleClearClick = (e: any) => {
    e.preventDefault();
    e.target.parentNode.nextSibling.value = '';
    this.props.searchByTag('');
  }
}