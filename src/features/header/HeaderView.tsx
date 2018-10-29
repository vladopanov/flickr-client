import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export class Header extends React.Component<{}> {
  public render() {
    return <div id='header-container'>
      <header className='wrapper clearfix'>
        <h1 id='title'>h1#title</h1>
        <nav>
          <ul>
            <li><a href='#'>nav ul li a</a></li>
            <li><a href='#'>nav ul li a</a></li>
            <li><a href='#'>nav ul li a</a></li>
          </ul>
        </nav>
      </header>
    </div>;
  }
}
