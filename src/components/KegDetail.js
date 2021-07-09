import React from "react";
import PropTypes from "prop-types";

function KegDetail(props) {
  const { keg, onNewPintsLeft } = props;

  return (
    <React.Fragment>
      <hr />
      <h1>Keg Details</h1>
      <h3>
        {keg.brand}: {keg.name}
      </h3>
      <p>Price per pint: ${keg.price}</p>
      <p>Alcohol content: {keg.alcoholContent}% ABV</p>
      <p>Pints remaining: {keg.pintsLeft}</p>
      <button onClick={() => onNewPintsLeft(keg.id)}>Sell a pint</button>
      <hr />
    </React.Fragment>
  );
}

KegDetail.propTypes = {
  keg: PropTypes.object,
  onNewPintsLeft: PropTypes.func,
};

export default KegDetail;
