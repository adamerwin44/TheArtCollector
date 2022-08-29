import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {

    const {
        searchTerm,
        searchValue,
        setIsLoading,
        setSearchResults
    } = props

    return <span className="content">
        <a href="#" onClick={async (event) => {
            event.preventDefault()
            setIsLoading(true)

            try {
                const results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue)
                setSearchResults(results)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }}> {searchValue} </a>
    </span>

}

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
const Feature = (props) => {

    const { featuredResult, setSearchResults, setIsLoading }  = props // this will contain all the facts needed
    // console.log(featuredResult)

    if(!featuredResult){
        return <main id="feature"></main>
    }

    const {
        title,
        dated,
        images, // THIS IS AN ARRAY
        //primaryimageurl, // only use if making image or something clickable
        description,
        culture, // SEARCHABLE
        style,
        //technique, // SEARCHABLE
       // medium, // SEARCHABLE
        dimensions,
        people, // SEARCHABLE -- person.displayname
        department,
        division,
        contact,
        creditline,
    } = featuredResult || {}

    return <main id="feature">
        
        <div className="object-feature">
            <header>
                <h3> {title}</h3> {/*<h3> {featuredResult.title}</h3>*/}
                <h4> {dated} </h4>
            </header>
            <section className="facts">
                {/* <span className="title">FACT NAME</span>
                <span className="content">FACT VALUE</span> */}
                {
                    description ?
                        <Fragment>
                            <span className="title">Description</span>
                            <span className="content">{description}</span>
                        </Fragment>
                        : null
                }
                
                {
                    culture ?
                        <Fragment>
                            <span className="title">Culture</span>
                            <Searchable searchTerm="culture" searchValue={culture} {...props} />
                        </Fragment> 
                        : null
                }
                
                {/* HW: ADD THE OTHERS HERE */}
                
                {
                    people ?
                    people.map((person, idx) => 
                       <Fragment key={idx} >
                            <span className="title">Person</span>
                            <Searchable searchTerm="person" searchValue={person.displayname} {...props} />
                        </Fragment> 
                        )
                        : null
                }
                {
                    style ?
                    <Fragment>
                    <span className="title">Style</span>
                    <Searchable searchTerm="style" searchValue={culture} {...props} />
                </Fragment> 
                : null
                }

                {
                     dimensions ?
                    <Fragment>
                    <span className="title">Dimensions</span>
                    <Searchable searchTerm="dimensions" searchValue={culture} {...props} />
                </Fragment> 
                : null
                }

                {
                     department ?
                    <Fragment>
                    <span className="title">Department</span>
                    <Searchable searchTerm="department" searchValue={culture} {...props} />
                </Fragment> 
                : null
                }

                {
                    division ?
                    <Fragment>
                    <span className="title">Division</span>
                    <Searchable searchTerm="division" searchValue={culture} {...props} />
                </Fragment> 
                : null
                    
                }
   
              {
                    contact ?
                    <Fragment>
                    <span className="title">Contact</span>
                    <Searchable searchTerm="contact" searchValue={culture} {...props} />
                </Fragment> 
                : null
                    
                }

                {
                    creditline ?
                    <Fragment>
                    <span className="title">creditline</span>
                    <Searchable searchTerm="creditline" searchValue={culture} {...props} />
                </Fragment> 
                : null
                }

                {
                    images ?
                    images.map((images, idx) =>
                       <Fragment key={idx} >
                            <span className="title">images</span>
                            <Searchable searchTerm="images" searchValue={images.displayname} {...props} />
                        </Fragment>
                        )
                        : null
                }






            </section>
            <section className="photos">
                {/* <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE /> 
                    remeber to map over the images array from props
                    use image.baseimageurl for image URL
                    use image.creditline or image.description for alt 
                    if you want to you can make image clickable with a tag and use primaryimageurl -- Will need a fragment
                */}
            </section>
        </div>
    </main>
}

export default Feature;