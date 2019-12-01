import {
  updateInputColWidth,
  setOutputProcessing,
  saveOutputFile
} from './index.js'
import { toastr } from 'react-redux-toastr'

const fetchData = async (img, mask) => {
  const formData = new FormData()
  formData.append('image', img)
  formData.append('mask', mask)

  return await fetch('/upload', {
    method: 'POST',
    body: formData
  })
}

export const performInpainting = () => {
  return async (dispatch, getState) => {
    const { inputImageFile, constTotalCols } = getState().main
    const { canvasWidth, canvasHeight, linesArray } = getState().canvas

    dispatch(setOutputProcessing(true))
    dispatch(updateInputColWidth(constTotalCols / 2))
    
    var canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var ctx = canvas.getContext('2d')
    ctx.strokeStyle = '#ffffff'
    ctx.lineCap = 'round'
    linesArray.forEach((line, idx) => {
      ctx.lineWidth = line.size
      ctx.beginPath()
      ctx.moveTo(line.startX, line.startY)
      ctx.lineTo(line.endX, line.endY)
      ctx.stroke()
    })
    
    // First upload the mask
    toastr.info('Inpainting', 'Sending inpainting request to server')
    const res = await fetchData(inputImageFile, canvas.toDataURL()).catch(e => {
      toastr.error('Inpainting', 'There was an error uploading to the server: ' + e, 1000)
      dispatch(setOutputProcessing(false))
    })
    const resBlob = await res.blob()
    dispatch(saveOutputFile(resBlob))
    dispatch(setOutputProcessing(false))
  }
}
