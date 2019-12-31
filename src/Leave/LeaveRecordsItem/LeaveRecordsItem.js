import React, { useRef } from "react";
import LeaveEditRecord from "../LeaveEditRecord/LeaveEditRecord";
import { pluralize, formatRecordDate, formatName } from "../../helpers";
import "./LeaveRecordsItem.css";

function LeaveRecordsItem({
  recordId,
  record,
  onClick,
  isNew,
  isEdited,
  onUpdateSuccess
}) {
  const containerRef = useRef();

  return (
    <li className="LeaveRecordsItem">
      <div
        className={`LeaveRecordsItem-record${
          isNew ? " LeaveRecordsItem-record-created" : ""
        }${isEdited ? " LeaveRecordsItem-record-edited" : ""}`}
        onClick={() => {
          onClick();

          setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: "smooth" });
          });
        }}
        ref={containerRef}
      >
        <div className="LeaveRecordsItem-record-line1">
          <div>{formatRecordDate(record.startDate)}</div>
          <div>{formatName(record.person)}</div>
        </div>
        <div className="LeaveRecordsItem-record-line2">
          <div>{record.description}</div>
          <div className="LeaveRecordsItem-record-amount">
            {pluralize(record.amount, "day")}
          </div>
        </div>
      </div>
      {isEdited && (
        <LeaveEditRecord
          recordId={recordId}
          record={record}
          onUpdateSuccess={onUpdateSuccess}
        />
      )}
    </li>
  );
}

export default LeaveRecordsItem;
