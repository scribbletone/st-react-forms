import React from 'react';
import PropTypes from 'prop-types';

export default class FieldErrors extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    errors: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  };
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.errors) {
      return (
        <span className='error'>
          {this.props.errors}
        </span>
      );
    } else {
      return null;
    }
  }
}
