import {
  ADD_ACTIVE_HOTKEYS,
  REMOVE_ACTIVE_HOTKEYS
} from '../actions/action_kbevents'

const initialState = {
  activeHotkeys: []
}

const reducerKbevents = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACTIVE_HOTKEYS:
      return {
        ...state,
        activeHotkeys: [...state.activeHotkeys, action.value]
      }
    case REMOVE_ACTIVE_HOTKEYS:
      return {
        ...state,
        activeHotkeys: [...state.activeHotkeys.filter(x => x !== action.value)]
      }
    default:
      return state
  }
}

export default reducerKbevents