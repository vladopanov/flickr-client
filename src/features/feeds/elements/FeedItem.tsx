import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Feed } from '@models/Feed';

interface IProps {
  feed: Feed;
}

export class FeedItem extends React.Component<IProps, {}> {
  public render() {
    const description = this.mapDescription();
    return (
      <div className='col-sm-6 col-lg-4 feed'>
        <div className='feed-img'>{description[1]}</div>
        <div className='card-body'>
          <div className='card-text title'>
            <a target='_blank' rel='noopener noreferrer' href={this.props.feed.imageFlickrLink}>{this.props.feed.imageTitle}</a>
            &nbsp;by&nbsp;
            <a target='_blank' rel='noopener noreferrer' href={this.props.feed.authorFlickrLink}>{this.props.feed.authorName}</a>
          </div>
          {description[2] && <div>
            <strong>Description: </strong>
            <span className='description'>{description[2]}</span>
          </div>}
          {this.props.feed.tags && <div className='tags'>
            <strong>Tags:</strong> <span>{this.props.feed.tags}</span>
          </div>}
        </div>
      </div>
    );
  }

  private mapDescription(): React.ReactNode {
    // Using the description props instead of direct feed's props is better because of useful styles and props.
    const description = ReactHtmlParser(this.props.feed.description).filter((el => {
      return el.type === 'p';
    }));

    return description;
  }
}
