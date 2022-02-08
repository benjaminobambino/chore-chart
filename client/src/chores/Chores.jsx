import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LoadChores } from "../store/actions/ChoreActions";

const mapStateToProps = ({ choreState, userState }) => {
  return { choreState, userState }
}

const mapActionsToProps = (dispatch) => {
  return {
    fetchChores: (householdId) => dispatch(LoadChores(householdId))
  }
}

const Chores = (props) => {
  useEffect(() => {
    props.fetchChores()
  }, [])
  return <div></div>
}

export default connect(mapStateToProps, mapActionsToProps)(Chores)