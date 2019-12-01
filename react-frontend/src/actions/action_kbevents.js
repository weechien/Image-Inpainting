import { performInpainting } from '../actions/action_inpainting'
import { undo, redo } from '../actions/action_unredo'
import {
  resetImage,
  pickNewImage,
  downloadOutputImage,
  showCloseModal
} from '../actions'

export const ADD_ACTIVE_HOTKEYS = 'ADD_ACTIVE_HOTKEYS'
export const REMOVE_ACTIVE_HOTKEYS = 'REMOVE_ACTIVE_HOTKEYS'

const hotkeys = {
  downloadOutputImage(e, d, s) {
    if (e.key !== 'd') return false
    d(downloadOutputImage())
    return true
  },
  performInpainting(e, d, s) {
    if (e.key !== 'Enter') return false
    d(performInpainting())
    return true
  },
  undo(e, d, s) {
    if (e.key !== 'z' || !e.ctrlKey) return false
    const { chunkIdx } = s().unredo
    const disabled = chunkIdx === 0 ? true : false
    if (disabled) return false
    d(undo())
    return true
  },
  redo(e, d, s) {
    if (e.key !== 'y' || !e.ctrlKey) return false
    const { chunkIdx, linesArrayChunk } = s().unredo
    const disabled = chunkIdx === linesArrayChunk.length - 1 ? true : false
    if (disabled) return false
    d(redo())
    return true
  },
  resetImage(e, d, s) {
    if (e.key !== 'w') return false
    d(resetImage())
    d(showCloseModal(false))
    return true
  },
  pickNewImage(e, d, s) {
    if (e.key !== 'e') return false
    d(pickNewImage())
    d(showCloseModal(false))
    return true
  },
  showCloseModal(e, d, s) {
    if (e.key !== 'q') return false
    const { showModal } = s().main
    d(showCloseModal(!showModal))
    return true
  }
}

export const addActiveHotkey = value => dispatch => {
  dispatch({
    type: ADD_ACTIVE_HOTKEYS,
    value: value
  })
}

export const removeActiveHotkey = value => dispatch => {
  dispatch({
    type: REMOVE_ACTIVE_HOTKEYS,
    value: value
  })
}

export const handleKeyDown = e => (dispatch, getState) => {
  const { activeHotkeys } = getState().kbevents

  for (let i = 0; i < activeHotkeys.length; i += 1) {
    const hotkey = activeHotkeys[i]
    if (hotkeys[hotkey](e, dispatch, getState)) {
      e.preventDefault()
      break
    }
  }
}