import React from 'react';
import {
  Link
} from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <Link to="/"><button type="button" className="btn btn-dark">Home</button></Link>
    </div>
  );
}
