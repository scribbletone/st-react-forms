import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import FieldErrors from '../Errors/FieldErrors';

export default class RadioOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue,
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
  handleChange(value){
    this.setValue(value);
  }
  renderOptions(){
    return this.props.options.map((option)=>{
      return (
        <label 
          key={`option-${option.value}`}
          className='radio-input'>
          <input 
            name={this.props.name}
            type="radio" 
            value={option.value} 
            className='radio-input--option'
            checked={(option.value == this.state.value)}
            onChange={()=>{this.handleChange(option.value)}}
          />
          <span className='radio-input--option-label'>
            {option.label}
          </span>
        </label>
      )
    });
  }
  render() {
    let errors = this.props.errors[this.props.name];
    let errorClassName = (errors ? ' field_with_errors ' : '');
    
    return (
      <div className={`form-input radio-input--wrapper input-${this.props.name} ${errorClassName}`}>
        <Label
          field={this.props.name}
          text={this.props.label}
          className={`form-label radio-input--label ${this.props.labelClassName}`} />
        {this.renderOptions()}
        <Hint text={this.props.hint} />
        <FieldErrors 
          name={this.props.name}
          errors={errors} />
      </div>
    );
  }
}

RadioOptions.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
  ]),
  errors: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  newValue: PropTypes.string,
  options: PropTypes.array
};
RadioOptions.defaultProps = {
  errors: {},
  format: 'none',
  defaultValue: '',
  newValue: null,
  options: []
}