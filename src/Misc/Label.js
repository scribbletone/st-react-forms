import React from 'react';
import PropTypes from 'prop-types';

export default class Label extends React.Component {

  render() {
    if (this.props.text || this.props.renderIfEmpty) {
      return (
        <label 
          htmlFor={this.props.field}
          className={this.props.className}>
          {this.props.text}
        </label>
      );
    } else {
      return null;
    }
  }
}

Label.propTypes = {
  text: PropTypes.string,
  field: PropTypes.string,
  className: PropTypes.string,
  renderIfEmpty: PropTypes.bool
};
