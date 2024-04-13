import React, { useEffect, useState } from "react";
import "./CSS/Account.css";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import {
  useSaveDetailsMutation,
  useSingleUserQuery,
} from "../Redux/api/userApi";
import { useSelector } from "react-redux";

const Account = () => {
  const { user } = useSelector((state) => state.userReducer);

  const { data } = useSingleUserQuery(user?.id);
  const [SaveDetailsMutation] = useSaveDetailsMutation();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const extractDate = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);

    const year = dob.getFullYear();
    const month = String(dob.getMonth() + 1).padStart(2, "0");
    const day = String(dob.getDate()).padStart(2, "0");

    const formattedDateOfBirth = `${year}-${month}-${day}`;

    return formattedDateOfBirth;
  };

  const saveHandle = async (e) => {
    e.preventDefault();
    const data = {
      address,
      phoneNumber,
    };
    const userId = user?.id;

    try {
      await SaveDetailsMutation({ data, userId });
    } catch (error) {
      console.error("Failed to save details:", error);
    }
  };

  useEffect(() => {
    if (data && data.user) {
      setName(data.user.name || "");
      setGender(data.user.gender || "");
      setEmail(data.user.email || "");
      setAddress(data.user.address || "");
      setPhoneNumber(data.user.phoneNumber || "");

      const datePart = extractDate(data.user.dob);
      setDOB(datePart || "");
    }
  }, [data]);

  return (
    <>
      <Breadcrum />

      <div className="account-form">
        <div className="input-area">
          <label>Name</label>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={name !== ""}
          />
        </div>

        <div className="input-area">
          <label>Gender</label>
          <div className="gender">
            <div>
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                disabled={gender !== ""}
                onChange={(e) => setGender(e.target.value)} // Add change handler
              />
            </div>
            <div>
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === "female"}
                disabled={gender !== ""}
                onChange={(e) => setGender(e.target.value)} // Add change handler
              />
            </div>
          </div>
        </div>

        <div className="input-area">
          <label>Date of Birth</label>
          <input
            type="text"
            placeholder="Date of birth"
            onChange={(e) => setDOB(e.target.value)}
            value={DOB}
            disabled={DOB !== ""}
          />
        </div>

        <div className="input-area">
          <label>Address</label>
          <input
            type="text"
            placeholder="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>

        <div className="input-area">
          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="input-area">
          <label>Phone number</label>
          <input
            type="phone"
            placeholder="phone number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </div>

        <button onClick={(e) => saveHandle(e)}>Save</button>
      </div>
    </>
  );
};

export default Account;
