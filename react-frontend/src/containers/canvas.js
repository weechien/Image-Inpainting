import { connect } from 'react-redux'
import CanvasDraw from '../components/canvas'
import { sliceLinesChunk } from '../actions/action_unredo'
import {
  updateCanvasDimensions,
  updateBrushSize,
  updateBrushColor,
  setCanvas,
  pushLineArray,
  clearFutureLineArray
} from '../actions/action_canvas'

const mapStateToProps = state => ({
  canvasBrushSize: state.canvas.canvasBrushSize,
  canvasBrushColor: state.canvas.canvasBrushColor,
  canvas: state.canvas.canvas,
  linesArray: state.canvas.linesArray,
  canvasSize: state.main.canvasSize,
  isMouseDown: state.unredo.isMouseDown,
})

export default connect(mapStateToProps, {
  updateCanvasDimensions,
  updateBrushSize,
  updateBrushColor,
  setCanvas,
  pushLineArray,
  clearFutureLineArray,
  sliceLinesChunk
})(CanvasDraw)
