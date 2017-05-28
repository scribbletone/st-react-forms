import React from 'react';
import PropTypes from 'prop-types';
import Validations from '../../Utils/Validations';

export default class FieldErrors extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    errors: PropTypes.string
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
