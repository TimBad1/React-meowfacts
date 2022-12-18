import { ActionCreator, AnyAction, Reducer } from "redux";
import { ICard } from "./components/Card";

export type RootState = {
    commentText: string;
    posts: ICard[];
    filter: boolean;
  }
  
  const initialState: RootState = {
    commentText: 'Фактов не обнаружено',
    posts: [],
    filter: false,
  }
  
  export const updatePosts: ActionCreator<AnyAction> = (posts:ICard[]) => ({
    type: UPDATE_POSTS,
    posts,
  })
  
  export const toggleLikePost: ActionCreator<AnyAction> = (id: number) => ({
    type: TOGGLE_LIKE_POST,
    id,
  })

  export const deleteItemPost: ActionCreator<AnyAction> = (id: number) => ({
    type: DELETE_ITEM_POSTS,
    id,
  })

  export const toggleLikeFilter: ActionCreator<AnyAction> = (filter: boolean) => ({
    type: TOGGLE_LIKE_FILTER,
    filter,
  })
  
  export const TOGGLE_LIKE_POST = 'TOGGLE_LIKE_POST';
  export const UPDATE_POSTS = 'UPDATE_POSTS';
  export const DELETE_ITEM_POSTS = 'DELETE_ITEM_POSTS';
  export const TOGGLE_LIKE_FILTER = 'TOGGLE_LIKE_FILTER';
  
  export const rootReducer: Reducer <RootState> = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_POSTS:
        return {
          ...state,
          posts: action.posts,
        }
      
      case TOGGLE_LIKE_POST:
        return {
          ...state,
          posts: state.posts.map(post => {
            return post.id === action.id ? { id: post.id, descr: post.descr, like:!post.like} : post
          })
        }

      case DELETE_ITEM_POSTS:
        return {
          ...state,
          posts: state.posts.filter(post => post.id !== action.id)
        }
      
      case TOGGLE_LIKE_FILTER:
        return {
          ...state,
          filter: action.filter,
        }

      default:
        return state;
    }
  }