import { connect } from 'react-redux'
import Main from '../components/main'
import { undo, redo, handleMouseClick } from '../actions/action_unredo'
import { handleKeyDown } from '../actions/action_kbevents'
import {
  saveInputFile,
  setInputProcessing,
  updateCanvasSize,
  updateInputColWidth,
  resetImage,
  pickNewImage,
  downloadOutputImage,
  showCloseModal
} from '../actions'

const mapStateToProps = state => ({
  canvasWidth: state.canvas.canvasWidth,
  canvasHeight: state.canvas.canvasHeight,
  inputProcessing: state.main.inputProcessing,
  outputProcessing: state.main.outputProcessing,
  inputImageFile: state.main.inputImageFile,
  inputImageSrc: state.main.inputImageSrc,
  outputImageFile: state.main.outputImageFile,
  outputImageSrc: state.main.outputImageSrc,
  inputColWidth: state.main.inputColWidth,
  constTotalCols: state.main.constTotalCols,
  constExpandedCols: state.main.constExpandedCols,
  showModal: state.main.showModal,
  chunkIdx: state.unredo.chunkIdx,
  linesArrayChunk: state.unredo.linesArrayChunk,
})

export default connect(mapStateToProps, {
  saveInputFile,
  setInputProcessing,
  updateCanvasSize,
  updateInputColWidth,
  resetImage,
  pickNewImage,
  downloadOutputImage,
  showCloseModal,
  undo,
  redo,
  handleMouseClick,
  handleKeyDown
})(Main)