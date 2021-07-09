import React from "react";
import NewKegForm from "./NewKegForm";
import KegMenu from "./KegMenu";
import KegDetail from "./KegDetail";

class KegControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      fullKegMenu: [],
      selectedKeg: null,
    };
  }

  handleClick = () => {
    if (this.state.selectedKeg != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedKeg: null,
      });
    } else {
      this.setState((prevState) => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  };

  handleAddingNewKegToMenu = (newKeg) => {
    const newFullKegMenu = this.state.fullKegMenu.concat(newKeg);
    this.setState({ fullKegMenu: newFullKegMenu, formVisibleOnPage: false });
  };

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.state.fullKegMenu.filter(
      (keg) => keg.id === id
    )[0];
    this.setState({ selectedKeg: selectedKeg });
  };

  handleSellPint = (id) => {
    const selectedKeg = this.state.fullKegMenu.filter(
      (keg) => keg.id === id
    )[0];
    if (selectedKeg.pintsLeft > 1) {
      selectedKeg.pintsLeft -= 1;
    } else {
      selectedKeg.pintsLeft = "Out of Stock";
    }
    this.setState({ selectedKeg: selectedKeg });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.selectedKeg != null) {
      currentlyVisibleState = (
        <KegDetail
          keg={this.state.selectedKeg}
          onNewPintsLeft={this.handleSellPint}
        />
      );
      buttonText = "Return to Keg Menu";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewKegForm onNewKegCreation={this.handleAddingNewKegToMenu} />
      );
      buttonText = "Return to Keg Menu";
    } else {
      currentlyVisibleState = (
        <KegMenu
          kegMenu={this.state.fullKegMenu}
          onKegSelection={this.handleChangingSelectedKeg}
        />
      );
      buttonText = "Add Keg";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default KegControl;
