import * as React from 'react';

export class FooterView extends React.Component<{}, {}> {
  public render() {
    return <footer className='text-muted'>
    <div className='container'>
      <p className='float-right'>
        <a href='#'>Back to top</a>
      </p>
      <p>&copy; 2018 Vladimir Panov</p>
    </div>
  </footer>;
  }
}