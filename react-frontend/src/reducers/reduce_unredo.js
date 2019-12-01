import { RESET_IMG, PICK_NEW_IMG } from '../actions'
import {
  UNREDO_SET_MOUSEDOWN,
  UNREDO_UPDATE_CHUNK_INDEX,
  UNREDO_PUSH_LINES_CHUNK,
  UNREDO_SLICE_LINES_CHUNK
} from '../actions/action_unredo'

const initialState = {
  isMouseDown: false,
  chunkIdx: 0,
  linesArrayChunk: [0]
}

const reducerClick = (state = initialState, action) => {
  switch (action.type) {
    case UNREDO_SET_MOUSEDOWN:
      return {
        ...state,
        isMouseDown: action.isDown
      }
    case UNREDO_UPDATE_CHUNK_INDEX:
      return {
        ...state,
        chunkIdx: action.index
      }
    case UNREDO_PUSH_LINES_CHUNK:
      return {
        ...state,
        linesArrayChunk: [...state.linesArrayChunk, action.chunk]
      }
    case UNREDO_SLICE_LINES_CHUNK:
      return {
        ...state,
        linesArrayChunk: state.linesArrayChunk.slice(0, action.index)
      }
    case (RESET_IMG || PICK_NEW_IMG):
      return {
        ...state,
        chunkIdx: 0,
        linesArrayChunk: [0]
      }
    default:
      return state
  }
}

export default reducerClick