import React, { useState } from "react";
import useApp from "../../useApp";
import LeaveRecordForm from "../LeaveRecordForm/LeaveRecordForm";
import { isLeaveRecordValid, getLevaHasDiff } from "../../helpers";
import "./LeaveEditRecord.css";

function LeaveEditRecord({ recordId, record, onUpdateSuccess }) {
  const app = useApp();
  const [person, setPerson] = useState(record.person);
  const [description, setDescription] = useState(record.description);
  const [isDescriptionDirty, setIsDescriptionDirty] = useState(false);
  const [startDate, setStartDate] = useState(record.startDate);
  const [isStartDateDirty, setIsStartDateDirty] = useState(false);
  const [amount, setAmount] = useState(String(record.amount));
  const [isAmountDirty, setIsAmountDirty] = useState(false);
  const [submitData, setSubmitData] = useState({
    isLoading: false,
    error: null
  });
  const { isLoading, error } = submitData;
  const onSaveRecord = e => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

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
    const levaHasDiff = getLevaHasDiff(newRecord) - getLevaHasDiff(record);

    database
      .ref(`leave/${recordId}`)
      .update(newRecord)
      .then(() => {
        database.ref("leaveLevaHas").transaction(
          levaOwesDanik => (levaOwesDanik || 0) + levaHasDiff,
          error => {
            if (error) {
              setSubmitData({
                isLoading: false,
                error: "Something went wrong"
              });
            } else {
              onUpdateSuccess();
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
  const onDeleteRecord = () => {
    if (isLoading) {
      return;
    }

    setSubmitData({
      isLoading: false,
      error: null
    });

    const database = app.database();
    const recordToDelete = { ...record };

    database
      .ref(`leave/${recordId}`)
      .remove()
      .then(() => {
        database.ref("leaveLevaHas").transaction(
          levaHas => (levaHas || 0) - getLevaHasDiff(recordToDelete),
          error => {
            if (error) {
              setSubmitData({
                isLoading: false,
                error: "Something went wrong"
              });
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
    <form className="LeaveEditRecord-container" onSubmit={onSaveRecord}>
      <LeaveRecordForm
        id={`leave-record-${record.key}`}
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
      <div className="LeaveEditRecord-footer">
        <div className="LeaveEditRecord-footer-buttons">
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
            {isLoading ? "Saving..." : "Save"}
          </button>
          {amount.trim() === "" && (
            <button
              className="LeaveEditRecord-delete-button large-button danger-button"
              type="button"
              disabled={isLoading}
              onClick={onDeleteRecord}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
        {error && (
          <div className="LeaveEditRecord-error error-message">{error}</div>
        )}
      </div>
    </form>
  );
}

export default LeaveEditRecord;
