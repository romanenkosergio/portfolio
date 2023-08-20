import React, { FC, useEffect, useMemo } from 'react';
import {
  RiArrowDropRightLine,
  RiFolder3Fill,
  RiMailFill,
  RiMarkdownFill,
  RiPhoneFill,
} from 'react-icons/ri';

import { Accordion } from 'components';

import { IAboutDrawerRightProps } from './types';
import { ABOUT_ME_INFO, IAboutMeInfo } from 'utils/constants';

const AboutDrawerRight: FC<IAboutDrawerRightProps> = ({
  activeTab,
  openedTab,
  setOpenedTab,
  setActiveInfo,
  activeInfo,
}) => {
  const updateActiveInfo = (info: string) => {
    setActiveInfo(info);
  };

  const updateOpenedTabs = (tab: IAboutMeInfo) => {
    if (tab?.children) {
      setOpenedTab(tab.title);
      if (openedTab !== tab.title) {
        updateActiveInfo(tab.children[0]);
      }
    } else {
      updateActiveInfo(tab.title);
      setOpenedTab('');
    }
  };

  useEffect(() => {
    updateOpenedTabs(ABOUT_ME_INFO[activeTab][0]);
  }, [activeTab]);

  const RenderInfo = useMemo(() => {
    const currentInfoBlock: IAboutMeInfo[] = ABOUT_ME_INFO[activeTab];
    return (
      <>
        {currentInfoBlock.map((info, idx) => (
          <div
            className="about-drawer-right__item"
            key={`${info.title}-${idx}`}
          >
            <div
              className={`about-drawer-right__item-title${
                openedTab === info.title
                  ? ' about-drawer-right__item-title--opened'
                  : ''
              }${
                activeInfo === info.title
                  ? ' about-drawer-right__item-title--active'
                  : ''
              }`}
              onClick={() => updateOpenedTabs(info)}
            >
              {info?.children && (
                <RiArrowDropRightLine className="about-drawer-right__item-arrow" />
              )}
              {info?.children ? (
                <RiFolder3Fill
                  className="about-drawer-right__item-icon"
                  fill={info?.fill}
                />
              ) : (
                <RiMarkdownFill className="about-drawer-right__item-markdown" />
              )}
              <span>{info.title}</span>
            </div>
            {info?.children && (
              <div
                className={`about-drawer-right__body${
                  openedTab === info.title
                    ? ' about-drawer-right__body--opened'
                    : ''
                }`}
              >
                <div className="about-drawer-right__body-content">
                  {info.children.map((child, idx) => (
                    <div
                      className={`about-drawer-right__body-item${
                        activeInfo === child
                          ? ' about-drawer-right__body-item--active'
                          : ''
                      }`}
                      key={child}
                      onClick={() => updateActiveInfo(child)}
                    >
                      <RiMarkdownFill className="about-drawer-right__item-markdown" />
                      <span>{child}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </>
    );
  }, [activeTab, openedTab, activeInfo]);

  return (
    <div className="about-drawer__right about-drawer-right">
      <Accordion title={activeTab} isOpen>
        <div className="about-drawer__content about-drawer-right__content">
          {RenderInfo}
        </div>
      </Accordion>
      <Accordion title="contacts" isOpen>
        <div className="about-drawer__content">
          <a href="mailto:sergromanenko97@gmail.com">
            <RiMailFill className="icon" />
            <span>sergromanenko97@gmail.com</span>
          </a>
          <a href="tel:+380731055010">
            <RiPhoneFill className="icon" />
            <span>+38(073)1055010</span>
          </a>
        </div>
      </Accordion>
    </div>
  );
};

export default AboutDrawerRight;
