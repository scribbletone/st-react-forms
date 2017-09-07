import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import FieldErrors from '../Errors/FieldErrors';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }
  handleItemSelect(value) {
    this.setState({ value });
    this.props.onItemSelect && this.props.onItemSelect(value)
  }
  handleInputChange(value) {
    this.props.onInputChange && this.props.onInputChange(value);
  }
  render() {
    let errors = this.props.errors[this.props.name];
    let errorClassName = (errors ? ' field_with_errors ' : '');
    let Cmp = (this.props.creatable ? ReactSelect.Creatable : ReactSelect);
    return (
      <div className={`form-input select-input--wrapper input-${this.props.name} ${errorClassName} ${this.props.wrapperClassName}`}>
        <Label
          field={this.props.name}
          text={this.props.label}
          className={`form-label select-input--label ${this.props.labelClassName}`} />
        <Cmp
          ref='selectInput'
          className={`select-input ${this.props.className}`}
          joinValues={this.props.joinValues}
          labelKey={this.props.labelKey}
          multi={this.props.multi}
          name={this.props.name}
          onChange={(v)=>{this.handleItemSelect(v)}}
          onInputChange={(v)=>{this.handleInputChange(v)}}
          options={this.props.options}
          valueRenderer={this.props.renderValue}
          simpleValue={this.props.simpleValue}
          value={this.state.value}
          valueKey={this.props.valueKey}

          // creatable props
          isOptionUnique={this.props.isOptionUnique}
          isValidNewOption={this.props.isValidNewOption}
          newOptionCreator={this.props.newOptionCreator}
          onNewOptionClick={this.props.onNewOptionClick}
          shouldKeyDownEventCreateNewOption={this.props.shouldKeyDownEventCreateNewOption}
          promptTextCreator={this.props.promptTextCreator}

        />
        
        <FieldErrors 
          name={this.props.name}
          errors={errors} />
      </div>
    );
  }
}
SelectInput.propTypes = {
  options: PropTypes.array.isRequired,
  errors: PropTypes.object,
  className: PropTypes.string,
  joinValues: PropTypes.bool,
  label: PropTypes.string,
  labelKey: PropTypes.string,
  multi: PropTypes.bool,
  name: PropTypes.string,
  onInputChange: PropTypes.func,
  onItemSelect: PropTypes.func,
  simpleValue: PropTypes.bool,
  renderValue: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.string
  ]),
  valueKey: PropTypes.string
};
SelectInput.defaultProps = {
  className: '',
  errors: {},
  inputClassName: '',
  joinValues: true,
  labelClassName: '',
  labelKey: 'label',
  multi: false,
  name: 'text-array',
  simpleValue: true,
  wrapperClassName: '',
  value: '',
  valueKey: 'value'
};