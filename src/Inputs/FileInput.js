import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import FieldErrors from '../Errors/FieldErrors';

export default class FileInput extends React.Component {
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
      <div className={`form-input file-input--wrapper input-${this.props.name} ${errorClassName}`}>

        {this.props.label ? 
          <label 
            htmlFor={this.props.name}
            className={`form-label file-input--label ${this.props.labelClassName}`}>
            {this.props.label}
          </label>
        : null }
        <input 
          type="file" 
          name={this.props.name}
          className={`file-input ${this.props.className}`}
          onChange={(e)=>{this.handleChange(e)}} />
        <Hint text={this.props.hint} />
        <FieldErrors 
          name={this.props.name}
          errors={errors} />
      </div>
    );
  }
}

FileInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
  ]),
  errors: PropTypes.object,
  inlineLabel: PropTypes.string,
  inlineLabelClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  newValue: PropTypes.string
};
FileInput.defaultProps = {
  errors: {},
  format: 'none',
  defaultValue: '',
  newValue: null
}