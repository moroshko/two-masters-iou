import React, { useRef } from "react";
import MoneyEditRecord from "../MoneyEditRecord/MoneyEditRecord";
import { formatRecordDate, shortenLenderOrBorrower } from "../../helpers";
import "./MoneyRecordsItem.css";

function MoneyRecordsItem({
  recordId,
  record,
  onClick,
  isNew,
  isEdited,
  onUpdateSuccess
}) {
  const containerRef = useRef();

  return (
    <li className="MoneyRecordsItem">
      <div
        className={`MoneyRecordsItem-record${
          isNew ? " MoneyRecordsItem-record-created" : ""
        }${isEdited ? " MoneyRecordsItem-record-edited" : ""}`}
        onClick={() => {
          onClick();

          setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: "smooth" });
          });
        }}
        ref={containerRef}
      >
        <div className="MoneyRecordsItem-record-line1">
          <div>{formatRecordDate(record.date)}</div>
          <div>
            {shortenLenderOrBorrower(record.lender)}
            <span className="MoneyRecordsItem-record-arrow">➝</span>
            {shortenLenderOrBorrower(record.borrower)}
          </div>
        </div>
        <div className="MoneyRecordsItem-record-line2">
          <div>{record.description}</div>
          <div className="MoneyRecordsItem-record-amount">${record.amount}</div>
        </div>
      </div>
      {isEdited && (
        <MoneyEditRecord
          recordId={recordId}
          record={record}
          onUpdateSuccess={onUpdateSuccess}
        />
      )}
    </li>
  );
}

export default MoneyRecordsItem;
