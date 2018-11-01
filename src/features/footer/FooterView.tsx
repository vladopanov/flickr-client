import * as React from 'react';

export class FooterView extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
    this.scrollFunction = this.scrollFunction.bind(this);
    this.topFunction = this.topFunction.bind(this);
  }

  public componentDidMount() {
    // When the user scrolls down 20px from the top of the document, show the button
    document.addEventListener('scroll', this.scrollFunction);
  }

  public render() {
    return <footer className='text-muted'>
      <div className='container'>
        <button
          id='top-button'
          onClick={this.topFunction}>
          Back to top
        </button>
        <p className='copyright'>&copy; 2018 Vladimir Panov</p>
      </div>
    </footer>;
  }

  private scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById('top-button').style.display = 'block';
    } else {
      document.getElementById('top-button').style.display = 'none';
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  private topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}