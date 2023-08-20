import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  RiGamepadFill,
  RiInformationFill,
  RiTerminalBoxFill,
} from 'react-icons/ri';

import { Breadcrumbs, CodeEditor, CustomGist } from 'components';
import AboutDrawerRight from 'pages/About/AboutDrawerRight';

import { IDrawerItems, TAB_TYPE } from './types';
import { camelize } from 'helpers';
import { useContentfulStore, useGitHubStore } from 'store';

import './styles.scss';

const About = () => {
  const [activeTab, setActiveTab] = useState<TAB_TYPE>(TAB_TYPE.PERSONAL_INFO);
  const [openedTab, setOpenedTab] = useState<string>('bio');
  const [activeInfo, setActiveInfo] = useState<string>('about-me');

  const { fetchGithubData, githubData } = useGitHubStore(state => state);
  const { aboutMe } = useContentfulStore(state => state);

  const activeData = useMemo(
    () => aboutMe[camelize(activeInfo)],
    [aboutMe, activeInfo]
  );

  useEffect(() => {
    fetchGithubData();
  }, []);

  const RenderItems = useMemo(() => {
    const items: IDrawerItems[] = [
      { icon: RiInformationFill, name: TAB_TYPE.PERSONAL_INFO },
      { icon: RiTerminalBoxFill, name: TAB_TYPE.PROFESSIONAL_INFO },
      { icon: RiGamepadFill, name: TAB_TYPE.HOBBIES },
    ];
    return (
      <>
        {items.map((Item, index) => (
          <div className="about-drawer__item" key={index}>
            <Item.icon
              onClick={() => setActiveTab(Item.name)}
              className={`about-drawer__item-icon ${
                activeTab === Item.name ? 'about-drawer__item-icon--active' : ''
              }`}
            />
          </div>
        ))}
      </>
    );
  }, [activeTab]);

  return (
    <>
      <Helmet>
        <title>About me</title>
        <meta
          name="description"
          content="Experienced Senior Frontend Developer. Crafting modern & intuitive web apps with cutting-edge tech. Let's collaborate on innovative projects!"
        />
      </Helmet>
      <div className="about">
        <div className="about-drawer drawer">
          <div className="about-drawer__left">{RenderItems}</div>
          <AboutDrawerRight
            {...{
              activeTab,
              openedTab,
              setOpenedTab,
              setActiveInfo,
              activeInfo,
            }}
          />
        </div>
        <div className="about__content">
          <Breadcrumbs items={activeTab} />
          <div className="page-content about__container">
            <div className="about__left">
              <CodeEditor code={activeData || ''} fontSize={16} />
            </div>
            <div className="about__right">
              <div className="about__right-title">
                <div className="code-el">{'//'} Code snippet showcase:</div>
              </div>
              <div className="about__right-content">
                {githubData.map((gist, index) => (
                  <CustomGist key={index} gist={gist} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
