//! 1️⃣ useMemo
// useMemo кэширует (запоминает) //!результат вычисления функции,
//    чтобы не выполнять повторно вычисления при каждом рендере, если зависимости не изменились.
// 	• Используется для оптимизации дорогих вычислений.
// 	• Хук возвращает запомненный результат, если зависимости не изменились.

export const ExpensiveComponent = () => {
    const [count, setCount] = useState(0);

    // Дорогая операция (например, вычисления или фильтрация массива)
    const expensiveCalculation = (num) => {
        console.log("Выполняется дорогая операция");
        return num * 2;
    };

    // useMemo запоминает результат, если count не изменится
    const memoizedResult = useMemo(() => expensiveCalculation(count), [count]);

    return (
        <div>
            <p>Результат: {memoizedResult}</p>
            <button onClick={() => setCount(count + 1)}>Увеличить</button>
        </div>
    );
};

//! 2️⃣ useCallback
// useCallback похож на useMemo, но вместо кэширования результатов, он //! кэширует саму функцию.
// 	• Используется для оптимизации передачи функций в дочерние компоненты или хуки.
// 	• Когда вы передаете функцию в качестве пропса в дочерний компонент,
//      React будет пересоздавать эту функцию при каждом рендере компонента.
// 	• useCallback помогает не пересоздавать функцию при каждом рендере, если зависимости не изменились.

const ChildComponent = ({ onClick }) => {
    console.log("Child rendered");
    return <button onClick={onClick}>Click Me</button>;
};

export const ParentComponent = () => {
    const [count, setCount] = useState(0);

    // useCallback запоминает функцию, если count не изменяется
    const handleClick = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    return (
        <div>
            <ChildComponent onClick={handleClick} />
            <p>Count: {count}</p>
        </div>
    );
};
