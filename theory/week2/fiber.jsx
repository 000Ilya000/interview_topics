//! FIBER — архитектура React 16+

//! Fiber = unit of work (каждый компонент/DOM node = fiber node)
// Связный список fibers: child, sibling, return (parent)

//! Два phase:
// 1. Render phase (interruptible) — построить fiber tree, diff, пометить изменения
//    Concurrent Mode может прервать и возобновить
// 2. Commit phase (sync, не прерывается) — применить изменения к DOM

//! Priority levels:
// Immediate, UserBlocking, Normal, Low, Idle
// useTransition помечает update как Low priority

//! Scheduler — выбирает какой fiber обработать следующим
// requestIdleCallback-подобная логика, yield к browser для paint/input

//! Senior-вопрос: «Почему React 18 не блокирует UI при тяжёлом рендере?»
// Fiber разбивает work на chunks, browser может обработать input между ними

export {};
