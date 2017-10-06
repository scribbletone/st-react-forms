import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import FieldErrors from '../Errors/FieldErrors';
import InputDescription from '../Misc/InputDescription';

export default class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue,
      focused: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.newValue != nextProps.newValue){
      this.setValue(nextProps.newValue);
    }
  }
  setValue(value){
    this.setState({
      value: value
    });
    this.props.onChange && this.props.onChange(value);
  }
  handleChange(e){
    this.setValue(e.target.value);
  }
  handleFocus(e){
    this.setState({
      focused: true
    });
    this.props.onFocus && this.props.onFocus(this.state.value);
  }
  handleBlur(e){
    this.setState({
      focused: false
    });
    this.props.onBlur && this.props.onBlur(this.state.value);
  }
  render() {
    let errors = this.props.errors[this.props.name];
    let errorClassName = (errors ? ' field_with_errors ' : '');
    
    return (
      <div className={`form-input text-area--wrapper input-${this.props.name} ${errorClassName}`}>
        <Label
          field={this.props.name}
          text={this.props.label}
          className={`form-label text-area--label ${this.props.labelClassName}`} />
        <InputDescription 
          className={this.props.inputDescriptionClassName}
          text={this.props.inputDescription} />
        <textarea 
          autoFocus={this.props.autoFocus}
          name={this.props.name}
          className={`text-area ${this.props.className}`}
          value={this.state.value || ''}
          onFocus={(e)=>this.handleFocus(e)}
          onBlur={(e)=>this.handleBlur(e)}
          onChange={(e)=>{this.handleChange(e)}}
          placeholder={this.props.placeholder} />
        <Hint text={this.props.hint} />
        <FieldErrors 
          name={this.props.name}
          errors={errors} />
      </div>
    );
  }
}

TextArea.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]),
  errors: PropTypes.object,
  inputDescription: PropTypes.string,
  inputDescriptionClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  wrapperClassName: PropTypes.string,
  newValue: PropTypes.string
};
TextArea.defaultProps = {
  autoFocus: false,
  errors: {},
  format: 'none',
  defaultValue: '',
  newValue: ''
}