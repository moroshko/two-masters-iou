import React, { useState, useEffect, useMemo } from "react";
import useApp from "../../useApp";
import { pluralize } from "../../helpers";
import "./LeaveBalance.css";

function LeaveBalance() {
  const app = useApp();
  const [data, setData] = useState({
    isLoading: true,
    levasDaysOff: null
  });
  const { isLoading } = data;
  const message = useMemo(() => {
    const { isLoading, levasDaysOff } = data;

    if (isLoading) {
      return null;
    }

    return levasDaysOff === 0
      ? "All good!"
      : levasDaysOff > 0
      ? `Leva has ${pluralize(levasDaysOff, "day")} off`
      : `Danik has ${pluralize(-levasDaysOff, "day")} off`;
  }, [data]);

  useEffect(() => {
    const ref = app.database().ref("leaveLevaHas");
    const onValueChange = dataSnapshot => {
      setData({
        isLoading: false,
        levasDaysOff: dataSnapshot.val() || 0
      });
    };

    ref.on("value", onValueChange);

    return () => {
      ref.off("value", onValueChange);
    };
  }, [app]);

  return (
    <div className="LeaveBalance-container">
      {isLoading ? "Loading..." : message}
    </div>
  );
}

export default LeaveBalance;
