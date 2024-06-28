import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import { uid } from 'uid';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import InputDescription from '../Misc/InputDescription';
import FieldErrors from '../Errors/FieldErrors';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

export default function SelectInput(props) {
  const {
    className = '',
    errors:errorsFromProps = {},
    joinValues = true,
    labelClassName = '',
    labelKey = 'label',
    multi = false,
    name = 'text-array',
    simpleValue = true,
    wrapperClassName = '',
    value:valueFromProps = '',
    valueKey = 'value',
    autoComplete = 'off', 
    autoCorrect = 'off', 
    spellCheck = 'off'
  } = props;

  const [value, setValue] = useState(valueFromProps);

  const selectInputRef = useRef(null);
    
  function handleItemSelect(v) {
    setValue(v);
    props.onItemSelect && props.onItemSelect(v)
  }
  function handleInputChange(v) {
    props.onInputChange && props.onInputChange(v);
  }

  const errors = errorsFromProps[name];
  const errorClassName = (errors ? ' field_with_errors ' : '');
  const Cmp = (props.creatable ? ReactSelect.Creatable : ReactSelect);
  return (
    <div className={`form-input select-input--wrapper input-${name} ${errorClassName} ${wrapperClassName}`}>
      <Label
        field={name}
        text={props.label}
        className={`form-label select-input--label ${labelClassName}`} />
      <InputDescription 
        className={props.descriptionClassName}
        text={props.description} />
      <Cmp
        ref={selectInputRef}
        className={`select-input ${className}`}
        joinValues={joinValues}
        labelKey={labelKey}
        multi={multi}
        name={name}
        onChange={(v)=>{handleItemSelect(v)}}
        onInputChange={(v)=>{handleInputChange(v)}}
        options={props.options}
        optionRenderer={props.optionRenderer}
        valueRenderer={props.renderValue}
        simpleValue={simpleValue}
        value={value}
        valueKey={valueKey}
        clearable={props.clearable}
        inputProps={{
          name: 'search', 
          autoComplete: autoComplete, 
          autoCorrect: autoCorrect, 
          spellCheck: spellCheck
        }}

        // creatable props
        isOptionUnique={props.isOptionUnique}
        isValidNewOption={props.isValidNewOption}
        newOptionCreator={props.newOptionCreator}
        onNewOptionClick={props.onNewOptionClick}
        shouldKeyDownEventCreateNewOption={props.shouldKeyDownEventCreateNewOption}
        promptTextCreator={props.promptTextCreator}

      />
      <Hint text={props.hint} />
      <FieldErrors 
        name={name}
        errors={errors} />
    </div>
  );
}

SelectInput.propTypes = {
  options: PropTypes.array.isRequired,
  addLabelText: PropTypes.string,
  allowCreate: PropTypes.bool,
  errors: PropTypes.object,
  className: PropTypes.string,
  clearable: PropTypes.bool,
  joinValues: PropTypes.bool,
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
  labelKey: PropTypes.string,
  multi: PropTypes.bool,
  name: PropTypes.string,
  onInputChange: PropTypes.func,
  onItemSelect: PropTypes.func,
  optionRenderer: PropTypes.func,
  simpleValue: PropTypes.bool,
  renderValue: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.string
  ]),
  valueKey: PropTypes.string,
  valueRenderer: PropTypes.func,
  autoFill: PropTypes.string
};
