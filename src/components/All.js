import React from 'react'
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    storeData: state.userItems.userData,
  });
  
  const mapDispatchToProps = (dispatch) => ({
  });
function All(props) {
  return (
    <div>
      <ul>
        <li>Name: {props.storeData.fullName}</li>
        <li>Email: {props.storeData.email}</li>
        <li>Mobile: {props.storeData.mobile}</li>
        <li>School name: {props.storeData.schoolName}</li>
        <li>College name: {props.storeData.collegeName}</li>
        <li>Course name: {props.storeData.courseName}</li>
        <li>Company name: {props.storeData.companyName}</li>
        <li>Role: {props.storeData.role}</li>
        <li>Company address: {props.storeData.companyAddress}</li>
      </ul>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(All);
