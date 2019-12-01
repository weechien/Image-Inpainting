import React, { Component } from 'react'
import sizeMe from 'react-sizeme'

class CanvasDraw extends Component {
  componentDidMount() {
    let img = new Image()
    img.src = this.props.inputImageFile
    img.onload = () => {
      const [w, h] = [img.width, img.height]
      this.props.updateCanvasDimensions(w, h)
      this.props.linesArray.forEach((line, idx) => {
        this.drawLine(line)
      })
      this.props.setInputProcessing(false)
    }
  }

  getMousePos = e => {
    const rect = this.canvas.getBoundingClientRect()

    let displayScale = this.props.canvasWidth / this.props.canvasSize.width

    // use cursor pos as default
    let clientX = e.clientX
    let clientY = e.clientY

    // use first touch if available
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    }

    // return mouse/touch position inside canvas
    return {
      x: (clientX - rect.left) * displayScale,
      y: (clientY - rect.top) * displayScale
    }
  }

  drawLine = (line) => {
    if (!this.ctx) return
    this.ctx.strokeStyle = line.color
    this.ctx.lineWidth = line.size
    this.ctx.lineCap = 'round'
    this.ctx.beginPath()
    this.ctx.moveTo(line.startX, line.startY)
    this.ctx.lineTo(line.endX, line.endY)
    this.ctx.stroke()
  }

  drawStart = e => {
    if (!this.props.isMouseDown) return

    if (this.props.chunkIdx < this.props.linesArrayChunk.length - 1) {
      this.props.clearFutureLineArray()
      this.props.sliceLinesChunk(this.props.chunkIdx + 1)
    }

    const { x, y } = this.getMousePos(e)
    this.x = x
    this.y = y

    // make sure we start painting, useful to draw simple dots
    this.draw(e)
  }

  draw = e => {
    if (!this.props.isMouseDown) return
    // calculate the current x, y coords
    const { x, y } = this.getMousePos(e)

    // Offset by 1 to ensure drawing a dot on click
    const newX = x + 1
    const newY = y + 1

    // create current line object
    const line = {
      color: this.props.canvasBrushColor,
      size: this.props.canvasBrushSize,
      startX: this.x,
      startY: this.y,
      endX: newX,
      endY: newY
    }

    // actually draw the line
    this.drawLine(line)

    // push it to our array of lines
    this.props.pushLineArray([line])

    // set current x, y coords
    this.x = newX
    this.y = newY
  }

  render() {
    return (
      <div>
        <canvas
          className='inputCanvas'
          width={this.props.canvasWidth}
          height={this.props.canvasHeight}
          style={{
            display: 'block',
            background: `url(${this.props.inputImageFile})`,
            backgroundSize: '100% 100%',
            touchAction: 'none',
            width: '100%',
            height: '100%',
          }}
          ref={canvas => {
            if (canvas) {
              this.canvas = canvas
              this.props.setCanvas(canvas)
              this.ctx = canvas.getContext('2d')
            }
          }}
          onMouseDown={this.drawStart}
          onClick={() => false}
          onMouseEnter={this.drawStart}
          onMouseMove={this.draw}
          onTouchStart={this.drawStart}
          onTouchMove={this.draw}
        />
      </div>
    )
  }
}

export default sizeMe()(CanvasDraw)
