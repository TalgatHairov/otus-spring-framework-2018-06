import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fClass from 'classnames'

export class SelectFormField extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }

    this.input = React.createRef()
  }

  componentWillReceiveProps(next) {
    this.setState({
      value: next.value
    });
  }

  value() {
    const options = this.input.current.options
    const value = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    return value
  }

  handleChange(event) {
    const options = event.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({value: value});
  }

  render() {
    const { items, name, multiple } = this.props
    const { value } = this.state
    const className = this.props.className || ""

    return <select multiple={multiple === true}
                   className={fClass("form-control", className)} id={name}
                   name={name} value={value}
                   ref={this.input}
                   onChange={this.handleChange.bind(this)}>
      {Object.keys(items).map((iValue) => {
        return <option value={iValue} key={iValue}>{items[iValue]}</option>
      })}
    </select>
  }
}

SelectFormField.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  value: PropTypes.array,
  multiple: PropTypes.bool.isRequired,
  className: PropTypes.string,
}
