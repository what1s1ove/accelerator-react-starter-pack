import React, {useEffect, useState} from 'react';
import {useFetchAlikeGuitarsQuery} from '../../../service/api';

type SearchTermProps = {
  searchTerm: string;
};

function SearchResult ({searchTerm}:SearchTermProps) {
  const [name, setName] = useState(searchTerm);

  const {data} = useFetchAlikeGuitarsQuery(name);

  useEffect(() => {
    if (searchTerm && (searchTerm.length === 0 || searchTerm.length > 1)) {
      setName(searchTerm);
    }
  }, [searchTerm]);


  return (
    <ul style={{zIndex: 1}} className={`form-search__select-list ${!name ? 'hidden' : ''}`}>
      {data && data.map((dataItem) => (
        <li className="form-search__select-item" tabIndex={0} key={dataItem.id}>{dataItem.name}</li>
      ))}
    </ul>
  );
}

export default SearchResult;
