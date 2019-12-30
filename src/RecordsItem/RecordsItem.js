import React, { useRef } from "react";
import EditRecord from "../EditRecord/EditRecord";
import { formatRecordDate, shortenLenderOrBorrower } from "../helpers";
import "./RecordsItem.css";

function RecordsItem({
  recordId,
  record,
  onClick,
  isNew,
  isEdited,
  onUpdateSuccess
}) {
  const containerRef = useRef();

  return (
    <li className="RecordsItem">
      <div
        className={`RecordsItem-record${
          isNew ? " RecordsItem-record-created" : ""
        }${isEdited ? " RecordsItem-record-edited" : ""}`}
        onClick={() => {
          onClick();

          // Scroll after the EditRecord form is mounted.
          setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: "smooth" });
          });
        }}
        title={isEdited ? "Click to cancel edit" : "Click to edit"}
        ref={containerRef}
      >
        <div className="RecordsItem-record-line1">
          <div>{formatRecordDate(record.date)}</div>
          <div>
            {shortenLenderOrBorrower(record.lender)}
            <span className="RecordsItem-record-arrow">➝</span>
            {shortenLenderOrBorrower(record.borrower)}
          </div>
        </div>
        <div className="RecordsItem-record-line2">
          <div>{record.description}</div>
          <div className="RecordsItem-record-amount">${record.amount}</div>
        </div>
      </div>
      {isEdited && (
        <EditRecord
          recordId={recordId}
          record={record}
          onUpdateSuccess={onUpdateSuccess}
        />
      )}
    </li>
  );
}

export default RecordsItem;
