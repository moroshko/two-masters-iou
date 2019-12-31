import React from "react";
import {
  isDescriptionValid,
  isDateValid,
  isLeaveAmountValid
} from "../../helpers";
import "./LeaveRecordForm.css";

function LeaveRecordForm({
  id,
  person = null,
  onPersonChange,
  description = "",
  onDescriptionChange,
  isDescriptionDirty,
  startDate,
  onStartDateChange,
  isStartDateDirty,
  amount,
  onAmountChange,
  isAmountDirty
}) {
  return (
    <>
      <div className="LeaveRecordForm-person-container">
        <button
          className={`LeaveRecordForm-person-button large-button${
            person === "leva" ? " LeaveRecordForm-person-button--selected" : ""
          }`}
          type="button"
          onClick={() => {
            onPersonChange("leva");
          }}
        >
          Leva
        </button>
        <button
          className={`LeaveRecordForm-person-button large-button${
            person === "danik" ? " LeaveRecordForm-person-button--selected" : ""
          }`}
          type="button"
          onClick={() => {
            onPersonChange("danik");
          }}
        >
          Danik
        </button>
      </div>
      <div className="LeaveRecordForm-text-fields-container">
        <div className="field-container">
          <label
            className="LeaveRecordForm-label"
            htmlFor={`${id}-description`}
          >
            Description
          </label>
          <input
            id={`${id}-description`}
            className={`LeaveRecordForm-input${
              !isDescriptionDirty || isDescriptionValid(description)
                ? ""
                : " invalid-input"
            }`}
            type="text"
            value={description}
            onChange={e => {
              onDescriptionChange(e.target.value);
            }}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div className="field-container">
          <label className="LeaveRecordForm-label" htmlFor={`${id}-start-date`}>
            Start Date
          </label>
          <input
            id={`${id}-start-date`}
            className={`LeaveRecordForm-input${
              !isStartDateDirty || isDateValid(startDate)
                ? ""
                : " invalid-input"
            }`}
            type="date"
            value={startDate}
            onChange={e => {
              onStartDateChange(e.target.value);
            }}
          />
        </div>
        <div className="field-container">
          <label className="LeaveRecordForm-label" htmlFor={`${id}-amount`}>
            Days
          </label>
          <input
            id={`${id}-amount`}
            className={`LeaveRecordForm-input${
              !isAmountDirty || isLeaveAmountValid(amount)
                ? ""
                : " invalid-input"
            }`}
            type="number"
            value={amount}
            onChange={e => {
              onAmountChange(e.target.value);
            }}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </>
  );
}

export default LeaveRecordForm;
