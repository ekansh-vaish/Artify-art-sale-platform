import React from 'react';

function PaymentSuccess() {
  return (
    <div className="container text-center mt-5">
      <h2 className="text-success">✅ Payment Successful!</h2>
      <p className="lead">Thank you for your purchase. Your art will be cherished!</p>
      <img
        src="/success-art.gif"
        alt="Success"
        style={{ width: '200px', marginTop: '20px' }}
      />
    </div>
  );
}

export default PaymentSuccess;
