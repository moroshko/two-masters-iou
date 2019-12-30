import React, { useState } from "react";
import useApp from "../useApp";
import RecordForm from "../RecordForm/RecordForm";
import { getToday, isRecordValid, getLevaOwesDanikDiff } from "../helpers";
import "./NewRecord.css";

function NewRecord({ onSuccess }) {
  const app = useApp();
  const [lender, setLender] = useState(null);
  const [borrower, setBorrower] = useState(null);
  const [amount, setAmount] = useState("");
  const [isAmountDirty, setIsAmountDirty] = useState(false);
  const [description, setDescription] = useState("");
  const [isDescriptionDirty, setIsDescriptionDirty] = useState(false);
  const [date, setDate] = useState(getToday);
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
      lender,
      borrower,
      amount: parseFloat(amount.trim()),
      description: description.trim(),
      date
    };
    const database = app.database();

    database
      .ref("records")
      .push(newRecord)
      .then(newRecordRef => {
        const newRecordId = newRecordRef.key;

        database.ref("/levaOwesDanik").transaction(
          levaOwesDanik => levaOwesDanik + getLevaOwesDanikDiff(newRecord),
          error => {
            if (error) {
              setSubmitData({
                isLoading: false,
                error: "Something went wrong"
              });
            } else {
              setLender(null);
              setBorrower(null);
              setAmount("");
              setIsAmountDirty(false);
              setDescription("");
              setIsDescriptionDirty(false);
              setDate(getToday());
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
    <form className="NewRecord-container" onSubmit={onSubmit}>
      <RecordForm
        id="new-record"
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
      <div className="NewRecord-footer">
        <button
          className="small-button"
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
          {isLoading ? "Creating..." : "Create New Record"}
        </button>
        {error ? (
          <span className="NewRecord-error error-message">{error}</span>
        ) : null}
      </div>
    </form>
  );
}

export default NewRecord;
