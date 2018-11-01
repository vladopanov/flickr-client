import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { CONSTANTS } from '@src/utils/constants';
import { FeedStore } from './FeedStore';
import { FeedCol } from './elements/FeedCol';

interface IProps extends RouteComponentProps {
  feedStore: FeedStore;
}

@inject(CONSTANTS.STORE_FEED)
@observer
export class FeedView extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    const feeds = this.props.feedStore.feeds;
    const cols = feeds.map((feed, index) => {
      return <FeedCol key={index} feed={feed} />;
    });

    return <div className='album py-5 bg-light'>
      <div className='container'>
        <div className='row'>
          {cols}
        </div>
      </div>
    </div>;
  }
}