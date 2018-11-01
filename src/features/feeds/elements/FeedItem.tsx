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
        <div className='description-img'>{description[1]}</div>
        <div className='card-body'>
          <div className='card-text title'>
            <a href={this.props.feed.imageFlickrLink}>{this.props.feed.imageTitle}</a>
            &nbsp;by&nbsp;
            <a href={this.props.feed.authorFlickrLink}>{this.props.feed.authorName}</a>
          </div>
          <div>
            <strong>Description: </strong>
            <span className='description'>{description[2] ? description[2] : null}</span>
          </div>
          <div className='tags'>
            <strong>Tags:</strong> <span>{this.props.feed.tags}</span>
          </div>
        </div>
      </div>
    );
  }

  private mapDescription(): React.ReactNode {
    // Firstly I thought to use the dto's direct props for rendering author, image, etc
    // but then I realized using the description parsed html would be better because of some useful styles and props.
    const description = ReactHtmlParser(this.props.feed.description).filter((el => {
      return el.type === 'p';
    }));

    return description;
  }
}
