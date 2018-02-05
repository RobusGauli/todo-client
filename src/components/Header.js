import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => (
  <h2 style={styles.header}>
    {title}
  </h2>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = {
  header: {
    fontSize: '50px',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.7)',
  },
};
// no need to define default props for required

export default Header;
