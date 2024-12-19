import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchPage.scss';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div className="search-page">
      <h1>Search Results for: {query}</h1>
      {/* Add search results content */}
    </div>
  );
}; 