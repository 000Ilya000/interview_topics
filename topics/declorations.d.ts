//! Заголовочные файлы
declare const bla: 1;
declare let smthFunc: () => void;

//! Генерация *.d.ts файлов
// С помощью TypeScript можно автоматически генерировать *.d.ts файлы из JavaScript-кода, используя JSDoc-синтаксис.
// Для этого необходимо настроить проект:
// Установить TypeScript в зависимости разработки.
// Создать файл tsconfig.json, в котором указать параметры компилятора:
// allowJs: true — разрешает компиляцию JavaScript-файлов.
// declaration: true — генерирует *.d.ts файлы.
// emitDeclarationOnly: true — создает только декларации, без компиляции в JavaScript.
// Запустить компилятор TypeScript, чтобы сгенерировать соответствующие файлы

//! Пример структуры tsconfig.json
// {
//   "include": ["src/**/*"],
//   "compilerOptions": {
//     "allowJs": true,
//     "declaration": true,
//     "emitDeclarationOnly": true,
//     "outDir": "dist"
//   }
// }
