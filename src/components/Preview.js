// import React from 'react';
import React from 'react';
// /**
//  * We need to import fetchQueryResultsFromURL since we will sometimes have urls in info.prev and info.next
//  * which are query urls.
//  */// import { fetchQueryResultsFromURL } from '../api';
// const Preview = (props) => {
//   /**
//    * Destructure setSearchResults, setFeaturedResult, and setIsLoading from props
//    * and also destructure info and records from props.searchResults
//    * 
//    * You need info, records, setSearchResults, setFeaturedResult, and setIsLoading as available constants
//    */
import { fetchQueryResultsFromURL } from '../api';

const Preview = (props) => {
    const {setSearchResults, setFeaturedResult, setIsLoading} = props;
    const {info, records} = props.searchResults;
    /**
     * Destructure setSearchResults, setFeaturedResult, and setIsLoading from props
     * and also destructure info and records from props.searchResults
     * 
     * You need info, records, setSearchResults, setFeaturedResult, and setIsLoading as available constants
     */
    /**
     * Don't touch this function, it's good to go.
     * 
     * It has to be defined inside the Preview component to have access to setIsLoading, setSearchResults, etc...
     */
    async function fetchPage(pageUrl) {
      setIsLoading(true);
  
      try {
        const results = await fetchQueryResultsFromURL(pageUrl);
        setSearchResults(results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  
    return <aside id="preview">
      <header className="pagination">
        {/* This button should be disabled if nothing is set in info.prev, and should call fetchPage with info.prev when clicked */}
        <button 
          disabled={info.prev ? false: true } 
          className="previous"
          onClick ={() => fetchPage(info.prev)}>Previous</button>
        {/* This button should be disabled if nothing is set in info.next, and should call fetchPage with info.next when clicked */}
        <button
          disabled={info.next ? false: true } 
          className="next"
          onClick={ () => fetchPage(info.next)}>Next</button>
      </header>
      <section className="results">

      {/* centuryList.map((century, idx) =>
            <option key={`${idx}:${century.name}`} value={century.name}>
              {century.name}
            </option>
          )
        } */}

        { props.searchResults.records.map ((record, index) => { 
           return <div  
            key={ index }
            className="object-preview"
            onClick={(event) => {
              event.preventDefault()
              setFeaturedResult(record)
              console.log(record)
              // prevent the default
              // set the featured result to be this records, using setFeaturedResult
            }}>
            { 
              record.primaryimageurl ? <img src={ record.primaryimageurl } alt={ record.description } /> : null
              // if the records.primaryimageurl exists, show this: <img src={ records.primaryimageurl } alt={ records.description } />, otherwise show nothing 
            }
            {
              record.title ? <h3>{ record.title }</h3> : <h3>MISSING INFO</h3>
              // if the records.title exists, add this: <h3>{ records.title }</h3>, otherwise show this: <h3>MISSING INFO</h3>
            }
          </div>
        }
        )}
       
                  
      </section>
    </aside>
  }
  
  export default Preview;