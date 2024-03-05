import React from 'react'
import './Button.css'

export const Button = ({children, variant = 'primary', className = '', onClick, isFullWidth}) => {
    const variantStyleMapping = {
        'primary': 'button-primary',
        'light': 'button-light'
    }


  return (
    <button className={`button ${variantStyleMapping[variant]} ${isFullWidth ? 'full-width': ''} ${className}`.trim()} onClick={onClick}>{children}</button>
  )
}
