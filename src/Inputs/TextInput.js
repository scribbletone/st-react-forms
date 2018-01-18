import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Numeral from 'numeral';
import Label from '../Misc/Label';
import InputDescription from '../Misc/InputDescription';
import FieldErrors from '../Errors/FieldErrors';
import Slugify from 'slugify';

Numeral.nullFormat('');
Numeral.register('locale', 'en-custom', {
  ...Numeral.localeData('en'),
  abbreviations: {}
});
Numeral.locale('en-custom');

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue,
      formattedValue: this.formatValue(this.props.defaultValue),
      focused: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.newValue != nextProps.newValue){
      this.setValue(nextProps.newValue);
    }
  }
  setValue(value){
    value = this.cleanValue(value);
    const formattedValue = this.formatValue(value);

    this.setState({
      value: value,
      formattedValue: formattedValue
    });
    this.props.onChange && this.props.onChange(value, formattedValue);
  }
  handleChange(e){
    this.setValue(e.target.value);
  }
  handleFocus(e){
    this.setState({
      focused: true
    });
    this.props.onFocus && this.props.onFocus(this.state.value, this.state.formattedValue);
  }
  handleBlur(e){
    this.setState({
      focused: false
    });
    this.props.onBlur && this.props.onBlur(this.state.value, this.state.formattedValue);
  }
  trimValue(value){
    if (this.props.maxLength) {
      return value.slice(0, this.props.maxLength);
    } else {
      return value;
    }
  }
  uniqArray(inArr){
    return inArr.filter((elem, pos, newArr) => {
      return newArr.indexOf(elem) == pos;
    });
  }
  allZeros(value){
    const values = this.uniqArray(value.toString().split('').map((v)=>{return v}));
    return (values.length == 1) && (values[0] == "0");
  }
  cleanValue(value){
    let newVal = this.trimValue(value);

    switch (this.props.format) {
      case 'number':
        if (this.allZeros(newVal)) {
          return newVal;
        } else {
          return Numeral(newVal).format('0');
        }
      case 'unformattedNumber':
        return Numeral(newVal).format('0');
      case 'parameterize':
        return Slugify(newVal, {remove: /[$*_+~#.`()#%^=\[\]{};,\\\/\?'"‘’“”!\-:@]/g});
      case 'none':
      default:
        return value;
    }
  }
  formatValue(value){
    switch (this.props.format) {
      case 'number':
        return Numeral(value).format(',');
      case 'unformattedNumber':
        return Numeral(value).format('0');
      case 'none':
      default:
        return value;
    }
  }
  render() {
    let errors = this.props.errors[this.props.name];
    let errorClassName = (errors ? ' field_with_errors ' : '');
    
    return (
      <div className={`form-input text-input--wrapper input-${this.props.name} ${errorClassName}`}>
        <Label
          field={this.props.name}
          text={this.props.label}
          className={`form-label text-input--label ${this.props.labelClassName}`} />
        <InputDescription 
          className={this.props.descriptionClassName}
          text={this.props.description} />
        <input 
          autoFocus={this.props.autoFocus}
          type={this.props.password ? 'password' : 'text'}
          name={this.props.name}
          className={`text-input ${this.props.className}`}
          value={(this.state.focused ? this.state.value : this.state.formattedValue) || ''}
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

TextInput.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]),
  errors: PropTypes.object,
  format: PropTypes.string,
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  password: PropTypes.bool,
  placeholder: PropTypes.string,
  wrapperClassName: PropTypes.string,
  newValue: PropTypes.string,
};
TextInput.defaultProps = {
  autoFocus: false,
  errors: {},
  format: 'none',
  defaultValue: '',
  newValue: ''
}