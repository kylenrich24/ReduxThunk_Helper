import React, { Component } from "react";

import { connect } from "react-redux";

class UserHeader extends Component {
  render() {
    const { user } = this.props;
    if (!user) {
      return <div>Loading</div>;
    }

    return (
      <div style={{ color: "blue" }} className="header">
        {user.name}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.user.find((user) => ownProps.userId) };
};

export default connect(mapStateToProps)(UserHeader);
