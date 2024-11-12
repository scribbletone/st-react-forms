import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  const {
    className = '',
    type = 'button'
  } = props;

  const isLink = (props.href ? 'a' : 'button');

  function handleClick(){
    !props.disabled && props.onClick && props.onClick();
  }
  const isDisabled = (props.disabled || props.submitting);
  const disabledClass = (isDisabled ? ' disabled' : '');
  const hrefProp = props.href ? {href: props.href} : '';
  const targetProp = props.target ? {target: props.target} : '';
  const submittingClass = (props.submitting ? 'btn--submitting' : '');

  

  const Cmp = (isLink ? 'a' : 'button');
  const inputTypeProps = (isLink ? null : {type: type});
  return (
    <Cmp
      {...inputTypeProps}
      disabled={isDisabled}
      className={`btn ${className} ${disabledClass} ${submittingClass}`}
      onClick={()=>{handleClick()}} 
      {...targetProp}
      {...hrefProp}>
      {props.children}
    </Cmp>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  submitting: PropTypes.bool,
  href: PropTypes.string,
  type: PropTypes.string
};

