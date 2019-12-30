import React, { useState, useEffect, useMemo } from "react";
import useApp from "../../useApp";
import "./MoneyBalance.css";

function MoneyBalance() {
  const app = useApp();
  const [data, setData] = useState({
    isLoading: true,
    levaOwesDanik: null
  });
  const { isLoading } = data;
  const message = useMemo(() => {
    const { isLoading, levaOwesDanik } = data;

    if (isLoading) {
      return null;
    }

    const levaOwesDanikRounded = Math.round(levaOwesDanik * 100) / 100;

    return levaOwesDanikRounded === 0
      ? "All good!"
      : levaOwesDanikRounded > 0
      ? `Leva owes Danik: $${levaOwesDanikRounded}`
      : `Danik owes Leva: $${-levaOwesDanikRounded}`;
  }, [data]);

  useEffect(() => {
    const ref = app.database().ref("moneyLevaOwesDanik");
    const onValueChange = dataSnapshot => {
      setData({
        isLoading: false,
        levaOwesDanik: dataSnapshot.val()
      });
    };

    ref.on("value", onValueChange);

    return () => {
      ref.off("value", onValueChange);
    };
  }, [app]);

  return (
    <div className="MoneyBalance-container">
      {isLoading ? "Loading..." : message}
    </div>
  );
}

export default MoneyBalance;
