# Scribble Tone React Forms

React form components for internal Scribble Tone usage.

## Install

`npm install --save st-react-forms`

## Use

```
import {TextInput} from 'st-react-forms';

...
<TextInput
  name='email'
  label='Email'
  onChange={(value)=>{console.log(value)}} />
...

```

## Components

#### Input Components
- `AjaxSelectInput`: Wrapper for [react-select](https://github.com/JedWatson/react-select) async.
- `BooleanInput`: Single checkbox
- `FileInput`: Raw file input
- `HiddenInput`: hidden field
- `RadioOptions`: Array of radio buttons
- `SelectInput`: Wrapper for [react-select](https://github.com/JedWatson/react-select) with pre-supplied options. Use `AjaxSelectInput` for dynamic select/search input.
- `TextArea`: Textarea input
- `TextInput`: Basic text input

#### Error Components
- `FieldErrors`: Each input already renders this and will display any errors passed into the `errors` prop that match the name of the input. But just in case it's needed elsewhere.
- `GenericFormErrors`: Can be used to display generic error messages that don't belong to a specific input.

#### Template Components
- `InputList`: Feed it a list of the components and it'll build the form for you. See InputList file for a commented example of expected format. Can/should supply it a with prop of your form `data`.



## Props
Some inputs have additional options. See proptypes in those files for latest props. But here are the universal props.

- `className`: Class to be included on the input
- `defaultValue`: Initial value of the field
- `errors`: Object of errors for the form. Input will only display errors with a key of the field's name, so no need to filter beforehand. Working on a better format for this though.
- `label`: Label to be displayed above the input. No label if left empty.
- `labelClassName`: Optional extra class for the label element
- `name`: Name of the input field. Will be placed in the 'name' attribute if appropriate.
- `onChange`: returns value of the input after changing
- `wrapperClassName`: 'specify and additional class for the div that wraps the input and error'