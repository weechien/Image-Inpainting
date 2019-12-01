import { connect } from 'react-redux'
import Kbevents from '../components/kb_events'
import {
  addActiveHotkey,
  removeActiveHotkey
} from '../actions/action_kbevents'

const mapStateToProps = state => ({
  activeHotkeys: state.kbevents.activeHotkeys,
})

export default connect(mapStateToProps, {
  addActiveHotkey,
  removeActiveHotkey
})(Kbevents)