import React from "react";
import {
  isMoneyAmountValid,
  isDescriptionValid,
  isDateValid
} from "../../helpers";
import "./MoneyRecordForm.css";

function MoneyRecordForm({
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
      <div className="MoneyRecordForm-lender-and-borrower-container">
        <div className="MoneyRecordForm-lender-container">
          <div>
            <button
              className={`MoneyRecordForm-lender-button large-button${
                lender === "leva" ? " MoneyRecordForm-lender-selected" : ""
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
              className={`MoneyRecordForm-lender-button large-button${
                lender === "danik" ? " MoneyRecordForm-lender-selected" : ""
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
              className={`MoneyRecordForm-lender-button large-button${
                lender === "2masters" ? " MoneyRecordForm-lender-selected" : ""
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
        <div className="MoneyRecordForm-arrow">→</div>
        <div className="MoneyRecordForm-borrower-container">
          <div>
            <button
              className={`MoneyRecordForm-borrower-button large-button${
                borrower === "leva" ? " MoneyRecordForm-borrower-selected" : ""
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
              className={`MoneyRecordForm-borrower-button large-button${
                borrower === "danik" ? " MoneyRecordForm-borrower-selected" : ""
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
              className={`MoneyRecordForm-borrower-button large-button${
                borrower === "2masters"
                  ? " MoneyRecordForm-borrower-selected"
                  : ""
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
      <div className="MoneyRecordForm-text-fields-container">
        <div className="field-container">
          <label className="MoneyRecordForm-label" htmlFor={`${id}-amount`}>
            Amount
          </label>
          <input
            id={`${id}-amount`}
            className={`MoneyRecordForm-input${
              !isAmountDirty || isMoneyAmountValid(amount)
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
        <div className="field-container">
          <label
            className="MoneyRecordForm-label"
            htmlFor={`${id}-description`}
          >
            Description
          </label>
          <input
            id={`${id}-description`}
            className={`MoneyRecordForm-input${
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
          <label className="MoneyRecordForm-label" htmlFor={`${id}-date`}>
            Date
          </label>
          <input
            id={`${id}-date`}
            className={`MoneyRecordForm-input${
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

export default MoneyRecordForm;
