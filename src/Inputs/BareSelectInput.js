import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import InputDescription from '../Misc/InputDescription';
import FieldErrors from '../Errors/FieldErrors';

export default class BareSelectInput extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange(e){
    this.props.onChange && this.props.onChange(e.target.value);
  }
  renderOptions(){
    let options = []
    this.props.options.map((option, i) => {
      options.push(
        <option 
          key={i + '-' + option.name}
          value={option.value} >
          {option.name}
        </option>
      );
    });
    return options;
  }
  render() {
    let errors = this.props.errors[this.props.name];
    let errorClassName = (errors ? ' field_with_errors ' : '');   
    return (
      <div className={`form-input select-input--wrapper input-${this.props.name} ${errorClassName}`}>
        <Label
          field={this.props.name}
          text={this.props.label}
          className={`form-label select-input--label ${this.props.labelClassName}`} />
        <InputDescription 
          className={this.props.inputDescriptionClassName}
          text={this.props.inputDescription} />
        <select 
          name={this.props.name}
          className={`select-input ${this.props.className}`}
          defaultValue={this.props.defaultValue || 'default'}
          onChange={(e)=>{this.handleChange(e)}} >
          <option disabled value='default'>{this.props.prompt}</option>
          {this.renderOptions()}
        </select>
        <Hint text={this.props.hint} />
        <FieldErrors 
          name={this.props.name}
          errors={errors} />
      </div>
    );
  }
}

BareSelectInput.propTypes = {
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
  onChange: PropTypes.func,
  options: PropTypes.array,
  prompt: PropTypes.string,
  wrapperClassName: PropTypes.string
};
BareSelectInput.defaultProps = {
  errors: {},
  labelClassName: '',
  className: '',
  wrapperClassName: '',
  defaultValue: 'default'
}
