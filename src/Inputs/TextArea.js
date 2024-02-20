import React from 'react';
import PropTypes from 'prop-types';
import DomStyle from '../Utils/DomStyle';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import FieldErrors from '../Errors/FieldErrors';
import InputDescription from '../Misc/InputDescription';

export default class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputHeight: this.props.defaultInputHeight,
      value: this.props.defaultValue,
      focused: false
    }
  }
  componentDidMount() {
    this.setFilledTextareaHeight();
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
  setFilledTextareaHeight() {
    const borderTop = parseInt(DomStyle.getProperty(this.refs.textarea, 'border-top-width'));
    const borderBottom = parseInt(DomStyle.getProperty(this.refs.textarea, 'border-bottom-width'));
    const scrollHeight = this.refs.textarea.scrollHeight;
    this.setState({
      inputHeight: scrollHeight  + borderTop + borderBottom
    });
  }
  handleChange(e){
    this.setValue(e.target.value);
    this.setFilledTextareaHeight();
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
  renderInput(){
    const style = (this.props.resizable ? 
      {
        height: this.state.inputHeight
      } 
      : {});
    return (
      <textarea 
        ref='textarea'
        autoFocus={this.props.autoFocus}
        name={this.props.name}
        className={`text-area ${this.props.className}`}
        value={this.state.value || ''}
        onFocus={(e)=>this.handleFocus(e)}
        onBlur={(e)=>this.handleBlur(e)}
        onChange={(e)=>{this.handleChange(e)}}
        placeholder={this.props.placeholder}
        style={style} />
      );
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
          className={this.props.descriptionClassName}
          text={this.props.description} />
        {this.renderInput()}
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
  defaultInputHeight: PropTypes.number,
  defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]),
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  errors: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  newValue: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  resizable: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
TextArea.defaultProps = {
  autoFocus: false,
  defaultInputHeight: 40,
  defaultValue: '',
  errors: {},
  format: 'none',
  newValue: '',
  resizable: true
}