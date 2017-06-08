import React from 'react';
import PropTypes from 'prop-types';

export default class HiddenInput extends React.Component {
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

HiddenInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string.isRequired,
};
HiddenInput.defaultProps = {
  defaultValue: ''
}