import React from "react";
import { isAmountValid, isDescriptionValid, isDateValid } from "../helpers";
import "./RecordForm.css";

function RecordForm({
  id,
  lender = null,
  onLenderChange,
  borrower = null,
  onBorrowerChange,
  amount = "",
  onAmountChange,
  isAmountDirty,
  description = "",
  onDescriptionChange,
  isDescriptionDirty,
  date,
  onDateChange
}) {
  return (
    <div>
      <div className="RecordForm-lender-and-borrower-container">
        <div className="RecordForm-lender-container">
          <div>
            <button
              className={`RecordForm-lender-button big-button${
                lender === "leva" ? " RecordForm-lender-selected" : ""
              }`}
              type="button"
              onClick={() => {
                onLenderChange("leva");
              }}
            >
              Leva
            </button>
          </div>
          <div>
            <button
              className={`RecordForm-lender-button big-button${
                lender === "danik" ? " RecordForm-lender-selected" : ""
              }`}
              type="button"
              onClick={() => {
                onLenderChange("danik");
              }}
            >
              Danik
            </button>
          </div>
          <div>
            <button
              className={`RecordForm-lender-button big-button${
                lender === "2masters" ? " RecordForm-lender-selected" : ""
              }`}
              type="button"
              onClick={() => {
                onLenderChange("2masters");
              }}
            >
              2 Masters
            </button>
          </div>
        </div>
        <div className="RecordForm-arrow">→</div>
        <div className="RecordForm-borrower-container">
          <div>
            <button
              className={`RecordForm-borrower-button big-button${
                borrower === "leva" ? " RecordForm-borrower-selected" : ""
              }`}
              type="button"
              onClick={() => {
                onBorrowerChange("leva");
              }}
              disabled={lender === "leva"}
            >
              Leva
            </button>
          </div>
          <div>
            <button
              className={`RecordForm-borrower-button big-button${
                borrower === "danik" ? " RecordForm-borrower-selected" : ""
              }`}
              type="button"
              onClick={() => {
                onBorrowerChange("danik");
              }}
              disabled={lender === "danik"}
            >
              Danik
            </button>
          </div>
          <div>
            <button
              className={`RecordForm-borrower-button big-button${
                borrower === "2masters" ? " RecordForm-borrower-selected" : ""
              }`}
              type="button"
              onClick={() => {
                onBorrowerChange("2masters");
              }}
              disabled={lender === "2masters"}
            >
              2 Masters
            </button>
          </div>
        </div>
      </div>
      <div className="RecordForm-text-fields-container">
        <div className="field-container">
          <label className="RecordForm-label" htmlFor={`${id}-amount`}>
            Amount
          </label>
          <input
            id={`${id}-amount`}
            className={`RecordForm-input${
              !isAmountDirty || isAmountValid(amount) ? "" : " invalid-input"
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
        <div className="field-container">
          <label className="RecordForm-label" htmlFor={`${id}-description`}>
            Description
          </label>
          <input
            id={`${id}-description`}
            className={`RecordForm-input${
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
          <label className="RecordForm-label" htmlFor={`${id}-date`}>
            Date
          </label>
          <input
            id={`${id}-date`}
            className={`RecordForm-input${
              isDateValid(date) ? "" : " invalid-input"
            }`}
            type="date"
            value={date}
            onChange={e => {
              onDateChange(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RecordForm;
