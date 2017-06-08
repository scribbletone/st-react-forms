import React from 'react';
import PropTypes from 'prop-types';

export default class Hint extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.text) {
      return (
        <div className='hint' >
          {this.props.text}
        </div>
      );
    }
  }
}

Hint.propTypes = {
  text: PropTypes.string
}