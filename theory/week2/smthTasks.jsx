import { useState } from "react";

const FilterComponent = () => {
    const [filterValue, setFilterValue] = useState("");
    const users = ["Илья", "Анна", "Олег", "Света"];

    const filteredUsers = users.filter((user) =>
        user.toLowerCase().includes(filterValue.toLowerCase())
    );

    return (
        <>
            <input
                type="text"
                placeholder="Поиск"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
            />

            {filteredUsers.map((user) => (
                <h2 key={user}>{user}</h2>
            ))}
        </>
    );
};

export default FilterComponent;

import { useEffect } from "react";

const AutoCounter = () => {
    const [count, setCount] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const handleStop = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };

    useEffect(() => {
        const id = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);
        setIntervalId(id);

        return () => {
            clearInterval(id);
        };
    }, []);

    return (
        <>
            <h3>Счет: {count}</h3>
            <button onClick={handleStop}>СТОП</button>
        </>
    );
};
