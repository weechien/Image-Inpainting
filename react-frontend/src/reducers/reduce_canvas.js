import { RESET_IMG, PICK_NEW_IMG } from '../actions'
import {
  CANVAS_UPDATE_INPUT_DIMENSIONS,
  CANVAS_UPDATE_BRUSHSIZE,
  CANVAS_UPDATE_BRUSHCOLOR,
  CANVAS_SET_CANVAS,
  CANVAS_PUSH_LINEARRAY,
  CANVAS_SLICE_LINEARRAY,
  CANVAS_UNSHIFT_FUTURE_LINEARRAY,
  CANVAS_SLICE_FUTURE_LINEARRAY,
  CANVAS_CLEAR_FUTURE_LINEARRAY,
} from '../actions/action_canvas'

const initialState = {
  canvasWidth: 100,
  canvasHeight: 1,
  canvasBrushSize: 5,
  canvasBrushColor: '#000000',
  canvas: null,
  linesArray: [],
  futureLinesArray: []
}

const reducerCanvas = (state = initialState, action) => {
  switch (action.type) {
    case CANVAS_UPDATE_INPUT_DIMENSIONS:
      return {
        ...state,
        canvasWidth: action.width,
        canvasHeight: action.height
      }
    case CANVAS_UPDATE_BRUSHSIZE:
      return {
        ...state,
        canvasBrushSize: action.size
      }
    case CANVAS_UPDATE_BRUSHCOLOR:
      return {
        ...state,
        canvasBrushColor: action.color
      }
    case CANVAS_SET_CANVAS:
      return {
        ...state,
        canvas: action.canvas
      }
    case CANVAS_PUSH_LINEARRAY:
      return {
        ...state,
        linesArray: [...state.linesArray, ...action.line]
      }
    case CANVAS_SLICE_LINEARRAY:
      return {
        ...state,
        linesArray: state.linesArray.slice(0, action.index)
      }
    case CANVAS_UNSHIFT_FUTURE_LINEARRAY:
      return {
        ...state,
        futureLinesArray: [...action.line, ...state.futureLinesArray]
      }
    case CANVAS_SLICE_FUTURE_LINEARRAY:
      return {
        ...state,
        futureLinesArray: state.futureLinesArray.slice(action.index, state.futureLinesArray.length)
      }
    case CANVAS_CLEAR_FUTURE_LINEARRAY:
      return {
        ...state,
        futureLinesArray: []
      }
    case PICK_NEW_IMG:
    case RESET_IMG:
      return {
        ...state,
        linesArray: [],
        futureLinesArray: []
      }
    default:
      return state
  }
}

export default reducerCanvas