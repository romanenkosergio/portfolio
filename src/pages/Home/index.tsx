import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { SnakeGame } from 'components';

import './styles.scss';

const Home: FC = () => {
  return (
    <>
      <Helmet>
        <title>HI all. I am Serhii Romanenko</title>
        <meta
          name="description"
          content="Welcome! I'm a Senior Frontend Developer showcasing my portfolio. Play the 'Snake' game, visit my Github. Let's build something amazing together!"
        />
      </Helmet>
      <div className="home">
        <div className="home__container">
          <div className="home__content">
            <div className="home__content-header">
              <div className="home__content-greeting">
                <span>Hi all. I am</span>
              </div>
              <h1 className="home__content-name">Serhii Romanenko</h1>
              <div className="home__content-profession">
                {'>'} Front-end developer
              </div>
            </div>
            <div className="home__content-footer">
              <p className="home__content-comment comment-el">
                {'//'} complete the game to continue
              </p>
              <p className="home__content-comment comment-el">
                {'//'} you can also see it on my Github page
              </p>
              <div className="home__content-github">
                <span className="js js-name">const</span>
                <span className="js js-var">githubLink</span>
                <span className="js js-math">=</span>
                <span className="js js-value">
                  “
                  <a href="" target="_blank" rel="noopener noreferrer">
                    https://github.com/example/url
                  </a>
                  ”
                </span>
              </div>
            </div>
          </div>
          <div className="home__game">
            <SnakeGame />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
