import React, { useState } from "react";
import UserTable from "./UserTable";
import "../../index.css";
function UserRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [gender, setGender] = useState("Female");
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("UserData"))
  );

  const getEmployeeId = () => {
    let maxNumber = Math.max(
      ...Object.keys(userData).map((num) => parseInt(num)),
      0
    );
    return maxNumber + 1;
  };

  const handleSubmit = () => {
    let obj1 = {
      firstName: firstName,
      lastName: lastName,
      mobileNo: mobileNo,
      gender: gender,
    };
    if (localStorage.UserData) {
      let userData1 = JSON.parse(localStorage.getItem("UserData"));

      userData1[getEmployeeId()] = obj1;
      localStorage.setItem("UserData", JSON.stringify(userData1));
      setUserData({ ...userData1 });
    } else {
      localStorage.setItem("UserData", JSON.stringify({ 1: obj1 }));
      setUserData({ 1: obj1 });
    }

    setFirstName("");
    setLastName("");
    setMobileNo("");
    setGender("");
  };
  const editUser = (key) => {
    let user = userData[key];
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setMobileNo(user.mobileNo);
    setGender(user.gender);
  };
  const deleteUser = (key) => {
    delete userData[key];
    setUserData({ ...userData });
    localStorage.setItem("UserData", JSON.stringify({ ...userData }));
  };
  return (
    <div>
      <h4>Table Data</h4>

      <div className="container">
        <div className="field mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            FirstName:
          </label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="field mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            LastName:
          </label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="field mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Mobile No:
          </label>
          <input
            type="tel"
            className="form-control"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>
        <div className="raio_buttons">
          <div>
            <label htmlFor="exampleInputPassword1" className="form-label">
              Gender
            </label>
          </div>
          <div className="radio-container">
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                //value="Male"
                checked={gender === "Male"}
                onClick={() => setGender("Male")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Male
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                //value="Female"
                checked={gender === "FeMale"}
                onClick={() => setGender("Female")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Female
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            handleSubmit();
          }}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
      <UserTable
        userData={userData}
        editUser={editUser}
        deleteUser={deleteUser}
      />
    </div>
  );
}

export default UserRegister;
