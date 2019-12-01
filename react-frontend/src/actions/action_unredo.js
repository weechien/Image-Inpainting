import {
  pushLineArray,
  sliceLineArray,
  unshiftFutureLineArray,
  sliceFutureLineArray
} from './action_canvas'
export const UNREDO_SET_MOUSEDOWN = 'UNREDO_SET_MOUSEDOWN'
export const UNREDO_UPDATE_CHUNK_INDEX = 'UNREDO_UPDATE_CHUNK_INDEX'
export const UNREDO_PUSH_LINES_CHUNK = 'UNREDO_PUSH_LINES_CHUNK'
export const UNREDO_SLICE_LINES_CHUNK = 'UNREDO_SLICE_LINES_CHUNK'

var startLinesLen = 0

const setMouseDown = isDown => dispatch => {
  dispatch({
    type: UNREDO_SET_MOUSEDOWN,
    isDown: isDown
  })
}

export const updateChunkIdx = index => dispatch => {
  dispatch({
    type: UNREDO_UPDATE_CHUNK_INDEX,
    index: index
  })
}

export const pushLinesChunk = chunk => dispatch => {
  dispatch({
    type: UNREDO_PUSH_LINES_CHUNK,
    chunk: chunk
  })
}

export const sliceLinesChunk = index => dispatch => {
  dispatch({
    type: UNREDO_SLICE_LINES_CHUNK,
    index: index
  })
}

const redrawCanvas = (ctx, linesArray, canvasWidth, canvasHeight) => {
  if (!ctx) return
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  linesArray.forEach((line, idx) => {
    ctx.strokeStyle = line.color
    ctx.lineWidth = line.size
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(line.startX, line.startY)
    ctx.lineTo(line.endX, line.endY)
    ctx.stroke()
  })
}

export const undo = () => (dispatch, getState) => {
  const { canvas, linesArray, canvasWidth, canvasHeight } = getState().canvas
  const { chunkIdx, linesArrayChunk } = getState().unredo

  const linesArrayIdx = linesArrayChunk[chunkIdx - 1]
  const linesArrayTail = linesArray.slice(linesArrayIdx, linesArray.length)

  dispatch(updateChunkIdx(chunkIdx - 1))
  dispatch(sliceLineArray(linesArrayIdx))
  dispatch(unshiftFutureLineArray(linesArrayTail))
  redrawCanvas(canvas.getContext('2d'), linesArray.slice(0, linesArrayIdx), canvasWidth, canvasHeight)
}

export const redo = () => (dispatch, getState) => {
  const { canvas, linesArray, futureLinesArray, canvasWidth, canvasHeight } = getState().canvas
  const { chunkIdx, linesArrayChunk } = getState().unredo

  const linesArrayIdx = linesArrayChunk[chunkIdx + 1]
  const futureLinesArrayIdx = linesArrayIdx - linesArray.length
  const futureLinesArrayHead = futureLinesArray.slice(0, futureLinesArrayIdx)

  dispatch(updateChunkIdx(chunkIdx + 1))
  dispatch(sliceFutureLineArray(futureLinesArrayIdx))
  dispatch(pushLineArray(futureLinesArrayHead))
  redrawCanvas(canvas.getContext('2d'), linesArray.concat(futureLinesArrayHead), canvasWidth, canvasHeight)
}

export const handleMouseClick = event => (dispatch, getState) => {
  dispatch(setMouseDown(event.type === 'mouseup' ? false : true))

  const { linesArray } = getState().canvas
  const { chunkIdx, linesArrayChunk } = getState().unredo

  if (event.type === 'mouseup'
  && startLinesLen !== linesArray.length
  && chunkIdx === linesArrayChunk.length - 1) {
    dispatch(updateChunkIdx(chunkIdx + 1))
    dispatch(pushLinesChunk(linesArray.length))
  } else if (event.type === 'mousedown') {
    startLinesLen = linesArray.length
  }
}