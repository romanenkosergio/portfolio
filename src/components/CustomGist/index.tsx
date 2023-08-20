import React, { FC } from 'react';
import { RiChatSmile3Fill, RiStarLine, RiStarSFill } from 'react-icons/ri';

import { CodeEditor } from 'components';

import { ICustomGistProps } from './types';
import { formatDateToRelative } from 'helpers';

import './styles.scss';

const CustomGist: FC<ICustomGistProps> = ({ gist }) => {
  return (
    <div className="gist">
      <div className="gist__header">
        <div className="gist__header-left">
          <div className="gist__header-logo">
            <img src={gist.avatarUrl} alt="avatar" />
          </div>
          <div className="gist__header-info">
            <a
              href="https://github.com/romanenkosergio"
              target="_blank"
              rel="noreferrer"
              aria-label="Github Account"
              className="gist__header-info-name"
            >
              @{gist.login}
            </a>
            <span className="gist__header-info-date">
              {formatDateToRelative(gist.createdAt)}
            </span>
          </div>
        </div>
        <div className="gist__header-right">
          <div
            className={`gist__header-details${
              gist.description ? ' gist__header-details--hover' : ''
            }`}
          >
            <RiChatSmile3Fill />
            <span>details</span>
            {gist.description && (
              <p className="gist__header-description">{gist.description}</p>
            )}
          </div>
          <div className="gist__header-stars">
            {gist.stargazerCount > 0 ? <RiStarSFill /> : <RiStarLine />}
            <span>{gist.stargazerCount} stars</span>
          </div>
        </div>
      </div>
      <div className="gist__content">
        {gist.files.map((file, index: number) => (
          <CodeEditor
            code={file.text}
            key={`gist-code-${index}`}
            fontSize={14}
            backgroundColor={'transparent'}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomGist;
