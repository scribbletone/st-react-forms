import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import InputDescription from '../Misc/InputDescription';
import FieldErrors from '../Errors/FieldErrors';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

export default class AjaxSelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
    this.requestTimer;
  }
  handleItemSelect(value) {
    if (this.props.onSelectResetsInput) {
      this.setState({
        value: null
      });
    } else {
      this.setState({ value });
    }
    this.props.onItemSelect && this.props.onItemSelect(value)
  }
  handleInputChange(value) {
    this.props.onInputChange && this.props.onInputChange(value);
  }
  handleLoadOptions(input, callback) {
    clearTimeout(this.requestTimer);
    if (input || this.props.allowEmptySearch) {
      this.requestTimer = setTimeout(()=>{
        this.props.onLoadOptions(input, (options)=>{
          callback(null, {options})
        });
      }, this.props.requestBuffer);
    } else {
      callback(null, {options: this.defaultOptions()})
    }
    
  }
  defaultOptions() {
    return this.props.defaultOptions.filter((opt)=>{
      return opt;
    });
  }
  render() {
    let errors = this.props.errors[this.props.name];
    let errorClassName = (errors ? ' field_with_errors ' : '');
    let Cmp = (this.props.creatable ? ReactSelect.AsyncCreatable : ReactSelect.Async);
    return (
      <div className={`form-input select-input--wrapper input-${this.props.name} ${errorClassName} ${this.props.wrapperClassName}`}>
        <Label
          field={this.props.name}
          text={this.props.label}
          className={`form-label select-input--label ${this.props.labelClassName}`} />
        <InputDescription 
          className={this.props.descriptionClassName}
          text={this.props.description} />
        <Cmp
          ref='selectInput'
          autoload={this.props.autoload || this.defaultOptions().length > 0}
          className={`select-input ${this.props.className}`}
          joinValues={this.props.joinValues}
          labelKey={this.props.labelKey}
          loadOptions={(i,c)=>{this.handleLoadOptions(i,c)}}
          multi={this.props.multi}
          name={this.props.name}
          onChange={(v)=>{this.handleItemSelect(v)}}
          onInputChange={(v)=>{this.handleInputChange(v)}}
          placeholder={this.props.placeholder}
          simpleValue={this.props.simpleValue}
          value={this.state.value}
          valueKey={this.props.valueKey}
          valueRenderer={this.props.renderValue}
          valueComponent={this.props.valueComponent}
          optionRenderer={this.props.optionRenderer}
          optionComponent={this.props.optionComponent}
          
          openOnFocus={this.props.openOnFocus}
          openOnClick={this.props.openOnClick}
          autosize={this.props.autosize}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}

          onSelectResetsInput={this.props.onSelectResetsInput}
          filterOptions={this.props.filterOptions}
          filterOption={this.props.filterOption}
          cache={this.props.cache}
          autoBlur={this.props.autoBlur}
          noResultsText={this.props.noResultsText}
          searchPromptText={this.props.searchPromptText}

          // creatable props
          isOptionUnique={this.props.isOptionUnique}
          isValidNewOption={this.props.isValidNewOption}
          newOptionCreator={this.props.newOptionCreator}
          onNewOptionClick={this.props.onNewOptionClick}
          shouldKeyDownEventCreateNewOption={this.props.shouldKeyDownEventCreateNewOption}
          promptTextCreator={this.props.promptTextCreator}
        />
        <Hint text={this.props.hint} />
        <FieldErrors 
          name={this.props.name}
          errors={errors} />
      </div>
    );
  }
}
AjaxSelectInput.propTypes = {
  onLoadOptions: PropTypes.func.isRequired,
  allowEmptySearch: PropTypes.bool,
  autoload: PropTypes.bool,
  className: PropTypes.string,
  errors: PropTypes.object,
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  joinValues: PropTypes.bool,
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  label: PropTypes.string,
  labelKey: PropTypes.string,
  multi: PropTypes.bool,
  name: PropTypes.string,
  onInputChange: PropTypes.func,
  onItemSelect: PropTypes.func,
  placeholder: PropTypes.string,
  simpleValue: PropTypes.bool,
  renderValue: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.string,
    PropTypes.object
  ]),
  valueKey: PropTypes.string
};
AjaxSelectInput.defaultProps = {
  allowEmptySearch: false,
  autoload: false,
  className: '',
  defaultOptions: [],
  errors: {},
  joinValues: true,
  labelClassName: '',
  labelKey: 'label',
  multi: false,
  name: 'text-array',
  placeholder: 'Search...',
  requestBuffer: 500,
  simpleValue: true,
  wrapperClassName: '',
  value: '',
  valueKey: 'value'
};