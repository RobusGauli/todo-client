import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Button, Icon } from 'semantic-ui-react';


class TodoItem extends React.Component {
  render() {
    const {
      title,
      onDeletePress,
      completed,
      onCheckPress,
      checked,
    } = this.props;

    return (
      <div className="animated fadeIn" style={{ background: completed && 'rgba(0, 0, 0, 0.2)', borderBottom: '1px solid #ccc' }}>
        <div style={styles.container}>
          <Checkbox
            onChange={onCheckPress}
            checked={completed}
          />
          <div>
            {title}
          </div>
          <Button animated="vertical" onClick={onDeletePress}>
            <Button.Content hidden>Delete</Button.Content>
            <Button.Content visible>
              <Icon name="close" />
            </Button.Content>
          </Button>
        </div>
      </div>
    );
  }
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  onDeletePress: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  onCheckPress: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
  },
};
export default TodoItem;
