import React, { useState } from "react";
import LeaveBalance from "../LeaveBalance/LeaveBalance";
import LeaveNewRecord from "../LeaveNewRecord/LeaveNewRecord";
import LeaveRecords from "../LeaveRecords/LeaveRecords";
import "./LeaveTabContent.css";

function LeaveTabContent() {
  const [newRecordId, setNewRecordId] = useState(null);

  return (
    <>
      <LeaveBalance />
      <LeaveNewRecord
        onSuccess={newRecordId => {
          setNewRecordId(newRecordId);

          setTimeout(() => {
            setNewRecordId(null);
          }, 3000);
        }}
      />
      <LeaveRecords newRecordId={newRecordId} />
    </>
  );
}

export default LeaveTabContent;
