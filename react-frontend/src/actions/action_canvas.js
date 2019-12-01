export const CANVAS_UPDATE_INPUT_DIMENSIONS = 'CANVAS_UPDATE_INPUT_DIMENSIONS'
export const CANVAS_UPDATE_BRUSHSIZE = 'CANVAS_UPDATE_BRUSHSIZE'
export const CANVAS_UPDATE_BRUSHCOLOR = 'CANVAS_UPDATE_BRUSHCOLOR'
export const CANVAS_SET_CANVAS = 'CANVAS_SET_CANVAS'
export const CANVAS_PUSH_LINEARRAY = 'CANVAS_PUSH_LINEARRAY'
export const CANVAS_SLICE_LINEARRAY = 'CANVAS_SLICE_LINEARRAY'
export const CANVAS_UNSHIFT_FUTURE_LINEARRAY = 'CANVAS_UNSHIFT_FUTURE_LINEARRAY'
export const CANVAS_SLICE_FUTURE_LINEARRAY = 'CANVAS_SLICE_FUTURE_LINEARRAY'
export const CANVAS_CLEAR_FUTURE_LINEARRAY = 'CANVAS_CLEAR_FUTURE_LINEARRAY'

export const updateCanvasDimensions = (width, height) => dispatch => {
  dispatch({
    type: CANVAS_UPDATE_INPUT_DIMENSIONS,
    width: width,
    height: height
  })
}

export const updateBrushSize = size => dispatch => {
  dispatch({
    type: CANVAS_UPDATE_BRUSHSIZE,
    size: size
  })
}

export const updateBrushColor = color => dispatch => {
  dispatch({
    type: CANVAS_UPDATE_BRUSHCOLOR,
    color: color
  })
}

export const setCanvas = canvas => dispatch => {
  dispatch({
    type: CANVAS_SET_CANVAS,
    canvas: canvas
  })
}

export const pushLineArray = line => dispatch => {
  dispatch({
    type: CANVAS_PUSH_LINEARRAY,
    line: line
  })
}

export const sliceLineArray = index => dispatch => {
  dispatch({
    type: CANVAS_SLICE_LINEARRAY,
    index: index
  })
}

export const unshiftFutureLineArray = line => dispatch => {
  dispatch({
    type: CANVAS_UNSHIFT_FUTURE_LINEARRAY,
    line: line
  })
}

export const sliceFutureLineArray = index => dispatch => {
  dispatch({
    type: CANVAS_SLICE_FUTURE_LINEARRAY,
    index: index
  })
}

export const clearFutureLineArray = () => dispatch => {
  dispatch({
    type: CANVAS_CLEAR_FUTURE_LINEARRAY
  })
}