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
        <form className='form-inline'>
          <input
            className='form-control mr-sm-2'
            type='search'
            placeholder='Search by tag...'
            aria-label='Search' />
          <button
            className='btn btn-outline-success my-2 my-sm-0'
            type='submit'
            onClick={this.handleClickSearchButton}
          >
            Search
          </button>
        </form>
      </div>
    );
  }

  private handleClickSearchButton = (e: any) => {
    const value = e.target.previousSibling.value;
    this.props.searchByTag(value);
  }
}