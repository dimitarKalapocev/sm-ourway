import { createContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../utils/http';

const initialState = {
  company: [],
  tools: [],
  howto: [],
  organisation: [],
};

export const ArticlesContext = createContext({
  ...initialState,
});

export default function ArticlesContextProvider({ children }) {
  const [state, setState] = useState(initialState);
  let token = localStorage.getItem('token');

  const { data: companyData } = useQuery({
    queryKey: ['articles', 'company'],
    queryFn: () => fetchData('company'),
    enabled: !!token,
  });
  const { data: toolsData } = useQuery({
    queryKey: ['articles', 'tools'],
    queryFn: () => fetchData('tools'),
    enabled: !!token,
  });
  const { data: howtoData } = useQuery({
    queryKey: ['articles', 'howto'],
    queryFn: () => fetchData('howto'),
    enabled: !!token,
  });
  const { data: organisationData } = useQuery({
    queryKey: ['articles', 'organisation'],
    queryFn: () => fetchData('organisation'),
    enabled: !!token,
  });

  useEffect(() => {
    if (companyData && toolsData && howtoData && organisationData) {
      setState({
        company: companyData.filter(
          (item) =>
            !item.content.rendered.includes(
              'Sorry, but you do not have permission to view this content.'
            )
        ),
        tools: toolsData.filter(
          (item) =>
            !item.content.rendered.includes(
              'Sorry, but you do not have permission to view this content.'
            )
        ),
        howto: howtoData.filter(
          (item) =>
            !item.content.rendered.includes(
              'Sorry, but you do not have permission to view this content.'
            )
        ),
        organisation: organisationData.filter(
          (item) =>
            !item.content.rendered.includes(
              'Sorry, but you do not have permission to view this content.'
            )
        ),
      });
    }
  }, [companyData, toolsData, howtoData, organisationData]);

  return (
    <ArticlesContext.Provider value={state}>
      {children}
    </ArticlesContext.Provider>
  );
}