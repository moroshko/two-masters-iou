import React, { useState, useEffect } from "react";
import useApp from "../useApp";
import RecordsItem from "../RecordsItem/RecordsItem";
import { getOrderedResults } from "../helpers";
import "./Records.css";

const MAX_RECORDS = 100;

function Records({ newRecordId }) {
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
      .ref("records")
      .orderByChild("date")
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
    <div className="Records-container">
      {isLoading ? (
        "Loading..."
      ) : (
        <ul className="Records-list">
          {records.map(([recordId, record]) => (
            <RecordsItem
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

export default Records;
