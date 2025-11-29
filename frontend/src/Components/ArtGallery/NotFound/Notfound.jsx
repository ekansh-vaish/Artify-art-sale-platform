import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Notfound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigate]);

  return (
    <div>
      <p>No Data Found. Redirecting to Home...</p>
    </div>
  );
}

export default Notfound;
