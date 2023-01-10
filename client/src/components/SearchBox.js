import React, { useState } from 'react';

const SearchBox = (props) => {
  const [searchValue, setSearchValue] = useState('');
  
  const onKeyDownHandler = (event) => {
    if (event.key === 'Enter' && searchValue && searchValue.length > 0) {
      props.setSearchValue(searchValue);
    }
  }

  return (
    <div className='col'>
    <div className='form-group has-success has-feedback'>
      <input 
        type='text'
        className='form-control'
        id='inputSuccess4'
        value={props.value}
        onChange={(event)=> setSearchValue(event.target.value)} 
        onKeyDown={onKeyDownHandler} 
        placeholder='Type to search...'></input>
      <span className='form-control-feedback search-icon-container'>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' className='bi bi-search' viewBox='0 0 16 16'>
          <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'/>
        </svg>
      </span>
    </div>
      {/* <input 
      className='form-control' 
      type='text'
      value={props.value} 
      onChange={(event)=> setSearchValue(event.target.value)} 
      onKeyDown={onKeyDownHandler} 
      placeholder='Type to search...'
      ></input> */}
      </div>
  );
};

export default SearchBox;