import React, { Component } from "react";

interface IExtendsEvent extends Event {
  detail: { position: number };
}

interface IProps {
  applause: number;
  setMatarodPosition: React.Dispatch<React.SetStateAction<number>>;
  matadorPosition: number;
}

class Matador extends Component<IProps> {
  getRandom = (n: number): number => Math.floor(Math.random() * n + 1);

  getNewPosition = (oldPosition: number): number => {
    let position = this.props.matadorPosition;
    while (oldPosition === position) {
      position = this.getRandom(8);
    }
    return position;
  };

  moveMatador = (e: IExtendsEvent): void => {
    const bullPosition = e.detail.position;
    if (bullPosition === this.props.matadorPosition) {
      const newPosition = this.getNewPosition(this.props.matadorPosition);
      console.log(
        `Matador is moving from ${this.props.matadorPosition} to ${newPosition}`
      );
      this.props.setMatarodPosition(newPosition);
    }
  };

  componentDidMount(): void {
    document.addEventListener("bullRun", this.moveMatador as EventListener);
  }

  componentWillUnmount(): void {
    document.removeEventListener("bullRun", this.moveMatador as EventListener);
  }

  shouldComponentUpdate(nextProps: IProps): boolean {
    console.log(nextProps.applause);
    return !(nextProps.applause === 3 && this.props.applause !== 3);
  }

  render(): JSX.Element {
    return <div>i am matador</div>;
  }
}

export default Matador;