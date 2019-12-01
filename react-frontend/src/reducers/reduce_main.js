import {
  INPUT_PROCESSING,
  OUTPUT_PROCESSING,
  INPUT_SAVEFILE,
  OUTPUT_SAVEFILE,
  PICK_NEW_IMG,
  CANVAS_UPDATE_SIZE,
  INPUT_COLUMN_WIDTH,
  SHOW_CLOSE_MODAL
} from '../actions'

const initialState = {
  inputProcessing: null,
  outputProcessing: null,
  inputImageFile: null,
  outputImageFile: null,
  canvasSize: 10,
  inputColWidth: 13,
  constTotalCols: 16,
  constExpandedCols: 13,
  activeHotkeys: [],
  showModal: false
}

const reducerMain = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_PROCESSING:
      return {
        ...state,
        inputProcessing: action.status
      }
    case OUTPUT_PROCESSING:
      return {
        ...state,
        outputProcessing: action.status
      }
    case INPUT_SAVEFILE:
      return {
        ...state,
        inputImageFile: action.file
      }
    case OUTPUT_SAVEFILE:
      return {
        ...state,
        outputImageFile: action.file
      }
    case PICK_NEW_IMG:
      return {
        ...state,
        inputImageFile: null,
        outputImageFile: null,
        inputProcessing: null,
        outputProcessing: null
      }
    case CANVAS_UPDATE_SIZE:
      return {
        ...state,
        canvasSize: action.size
      }
    case INPUT_COLUMN_WIDTH:
      return {
        ...state,
        inputColWidth: action.value
      }
    case SHOW_CLOSE_MODAL:
      return {
        ...state,
        showModal: action.showModal
      }
    default:
      return state
  }
}

export default reducerMain