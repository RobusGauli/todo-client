import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';


class Form extends React.Component {

  state = {
    value : '',
  }
  
  render() {
    const { onChange, activeText } = this.props;
    return (
    <Input
      className='form'
      fluid
      size='large'
      placeholder='Enter the task.'
      onChange={onChange}
      onSubmit={this.onSubmit}
      value={activeText}
    />
    );
  }
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default Form;