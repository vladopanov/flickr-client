import * as React from 'react';
import { HeaderView } from '../header/HeaderView';
import { FooterView } from '../footer/FooterView';

export interface LayoutProps {
  children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
  public render() {
    return <div className='layout'>
      <HeaderView />
      <main role='main'>
        {this.props.children}
      </main>
      <FooterView />
    </div>;
  }
}
