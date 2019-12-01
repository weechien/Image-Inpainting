import React, { Component } from 'react'
import ImageUploader from './uploader'
import CanvasDraw from '../containers/canvas'
import ToolbarInpainting from '../containers/inpainting_toolbar'
import Hotkey from '../containers/kb_events'
import {
  Grid, Label, Segment, Icon, Dimmer, Loader,
  Button, Tab, Responsive, Modal, Header
} from 'semantic-ui-react'

class Main extends Component {
  constructor(props) {
    super(props)
    this.child = React.createRef()
    this.state = {
      toggleIOimg: false
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.props.handleKeyDown)
    document.addEventListener('keypress', this.props.handleKeyDown)
    document.addEventListener('mouseup', this.props.handleMouseClick, true)
    document.addEventListener('mousedown', this.props.handleMouseClick, true)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.handleKeyDown)
    document.removeEventListener('keypress', this.props.handleKeyDown)
    document.removeEventListener('mouseup', this.props.handleMouseClick, true)
    document.removeEventListener('mousedown', this.props.handleMouseClick, true)
  }

  toggleBtn = () => {
    this.setState(prevState => (
      { toggleIOimg: !prevState.toggleIOimg }
    ))
  }

  onSize = size => {
    this.props.updateCanvasSize(size)
  }

  btn = (args, hiddenName, iconName) => (
    <Button {...args}>
      <Button.Content visible>
        <Icon name={iconName} />
      </Button.Content>
      {hiddenName !== null ? <Button.Content hidden>{hiddenName}</Button.Content> : null}
    </Button>
  )

  // Button generator for adjusting the width of the input column (and thereby also output column)
  moveButton = (floatRight, resultWidth, direction, addSpace) => {
    const btn = this.btn({
      compact: true,
      basic: true,
      floated: floatRight === true ? 'right' : null,
      onClick: e => this.props.updateInputColWidth(resultWidth)
    }, null, 'angle double ' + direction)
    return addSpace === true ? <p><br />{btn}</p> : btn
  }

  // Dynamic grid width and content adjustments
  grid = (inlineView, view, width, label, color, floatPos) => (
    <Grid.Column width={width} className='smoothColChange'>
      <Segment raised>
        <Label as='a' color={color} ribbon>
          {label}
        </Label>
        {inlineView.map((obj, i) => (
          <div key={i} style={{ display: 'inline-block', float: floatPos }}>{obj}</div>
        ))}
        {view.map((obj, i) => <div key={i}>{obj}</div>)}
      </Segment>
    </Grid.Column>
  )

  render() {
    const { toggleIOimg } = this.state

    // Dimmers and loaders
    const myInputDimmer = (
      <Dimmer active={this.props.inputProcessing}>
        <Loader>Loading...</Loader>
      </Dimmer>
    )

    const myOutputDimmer = (
      <Dimmer active={this.props.outputProcessing}>
        <Loader>Processing image...</Loader>
      </Dimmer>
    )

    // Width controls
    // ===================
    const totalCols = this.props.constTotalCols
    const expandedCol = this.props.constExpandedCols
    const inputWidth = this.props.inputColWidth
    const outputWidth = totalCols - inputWidth

    // If not hidden, show hide button (i.e. show the other fully)
    const hideInputBtn = inputWidth >= 8 ? this.moveButton(true, totalCols - expandedCol, 'left', false) : ''
    const hideOutputBtn = outputWidth >= 8 ? this.moveButton(false, expandedCol, 'right', false) : ''

    // Input view
    // ==========
    const inBtnDefaults = {
      compact: true,
      animated: 'vertical',
      floated: 'right',
      onMouseDown: e => e.preventDefault()
    }

    const undoBtn = <Hotkey name='undo'>
      {this.btn({
        color: 'pink',
        disabled: this.props.chunkIdx === 0 ? true : false,
        onClick: e => this.props.undo(),
        ...inBtnDefaults
      }, 'Undo', 'undo')}
    </Hotkey>

    const redoBtn = <Hotkey name='redo'>
      {this.btn({
        color: 'pink',
        disabled: this.props.chunkIdx === this.props.linesArrayChunk.length - 1 ? true : false,
        onClick: e => this.props.redo(),
        ...inBtnDefaults
      }, 'Redo', 'redo')}
    </Hotkey>

    const resetBtn = this.props.inputImageFile ?
      <Hotkey name='showCloseModal'>
        {this.btn({
          color: 'red',
          onClick: e => this.props.showCloseModal(true),
          ...inBtnDefaults
        }, 'Close', 'close')}
      </Hotkey> : ''


    const resetModal = showModal => (
      <Modal open={showModal} onClose={() => this.props.showCloseModal(false)} trigger={resetBtn} closeIcon>
        <Header icon='warning sign' content='What do you wish to do?' />
        <Modal.Actions>
          <Hotkey name='resetImage'>
            <Button color='facebook' onClick={e => {
              this.props.resetImage()
              this.props.showCloseModal(false)
            }}>
              <Icon name='eraser' /> Reset the image
            </Button>
          </Hotkey>
          <Hotkey name='pickNewImage'>
            <Button color='google plus' onClick={e => {
              this.props.pickNewImage()
              this.props.showCloseModal(false)
            }}>
              <Icon name='image' /> Pick a new image
            </Button>
          </Hotkey>
        </Modal.Actions>
      </Modal>
    )

    const panes = [{
      menuItem: { key: 'inpaint', icon: 'paint brush' },
      render: () => (
        <Tab.Pane><ToolbarInpainting {...this.props} canvas={this.child} /></Tab.Pane>
      )
    }]

    const canvasScreen = (
      <div>
        <div className='inputImage'>
          {myInputDimmer}
          <CanvasDraw {...this.props} ref={this.child} onSize={this.onSize} />
        </div>
        <Tab panes={panes} />
        <br />
      </div>
    )

    const uploaderScreen = (
      <ImageUploader loader={myInputDimmer} {...this.props} />
    )

    const inputView = showModal => {
      const defaults = [inputWidth, 'Input', 'violet', 'right']

      // If hidden, then show a button to expand to half screen size
      if (outputWidth === expandedCol) {
        const btn = this.moveButton(false, 8, 'right', true)
        return this.grid([], [btn], ...defaults)
      }
      const canvas = this.grid([resetModal(showModal), redoBtn, undoBtn, hideInputBtn], [canvasScreen], ...defaults)
      const uploader = this.grid([hideInputBtn], [uploaderScreen], ...defaults)
      return this.props.inputImageFile ? canvas : uploader
    }

    // Output view
    // ===========
    const outBtnDefaults = {
      compact: true,
      animated: 'vertical',
      onMouseDown: e => e.preventDefault()
    }

    const toggleBtn = (
      <Button
        color={toggleIOimg ? 'purple' : 'violet'}
        onClick={e => this.toggleBtn()}
        compact>
        {toggleIOimg ? 'Input' : 'Output'}
      </Button>
    )

    const downloadBtn = <Hotkey name='downloadOutputImage'>
      {this.btn({
        color: 'pink',
        onClick: e => this.props.downloadOutputImage(),
        style: { minWidth: '6em' },
        ...outBtnDefaults
      }, 'Download', 'download')}
    </Hotkey>

    const resultScreen = (
      <div className='outputImage'>
        <Segment basic className='resultArea'>
          {myOutputDimmer}
          <img
            src={toggleIOimg ? this.props.inputImageFile : this.props.outputImageFile}
            alt=''
            className='resultImage'
          />
        </Segment>
      </div>
    )

    const waitScreen = (
      <div className='outputImage'>
        <Segment className='resultArea'>
          {myOutputDimmer}
          <label htmlFor='file' className='inputLabel'>
            <br />
            <Icon name='hourglass half' size='huge' />
            Waiting for output...
          <br /><br />
          </label>
        </Segment>
      </div>
    )

    const outputView = () => {
      const defaults = [outputWidth, 'Output', 'violet', 'right']

      // If hidden, then show a button to expand to half screen size
      if (inputWidth === expandedCol) {
        const btn = this.moveButton(false, 8, 'left', true)
        return this.grid([], [btn], ...defaults)
      }
      const result = this.grid([hideOutputBtn, downloadBtn, toggleBtn], [resultScreen], ...defaults)
      const wait = this.grid([hideOutputBtn], [waitScreen], ...defaults)
      return this.props.outputImageFile ? result : wait
    }

    return (
      <div style={{ marginTop: '15px' }}>
        <Responsive>
          <Grid stackable columns={2}>
            {inputView(this.props.showModal)}
            {outputView()}
          </Grid>
        </Responsive>
      </div>
    )
  }
}

export default Main