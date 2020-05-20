import React, { useState } from 'react';
import './search.scss';

/** A simple search component that update the query parameters of the 
 * api call, depending on the button ('go' or 'reset') clicked.
 */
function Search(props) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!value) {
            setError('please enter a name.');
            return false;
        } else {
            setError('');
            return props.handleSubmit(value);
        }
    }

    const handleKeyDown = (event) => {
        if (error) {
            setError('');
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleReset = (event) => {
        event.preventDefault();
        setValue('');
        setError('');
        return props.handleSubmit();
    }

    return (
        <div id="search" className="container--search">
            <div className="search-section">
                <form name="search-form" onSubmit={handleSubmit}>
                    <div className="label"> Search Name: </div>
                    <div>
                        <input type="text" value={value} name="search" className="inputBox" onKeyDown={handleKeyDown} onChange={handleChange} /> &nbsp;
                        <button type="submit">Go</button> &nbsp;
                        <button onClick={handleReset}>Reset</button>
                        {error && <span className="error-message">{error}</span>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Search;