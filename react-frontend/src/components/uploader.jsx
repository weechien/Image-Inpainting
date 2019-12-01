import React, { Component } from 'react'
import { Icon, Segment } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import { toastr } from 'react-redux-toastr'

class ImageUploader extends Component {
  onDrop = acceptedFiles => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0]
      if (file !== null) {
        this.props.saveInputFile(file)
      } else {
        toastr.error('File error', 'Could not determine which file to upload; for some reason it no longer persists in memory', 500)
      }
    } else {
      toastr.error('File error', 'You may only upload one file at a time', 500)
    }
  }

  render() {
    return (
      <div className='dropArea'>
        <Segment>
          {this.props.loader}
          <Dropzone
            style={{ width: '100%' }}
            accept='image/*'
            maxSize={1000000000}
            multiple={false}
            onDrop={this.onDrop}
            onDropRejected={() => toastr.error('File error', 'The system currently only supports images in JPEG or PNG, and only below 1GB in size.', 500)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon name='image' size='huge' /><br />
                <br />
                <div style={{ fontSize: '15px' }}><b>Choose a file</b> or drag it here.</div>
              </div>
            )}
          </Dropzone>
        </Segment>
      </div>
    )
  }
}

export default ImageUploader
