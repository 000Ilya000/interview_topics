const iWantToGET = (ammountRequired, limits) => {
    // Внутренняя рекурсивная функция для подбора купюр
    function collect(ammount, nominals) {
        // Базовые случаи рекурсии
        if (ammount == 0) return {}; // Успех - сумма собрана
        if (!nominals.length) return; // Неудача - номиналы закончились

        // Текущий номинал купюры (первый в отсортированном списке)
        let currentNominal = nominals[0];
        // Сколько таких купюр доступно
        let avaibleNotes = limits[currentNominal];
        // Сколько таких купюр теоретически нужно для суммы
        let notesNeeded = Math.floor(ammount / currentNominal);
        // Сколько реально можно взять (минимум из нужного и доступного)
        let numberOfNotes = Math.min(avaibleNotes, notesNeeded);

        // Перебираем возможное количество купюр от максимального до 0
        for (let i = numberOfNotes; i >= 0; i--) {
            // Рекурсивно пытаемся собрать оставшуюся сумму меньшими номиналами
            let result = collect(
                ammount - i * currentNominal, // Оставшаяся сумма
                nominals.slice(1) // Оставшиеся номиналы
            );

            // Если рекурсивный вызов успешен
            if (result) {
                // Возвращаем результат: текущие купюры + результат рекурсии
                return i ? { [currentNominal]: i, ...result } : result;
            }
        }
    }

    // Подготовка списка номиналов: преобразуем в числа и сортируем по убыванию
    let nominals = Object.keys(limits)
        .map(Number)
        .sort((a, b) => b - a);

    // Запускаем рекурсивный подбор
    return collect(ammountRequired, nominals);
};

let limits = { 1000: 5, 500: 2, 100: 5, 50: 100, 30: 6 };
console.log(iWantToGET(120, limits));
