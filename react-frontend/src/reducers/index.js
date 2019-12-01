import { combineReducers } from 'redux'
import reducer_main from './reduce_main'
import reducer_canvas from './reduce_canvas'
import reducer_unredo from './reduce_unredo'
import reducer_kbevents from './reduce_kbevents'

export default combineReducers({
  main: reducer_main,
  canvas: reducer_canvas,
  unredo: reducer_unredo,
  kbevents: reducer_kbevents
})