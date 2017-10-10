import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import InputDescription from '../Misc/InputDescription';
import FieldErrors from '../Errors/FieldErrors';

export default class Checkboxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue || '',
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
  handleChange(r, optionValue){
    let values = this.state.value.split(',');
    if (this.optionChecked(optionValue)) {
      values = values.filter((v)=>{
        return v != optionValue;
      })
    } else {
      values.push(optionValue);
    }
    this.setValue(values.join(','));
  }
  optionChecked(value){
    return this.state.value.split(',').indexOf(value) >= 0;
  }
  renderOptions(){
    return this.props.options.map((option)=>{
      const checkedClass = this.optionChecked(option.value) ? 'checkbox-input--checked' : '';
      return (
        <label 
          key={`option-${option.value}`}
          className={`checkbox-input ${checkedClass}`}>
          <input 
            name={this.props.name}
            type="checkbox" 
            value={option.value} 
            className='checkbox-input--option'
            checked={this.optionChecked(option.value)}
            onChange={(r)=>{this.handleChange(r, option.value)}}
          />
          <span className='checkbox-input--option-label'>
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
      <div className={`form-input checkbox-input--wrapper input-${this.props.name} ${errorClassName}`}>
        <Label
          field={this.props.name}
          text={this.props.label}
          className={`form-label checkbox-input--label ${this.props.labelClassName}`} />
        <InputDescription 
          className={this.props.descriptionClassName}
          text={this.props.description} />
        {this.renderOptions()}
        <Hint text={this.props.hint} />
        <FieldErrors 
          name={this.props.name}
          errors={errors} />
      </div>
    );
  }
}

Checkboxes.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  errors: PropTypes.object,
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  newValue: PropTypes.string,
  options: PropTypes.array
};
Checkboxes.defaultProps = {
  errors: {},
  format: 'none',
  defaultValue: '',
  newValue: null,
  options: []
}