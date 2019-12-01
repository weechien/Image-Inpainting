import React, { Component } from 'react'
import { Button, Label } from 'semantic-ui-react'
import Slider from '@material-ui/lab/Slider'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Hotkey from '../containers/kb_events'

const styles = {
  activated: {
  },
  jumped: {
  },
  thumb: {
    backgroundColor: '#FF4081',
    width: 15,
    height: 15,
    '&:hover': {
      boxShadow: `0px 0px 0px 9px ${fade('#FF4081', .16)}`
    },
    '&$activated': {
      boxShadow: `0px 0px 0px 18px ${fade('#FF4081', .16)}`
    },
    '&$jumped': {
      boxShadow: `0px 0px 0px 18px ${fade('#FF4081', .16)}`
    }
  },
  track: {
    backgroundColor: '#FF4081',
    height: 5
  }
}

class ToolbarInpainting extends Component {
  onSliderChange = (e, v) => {
    this.props.updateBrushSize(v)
  }

  render() {
    const { classes } = this.props
    return (
      <div style={{ textAlign: 'right' }}>
        <table width='100%'>
          <tbody>
            <tr>
              <td width={100} style={{ textAlign: 'center' }}>
                <b>Brush Size</b>
              </td>
              <td>
                <div>
                  <Slider
                    classes={{
                      activated: classes.activated,
                      jumped: classes.jumped,
                      thumb: classes.thumb,
                      track: classes.track
                    }}
                    value={this.props.canvasBrushSize}
                    min={1}
                    max={20}
                    step={1}
                    onChange={this.onSliderChange}
                  />
                </div>
              </td>
              <td width={50}>
                <Label color='pink'>{this.props.canvasBrushSize}</Label>
              </td>
            </tr>
          </tbody>
        </table><br />
        <Hotkey name='performInpainting'>
          <Button
            color='violet'
            content='Paint'
            onClick={this.props.performInpainting}
          />
        </Hotkey>
      </div>
    )
  }
}

export default withStyles(styles)(ToolbarInpainting)
