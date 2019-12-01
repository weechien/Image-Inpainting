import { Component } from 'react'

class Hotkey extends Component {
  componentDidMount() {
    if (!this.props.activeHotkeys.includes(this.props.name)) {
      this.props.addActiveHotkey(this.props.name)
    }
  }

  componentWillUnmount() {
    this.props.removeActiveHotkey(this.props.name)
  }

  render() {
    return this.props.children || null
  }
}

export default Hotkey