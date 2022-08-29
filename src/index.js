import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//These imports won't work until you fix ./components/index.js
import {
  //Feature,
  Loading,
  Preview,
  Search,
  Feature,
  Title
} from './components';
/**
   * We are at the App level component, which is top-most. Any state which needs to be shared between immediate children should
   * be made here, so create state pairs using useState() for:
   * 
   * searchResults, setSearchResults (default should be this object:  {info: {}, records: []} )
   * featuredResult, setFeaturedResult (default should be null)
   * isLoading, setIsLoading (default should be false)
   */
const App = () => {
  
  const [searchResults, setSearchResults] = useState ({info: {}, records: []});

  const [featuredResult, setFeaturedResult] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);

  return <div className="app">

  {/* /**
   * We are at the App level component, which is top-most. Any state which needs to be shared between immediate children should
   * be made here, so create state pairs using useState() for:
   * 
   * searchResults, setSearchResults (default should be this object:  {info: {}, records: []} )
   * featuredResult, setFeaturedResult (default should be null)
   * isLoading, setIsLoading (default should be false)

    <Title />
    {/* <Search /> needs props for setIsLoading and setSearchResults (trigger <Loading /> on search start/end, and transfer results to preview) */}
    
    <Title />
    <Search setIsLoading = {setIsLoading} setSearchResults = {setSearchResults}/> 
    
    {/* <Preview /> needs props for searchResults, setIsLoading and setSearchResults (clicking prev/next buttons), and setFeaturedResult (clicking a preview) */}
    <Preview searchResults = {searchResults} setIsLoading = {setIsLoading} setSearchResults = {setSearchResults} setFeaturedResult = {setFeaturedResult} />
    
    <Feature featuredResult = {featuredResult} setIsLoading = {setIsLoading} setSearchResults = {setSearchResults} /> 
    
    {isLoading ? <Loading /> : null} 
  </div>
}

/**
 * Boostrap the <App /> component into the '#app' element in the DOM,
 * using ReactDOM.render();
 */
 ReactDOM.render(<App />, document.getElementById('app'));