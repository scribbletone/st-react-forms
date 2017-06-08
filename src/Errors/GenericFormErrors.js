import React from 'react';
import PropTypes from 'prop-types';

export default class GenericFormErrors extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    errors: PropTypes.object
  };
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.errors && this.props.errors.form) {
      return (
        <div className={`form-header-errors ${this.props.className}`}>
          {this.props.errors.form}
        </div>
      );
    } else {
      return null;
    }
  }
}
