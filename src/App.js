import React, { useEffect, useReducer, useRef, useCallback } from 'react';
import axios from 'axios';
import Cards from './components/Cards';
import Search from './components/Search';
import './App.scss';


/**
 * A tiny app that fetches data from https://api.elderscrollslegends.io/v1/cards
 * and displays a list of Elder Scrolls cards, fetched 20 at a time.
 */
function App() {
  let scrollTriggerRef = useRef(null);

  /** Card Reducer to handle various card actions */
  const cardReducer = (state, action) => {
    switch (action.type) {
      case 'STACK_CARDS':
        return { ...state, cards: state.cards.concat(action.cards) }
      case 'FETCH_CARDS':
        return { ...state, fetching: action.fetching }
      case 'CLEAR_CARDS':
        return { ...state, cards: [] }
      default:
        return state;
    }
  }

  /** Page reducer to handle various page actions */
  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_URL':
        return { ...state, url: action.url }
      case 'RESET_PAGE':
        return { ...state, page: 1 }
      case 'NEXT_PAGE':
        return { ...state, page: state.page + 1 }
      case 'UPDATE_SEARCHNAME':
        return { ...state, searchName: action.searchName }
      default:
        return state;
    }
  }

  /** Card data initialization */
  const [cardData, cardDispatch] = useReducer(cardReducer, {
    cards: [],
    fetching: false
  });

  /** Page data initialization */
  const [pageData, pageDispatch] = useReducer(pageReducer, {
    initialized: false,
    url: 'https://api.elderscrollslegends.io/v1/cards',
    page: 1,
    pageSize: 20,
    searchName: ''
  });

  /** Custom hook to fetch data from the elder scrolls api and
   * dispatch the appropriate actions upon getting the response.
   */
  const useFetch = (data, dispatch) => {
    useEffect(() => {
      dispatch({ type: 'FETCH_CARDS', fetching: true });
      const { url, page, pageSize, searchName } = data;
      axios.get(url, {
        params: {
          name: searchName ? searchName : undefined, // used by the search box above
          page,
          pageSize
        }
      })
        .then(response => {
          const cards = response.data.cards;
          dispatch({ type: 'STACK_CARDS', cards });
          dispatch({ type: 'FETCH_CARDS', fetching: false });
        })
        .catch(e => {
          dispatch({ type: 'FETCH_CARDS', fetching: false });
          return e;
        })
    }, [dispatch, data]);
  }

  /** Custom hook to initiate a new fetch of data once the end of
   * the card list is reached.
   */
  const useInfiniteScroll = (scrollRef, dispatch) => {
    const scrollObserver = useCallback(node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            dispatch({ type: 'NEXT_PAGE' });
          }
        });
      }).observe(node);
    }, [dispatch]);

    useEffect(() => {
      if (scrollRef.current) {
        scrollObserver(scrollRef.current);
      }
    }, [scrollObserver, scrollRef]);
  }

  useFetch(pageData, cardDispatch);
  useInfiniteScroll(scrollTriggerRef, pageDispatch);


  /** Handler for the Search component submit
   * clicking on the 'Go' button expects a value which is then passed a parameter for the 'name' search.
   * cliciking on the 'Reset' button clears the name search and resets the current page to the beginning.
   */
  const handleSubmit = (value) => {
    if (value) {
      pageDispatch({ type: 'UPDATE_SEARCHNAME', searchName: value });
    } else {
      pageDispatch({ type: 'UPDATE_SEARCHNAME', searchName: '' });
    }
    cardDispatch({ type: 'CLEAR_CARDS' });
    pageDispatch({ type: 'RESET_PAGE' });
  }

  return (
    <div className="main-content">
      {cardData.fetching && (
        <div className="overlay-container">
          <div className="overlay-content">
            <h1>...loading cards...</h1>
          </div>
        </div>
      )}

      <Search
        handleSubmit={handleSubmit} />

      <Cards
        data={cardData}
      />

      <div className='scroll-trigger' ref={scrollTriggerRef}></div>

    </div>
  );
}

export default App;