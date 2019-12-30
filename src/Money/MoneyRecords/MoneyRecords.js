import React, { useState, useEffect } from "react";
import useApp from "../../useApp";
import MoneyRecordsItem from "../MoneyRecordsItem/MoneyRecordsItem";
import { getOrderedResults } from "../../helpers";
import "./MoneyRecords.css";

const MAX_RECORDS = 100;

function MoneyRecords({ newRecordId }) {
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
      .ref("money")
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
    <div className="MoneyRecords-container">
      {isLoading ? (
        "Loading..."
      ) : (
        <ul className="MoneyRecords-list">
          {records.map(([recordId, record]) => (
            <MoneyRecordsItem
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

export default MoneyRecords;
