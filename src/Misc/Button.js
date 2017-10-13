import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(){
    !this.props.disabled && this.props.onClick && this.props.onClick();
  }
  render() {
    const disabledClass = (this.props.disabled ? ' disabled' : '');
    const hrefProp = props.href ? {href: props.href} : {};
    return (
      <a
        disabled={this.props.disabled}
        className={`btn ${this.props.className} ${disabledClass}`}
        onClick={()=>{this.handleClick()}} 
        {...hrefProp}>
        {this.props.children}
      </a>
    );
  }
}
Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  submitting: PropTypes.bool,
  href: PropTypes.string
};