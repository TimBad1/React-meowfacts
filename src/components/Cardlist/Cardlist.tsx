import { useDispatch, useSelector } from 'react-redux/es/exports';
import { RootState, toggleLikeFilter } from '../../store';
import { Card, ICard } from '../Card/Card';
import { FilterIcon } from '../Icons/FilterIcon';
import './cardlist.css';

export function Cardlist() {
  const dispatch = useDispatch();
  const preload = useSelector<RootState, string>(state => state.commentText);
  const posts = useSelector<RootState, ICard[]>(state => state.posts);
  const filter = useSelector<RootState, boolean>(state => state.filter);
  console.log('filter', filter);
    
  const toggleFilter = () => {
    dispatch(toggleLikeFilter(!filter))
  }

  return (
    <>
      { posts && posts.length > 0 
        ? (<>
        <button className='card-list-filter-btn' onClick={() => toggleFilter()}><FilterIcon like={filter}/></button>
        <ul className='card-list'>
          {!filter 
            ? posts.map(post => <Card key={post.id} descr={post.descr} like={post.like} id={post.id} />)
            : posts.filter(post => post.like === true).map(post => <Card key={post.id} descr={post.descr} like={post.like} id={post.id} />)
          }
        </ul>
        </>
        ) : (
          <p>{preload}</p>
        )}
    </>
  );
}
