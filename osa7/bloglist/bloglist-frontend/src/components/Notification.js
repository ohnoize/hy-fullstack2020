import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, className }) => {
  if (!message) {
    return null
  }
  return (
    <div className={className}>{message}</div>
  )
}

Notification.propTypes = {
  className: PropTypes.string.isRequired
}

export default Notification
