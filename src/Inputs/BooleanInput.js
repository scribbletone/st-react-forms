import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import FieldErrors from '../Errors/FieldErrors';

export default class BooleanInput extends React.Component {
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
  handleChange(e){
    this.setValue(e.target.checked);
  }
  render() {
    let errors = this.props.errors[this.props.name];
    let errorClassName = (errors ? ' field_with_errors ' : '');
    return (
      <div className={`form-input boolean-input--wrapper input-${this.props.name} ${errorClassName}`}>

        {this.props.label ? 
          <div className={`form-label boolean-input--label ${this.props.labelClassName}`}>
            {this.props.label}
          </div>
        : null }
        <InputDescription 
          className={this.props.inputDescriptionClassName}
          text={this.props.inputDescription} />
        <label 
          htmlFor={this.props.name}>
          <input 
            type="checkbox" 
            name={this.props.name} 
            className='boolean-input'
            value={this.props.defaultValue}
            checked={this.state.value}
            onChange={(e)=>{this.handleChange(e)}} 
          />
          <span 
            className="boolean-input--inline-label">
              {this.props.inlineLabel}
          </span>
        </label>
        <Hint text={this.props.hint} />
        <FieldErrors 
          name={this.props.name}
          errors={errors} />
      </div>
    );
  }
}

BooleanInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
  ]),
  errors: PropTypes.object,
  inlineinputDescription: PropTypes.string,
  inputDescriptionClassName: PropTypes.string,
  label: PropTypes.string,
  inlineLabelClassName: PropTypes.string,
  inputDescription: PropTypes.string,
  inputDescriptionClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  newValue: PropTypes.string
};
BooleanInput.defaultProps = {
  errors: {},
  format: 'none',
  defaultValue: '',
  newValue: null
}