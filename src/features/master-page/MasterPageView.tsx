import * as React from 'react';
import { Header } from '@src/features/header/HeaderView';

class View extends React.Component<{}> {
  public render(): React.ReactNode {
    return (
      <div className='shell'>
        <Header />
      </div>
    );
  }
}

export const MasterPage = (View);