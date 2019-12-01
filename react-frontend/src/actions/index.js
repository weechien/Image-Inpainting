export const INPUT_PROCESSING = 'INPUT_PROCESSING'
export const OUTPUT_PROCESSING = 'OUTPUT_PROCESSING'
export const INPUT_SAVEFILE = 'INPUT_SAVEFILE'
export const OUTPUT_SAVEFILE = 'OUTPUT_SAVEFILE'
export const RESET_IMG = 'RESET_IMG'
export const PICK_NEW_IMG = 'PICK_NEW_IMG'
export const CANVAS_UPDATE_SIZE = 'CANVAS_UPDATE_SIZE'
export const INPUT_COLUMN_WIDTH = 'INPUT_COLUMN_WIDTH'
export const SHOW_CLOSE_MODAL = 'SHOW_CLOSE_MODAL'

export const setInputProcessing = status => dispatch => {
  dispatch({
    type: INPUT_PROCESSING,
    status: status
  })
}

export const setOutputProcessing = status => dispatch => {
  dispatch({
    type: OUTPUT_PROCESSING,
    status: status
  })
}

export const saveInputFile = file => dispatch => {
  dispatch(setInputProcessing(true))

  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => {
    dispatch({
      type: INPUT_SAVEFILE,
      file: e.target.result
    })
  }
}

export const saveOutputFile = file => dispatch => {
  dispatch(setOutputProcessing(true))

  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => {
    dispatch({
      type: OUTPUT_SAVEFILE,
      file: e.target.result
    })
  }
}

export const resetImage = () => (dispatch, getState) => {
  const { canvas, canvasWidth, canvasHeight } = getState().canvas
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  dispatch({
    type: RESET_IMG
  })
}

export const pickNewImage = () => dispatch => {
  dispatch({
    type: PICK_NEW_IMG
  })
}

export const updateCanvasSize = size => dispatch => {
  dispatch({
    type: CANVAS_UPDATE_SIZE,
    size: size
  })
}

export const updateInputColWidth = value => dispatch => {
  dispatch({
    type: INPUT_COLUMN_WIDTH,
    value: value
  })
}

export const downloadOutputImage = () => (dispatch, getState) => {
  const { outputImageFile } = getState().main

  let a = document.createElement('a')
  a.download = new Date().toISOString().slice(0, 19).replace('T', '_') + '.png'
  a.href = outputImageFile
  a.click()
}

export const showCloseModal = showModal => dispatch => {
  dispatch({
    type: SHOW_CLOSE_MODAL,
    showModal: showModal
  })
}