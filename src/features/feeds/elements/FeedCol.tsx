import * as React from 'react';
import { Feed } from '@models/Feed';

interface IProps {
  feed: Feed;
}

export const FeedCol = (props: IProps) =>
  <div className='col-md-4 feed'>
    <div className='card mb-4 shadow-sm'>
      <img className='card-img-top img-responsive'
        data-src='holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail'
        alt='Thumbnail [100%x225]'
        style={{ height: '225px', width: '100%', display: 'block' }}
        src={props.feed.imageUrl}
        data-holder-rendered='true'
        />
      <div className='card-body'>
        <p className='card-text'>
          <a href={props.feed.imageFlickrLink}>{props.feed.imageTitle}</a>
          &nbsp;by&nbsp;
          <a href={props.feed.authorFlickrLink}>{props.feed.authorName}</a>
        </p>
        <p>
          <strong>Description:</strong> <span>{props.feed.description}</span>
        </p>
        <p>
          <strong>Tags:</strong> <span>{props.feed.tags}</span>
        </p>
      </div>
    </div>
  </div>;
