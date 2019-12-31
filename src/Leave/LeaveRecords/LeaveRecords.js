import React, { useState, useEffect } from "react";
import useApp from "../../useApp";
import LeaveRecordsItem from "../LeaveRecordsItem/LeaveRecordsItem";
import { getOrderedResults } from "../../helpers";
import "./LeaveRecords.css";

const MAX_RECORDS = 100;

function LeaveRecords({ newRecordId }) {
  const app = useApp();
  const [data, setData] = useState({
    isLoading: true,
    records: []
  });
  const { isLoading, records } = data;
  const [editRecordId, setEditRecordId] = useState(null);

  useEffect(() => {
    const ref = app
      .database()
      .ref("leave")
      .orderByChild("startDate")
      .limitToLast(MAX_RECORDS);
    const onValueChange = dataSnapshot => {
      const orderedResults = getOrderedResults(dataSnapshot);
      const records = Object.entries(orderedResults).reverse();

      setData({
        isLoading: false,
        records
      });
    };

    ref.on("value", onValueChange);

    return () => {
      ref.off("value", onValueChange);
    };
  }, [app]);

  return (
    <div className="LeaveRecords-container">
      {isLoading ? (
        "Loading..."
      ) : (
        <ul className="LeaveRecords-list">
          {records.map(([recordId, record]) => (
            <LeaveRecordsItem
              recordId={recordId}
              record={record}
              onClick={() => {
                setEditRecordId(recordId === editRecordId ? null : recordId);
              }}
              isNew={recordId === newRecordId}
              isEdited={recordId === editRecordId}
              onUpdateSuccess={() => {
                setEditRecordId(null);
              }}
              key={recordId}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default LeaveRecords;
