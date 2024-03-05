import React from 'react'
import './Link.css'
import { Link as RRDLink } from "react-router-dom";

export const Link = ({children, className='', to}) => {
  return (
    <RRDLink className={`link ${className}`.trim()} to={to}>{children}</RRDLink>
  )
}
