import React from 'react';

export default function NewsCard(props) {
  return (
    <div className="news-card">
      <div className="news-card__image-wrapper">
        <img src={props.image} />
      </div>
      <div className="news-card__content">
        <h3>{props.title}</h3>
        <div className="news-card__content__source">
          <p>{props.sourceName}</p>
          <p>{props.fromNow}</p>
        </div>
      </div>
    </div>
  );
}
