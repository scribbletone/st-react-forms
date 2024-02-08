import React from 'react';
import PropTypes from 'prop-types';

export default class InputDescription extends React.Component {

  render() {
    if (this.props.text || this.props.renderIfEmpty) {
      return (
        <div 
          className={this.props.className}>
          {this.props.text}
        </div>
      );
    } else {
      return null;
    }
  }
}

InputDescription.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  field: PropTypes.string,
  className: PropTypes.string,
  renderIfEmpty: PropTypes.bool
};
InputDescription.defaultProps = {
  className: 'form-input-description'
};


