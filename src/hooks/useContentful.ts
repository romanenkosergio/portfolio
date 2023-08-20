import { useEffect, useMemo, useState } from 'react';

export interface IContentfulProjectData {
  projectTitle: string;
  projectDescription: string;
  projectImage: {
    url: string;
  };
  projectTechnologies: string;
  showTheProject: boolean;
}

type ContentfulDataType = IContentfulProjectData[] | string;

const useContentful = (type: 'about' | 'projects', queryName: string = '') => {
  const contentfulQuery = useMemo(() => {
    if (type === 'about') {
      return `
      aboutMePage(id:"3tPcK7lfpBa8B9dBYPvWKV") {
        ${queryName}
      }
    `;
    }
    return `projectsCollection {
      items {
        projectTitle
        projectImage {
          url
        }
        projectDescription
        projectTechnologies
        showTheProject
      }
    }`;
  }, [type, queryName]);

  const [data, setData] = useState<ContentfulDataType>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `
      query {
        ${contentfulQuery}
      }
    `;

    fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      }
    )
      .then(response => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        if (type === 'projects') {
          setData(data.projectsCollection.items);
        } else {
          setData(data.aboutMePage[queryName]);
        }
        setLoading(false);
      });
  }, [contentfulQuery, type, queryName]);

  return { data, loading };
};

export default useContentful;
