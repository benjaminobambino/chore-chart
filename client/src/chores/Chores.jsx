import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LoadChores } from "../store/actions/ChoreActions";

const mapStateToProps = ({ choreState }) => {
  return { choreState }
}

const mapActionsToProps = (dispatch) => {
  return {}
}

const Chores = (props) => {
  return <div></div>
}

export default connect(mapStateToProps, mapActionsToProps)(Chores)