import { connect } from 'react-redux'
import ToolbarInpainting from '../components/inpainting_toolbar'
import { performInpainting } from '../actions/action_inpainting'
import {
  updateBrushSize
} from '../actions/action_canvas'

const mapStateToProps = state => ({
  canvasBrushSize: state.canvas.canvasBrushSize,
})

export default connect(mapStateToProps, {
  updateBrushSize,
  performInpainting
})(ToolbarInpainting)