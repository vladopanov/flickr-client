import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class ContactView extends React.Component<RouteComponentProps<{}>, {}> {
  public render() {
    return <div>
      <h1>Contact</h1>
      <p>Email to: <a href='mailto:vladopanov82@gmail.com'>Vladimir Panov</a>.</p>
    </div>;
  }
}
