import React, { useState } from "react";
import useApp from "../../useApp";
import LeaveRecordForm from "../LeaveRecordForm/LeaveRecordForm";
import { isLeaveRecordValid, getLevaHasDiff } from "../../helpers";
import "./LeaveNewRecord.css";

function LeaveNewRecord({ onSuccess }) {
  const app = useApp();
  const [person, setPerson] = useState(null);
  const [description, setDescription] = useState("");
  const [isDescriptionDirty, setIsDescriptionDirty] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [isStartDateDirty, setIsStartDateDirty] = useState(false);
  const [amount, setAmount] = useState("1");
  const [isAmountDirty, setIsAmountDirty] = useState(false);
  const [submitData, setSubmitData] = useState({
    isLoading: false,
    error: null
  });
  const { isLoading, error } = submitData;
  const onSubmit = e => {
    e.preventDefault();

    setSubmitData({
      isLoading: true,
      error: null
    });

    const newRecord = {
      person,
      description: description.trim(),
      startDate,
      amount: parseInt(amount, 10) || 1
    };
    const database = app.database();

    database
      .ref("leave")
      .push(newRecord)
      .then(newRecordRef => {
        const newRecordId = newRecordRef.key;

        database.ref("leaveLevaHas").transaction(
          levaHas => (levaHas || 0) + getLevaHasDiff(newRecord),
          error => {
            if (error) {
              setSubmitData({
                isLoading: false,
                error: "Something went wrong"
              });
            } else {
              setPerson(null);
              setDescription("");
              setIsDescriptionDirty(false);
              setStartDate("");
              setIsStartDateDirty(false);
              setAmount("1");
              setIsAmountDirty(false);
              setSubmitData({
                isLoading: false,
                error: null
              });

              onSuccess(newRecordId);
            }
          }
        );
      })
      .catch(error => {
        setSubmitData({
          isLoading: false,
          error: error.message
        });
      });
  };

  return (
    <form className="LeaveNewRecord-container" onSubmit={onSubmit}>
      <LeaveRecordForm
        id="leave-new-record"
        person={person}
        onPersonChange={setPerson}
        description={description}
        onDescriptionChange={description => {
          setDescription(description);
          setIsDescriptionDirty(true);
        }}
        isDescriptionDirty={isDescriptionDirty}
        startDate={startDate}
        onStartDateChange={startDate => {
          setStartDate(startDate);
          setIsStartDateDirty(true);
        }}
        isStartDateDirty={isStartDateDirty}
        amount={amount}
        onAmountChange={amount => {
          setAmount(amount);
          setIsAmountDirty(true);
        }}
        isAmountDirty={isAmountDirty}
      />
      <div className="LeaveNewRecord-footer">
        <button
          className="large-button"
          type="submit"
          disabled={
            isLoading ||
            !isLeaveRecordValid({
              person,
              description,
              startDate,
              amount
            })
          }
        >
          {isLoading ? "Creating..." : "Create New Record"}
        </button>
        {error && (
          <div className="LeaveNewRecord-error error-message">{error}</div>
        )}
      </div>
    </form>
  );
}

export default LeaveNewRecord;
