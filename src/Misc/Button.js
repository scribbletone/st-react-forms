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
    const isDisabled = (this.props.disabled || this.props.submitting);
    const disabledClass = (isDisabled ? ' disabled' : '');
    const hrefProp = this.props.href ? {href: this.props.href} : '';
    const targetProp = this.props.target ? {target: this.props.target} : '';
    const submittingClass = (this.props.submitting ? 'btn--submitting' : '');
    return (
      <button
        type={this.props.type}
        disabled={isDisabled}
        className={`btn ${this.props.className} ${disabledClass} ${submittingClass}`}
        onClick={()=>{this.handleClick()}} 
        {...targetProp}
        {...hrefProp}>
        {this.props.children}
      </button>
    );
  }
}
Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  submitting: PropTypes.bool,
  href: PropTypes.string,
  type: PropTypes.string
};
Button.defaultProps = {
  className: '',
  type: 'button'
};
