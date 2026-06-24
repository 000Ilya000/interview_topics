//! Функциональные компоненты лучше: они более оптимизированы.
//! Можно гибко настраивать рендеринг, проще синтаксис и поддержка кода
//! Основное отличие - жизненный цикл компонента (в функц. компонентах хуки(useEffect))
//! Размонитрование - useEffect(() => return {после return}, [])

//! Синтаксис

// Функциональный компонент - БОЛЕЕ ПРОСТОЙ
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Классовый компонент
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

//! Пример использования

// Функциональный компонент
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

// Классовый компонент
import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.increment}>Click me</button>
      </div>
    );
  }
}
