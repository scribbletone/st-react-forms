import React from 'react';
import PropTypes from 'prop-types';

export default class SelectInput extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string.isRequired,
  };
  static defaultProps = {
    defaultValue: ''
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <input 
        type="hidden"
        name={this.props.name}
        value={this.props.value} 
      />
    );
  }
}
