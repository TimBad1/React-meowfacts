import { composeWithDevTools } from '@redux-devtools/extension';
import axios from 'axios';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Action, applyMiddleware, createStore, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { ThunkAction } from 'redux-thunk/es/types';
import './App.css';
import { ICard } from './components/Card';
import { Cardlist } from './components/Cardlist';
// import { createData } from './hooks/useData';
import { rootReducer, RootState, updatePosts } from './store';

function createData(data: string[]) {
  return data.map((item, i) => {
    return {
      id: i,
      descr: item,
      like: false,
    }
  })
}

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
))

function App() {
  useEffect(() => {
    axios.get('https://meowfacts.herokuapp.com/?count=50')
    .then((resp) => {
      const data = createData(resp.data.data)
      store.dispatch(updatePosts(data))      
    })
    .catch(console.log);
  }, []) 

  return (
    <Provider store={store}>
      <div className='layout'>
        <h1 className="title">Факты о котах</h1>
          <Cardlist />
      </div>
    </Provider>
    
  );
}

export default App;


