import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class EmailView extends React.Component<RouteComponentProps<{}>, {}> {
  public render() {
    return <div>
      <h1>Write an email</h1>
      <p>Here should be the form</p>
    </div>;
  }
}
