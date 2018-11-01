import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { CONSTANTS } from '@src/utils/constants';
import { FeedStore } from './FeedStore';
import { FeedItem } from './elements/FeedItem';
import InfiniteScroll from 'react-infinite-scroller';
import { FeedFilter } from './elements/FeedFilter';

interface IProps extends RouteComponentProps {
  feedStore: FeedStore;
}

@inject(CONSTANTS.STORE_FEED)
@observer
export class FeedView extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.searchByTag = this.searchByTag.bind(this);
  }

  public render() {
    const feeds = this.props.feedStore.feeds;
    const feedItems = feeds.map((feed, index) => {
      return <FeedItem key={index} feed={feed} />;
    });

    return <div className='album py-5 bg-light'>
      <div className='container'>
        <FeedFilter
          searchByTag={this.searchByTag}
        />
        <InfiniteScroll
          className='row'
          pageStart={0}
          loadMore={this.handleLoadMore}
          hasMore={true || false}
          loader={<div className='loader' key={0}>Loading ...</div>}
          useWindow={true}
        >
          {feedItems}
        </InfiniteScroll>
      </div>
    </div>;
  }

  private handleLoadMore() {
    this.props.feedStore.searchFeeds();
  }

  private searchByTag(value: string) {
    this.props.feedStore.setTag(value);
  }
}