import React from 'react';
import {Button, Select, TextInput, Validations} from 'st-react-forms';

export default class FormExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteFont: 'Arial',
      rank: null
    }
  }
  handleInputChange(field, value){
    console.log(field, value);
    this.setState({
      [field]: value 
    });
  }
  isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  submit(){
    let errors = Validations.run(this.state, VALIDATION_FIELDS);
    this.setState({
      errors: errors
    });
    if (this.isEmpty(errors)){
      console.log('submitted')
    } else {
      console.log(errors)
    }
  }
  render() {
    return (
      <div>
        <TextInput
          name='favoriteFont'
          label='Favorite Font'
          defaultValue={this.state.favoriteFont}
          onChange={(v)=>{this.handleInputChange('favoriteFont', v)}}
          errors={this.state.errors}
        />
        <Select
          name='rank'
          label='Rank'
          defaultValue={this.state.rank}
          options={[
            {name: 'One', value: 1},
            {name: 'Two', value: 2},
            {name: 'Three', value: 3}
          ]}
          onChange={(v)=>{this.handleInputChange('rank', v)}} 
          errors={this.state.errors}
        />
        <Button 
          onClick={()=>this.submit()}>
          Submit
        </Button>
      </div>
    );
  }
}

const VALIDATION_FIELDS = [
  {
    name: 'favoriteFont',
    validations: {presence: true}
  },
  {
    name: 'rank',
    validations: {presence: true}
  }
]
