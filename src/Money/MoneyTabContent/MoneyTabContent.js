import React, { useState } from "react";
import MoneyBalance from "../MoneyBalance/MoneyBalance";
import MoneyNewRecord from "../MoneyNewRecord/MoneyNewRecord";
import MoneyRecords from "../MoneyRecords/MoneyRecords";

function MoneyTabContent() {
  const [newRecordId, setNewRecordId] = useState(null);

  return (
    <>
      <MoneyBalance />
      <MoneyNewRecord
        onSuccess={newRecordId => {
          setNewRecordId(newRecordId);

          setTimeout(() => {
            setNewRecordId(null);
          }, 3000);
        }}
      />
      <MoneyRecords newRecordId={newRecordId} />
    </>
  );
}

export default MoneyTabContent;
