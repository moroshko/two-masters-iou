import React, { useState } from "react";
import useApp from "../../useApp";
import MoneyRecordForm from "../MoneyRecordForm/MoneyRecordForm";
import { isRecordValid, getLevaOwesDanikDiff } from "../../helpers";
import "./MoneyEditRecord.css";

function MoneyEditRecord({ recordId, record, onUpdateSuccess }) {
  const app = useApp();
  const [lender, setLender] = useState(record.lender);
  const [borrower, setBorrower] = useState(record.borrower);
  const [amount, setAmount] = useState(String(record.amount));
  const [isAmountDirty, setIsAmountDirty] = useState(false);
  const [description, setDescription] = useState(record.description);
  const [isDescriptionDirty, setIsDescriptionDirty] = useState(false);
  const [date, setDate] = useState(record.date);
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
      lender,
      borrower,
      amount: parseFloat(amount.trim()),
      description: description.trim(),
      date
    };
    const database = app.database();
    const levaOwesDanikDiff =
      getLevaOwesDanikDiff(newRecord) - getLevaOwesDanikDiff(record);

    database
      .ref(`money/${recordId}`)
      .update(newRecord)
      .then(() => {
        database.ref("moneyLevaOwesDanik").transaction(
          levaOwesDanik => levaOwesDanik + levaOwesDanikDiff,
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
      .ref(`money/${recordId}`)
      .remove()
      .then(() => {
        database.ref("moneyLevaOwesDanik").transaction(
          levaOwesDanik => levaOwesDanik - getLevaOwesDanikDiff(recordToDelete),
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
    <form className="MoneyEditRecord-container" onSubmit={onSaveRecord}>
      <MoneyRecordForm
        id={`money-record-${record.key}`}
        lender={lender}
        onLenderChange={lender => {
          setLender(lender);
          setBorrower(null);
        }}
        borrower={borrower}
        onBorrowerChange={borrower => {
          setBorrower(borrower);
        }}
        amount={amount}
        onAmountChange={amount => {
          setAmount(amount);
          setIsAmountDirty(true);
        }}
        isAmountDirty={isAmountDirty}
        description={description}
        onDescriptionChange={description => {
          setDescription(description);
          setIsDescriptionDirty(true);
        }}
        isDescriptionDirty={isDescriptionDirty}
        date={date}
        onDateChange={setDate}
      />
      <div className="MoneyEditRecord-footer">
        <button
          className="large-button"
          type="submit"
          disabled={
            isLoading ||
            !isRecordValid({
              lender,
              borrower,
              amount,
              description,
              date
            })
          }
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
        {error && (
          <div className="MoneyEditRecord-error error-message">{error}</div>
        )}
        {amount.trim() === "" && (
          <button
            className="MoneyEditRecord-delete-button large-button danger-button"
            type="button"
            disabled={isLoading}
            title="Delete record"
            onClick={onDeleteRecord}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}

export default MoneyEditRecord;
