import { memo, useEffect } from "react";

interface IExtendsEvent extends Event {
  detail: { position: number };
}
interface IProps {
  applause: number;
  setMatarodPosition: React.Dispatch<React.SetStateAction<number>>;
  matadorPosition: number;
}

export const Matador = memo(
  ({ setMatarodPosition, matadorPosition }: IProps) => {
    
    const getRandom = (n: number) => Math.floor(Math.random() * n + 1);

    const getNewPosition = (oldPosition: number) => {
      let position = matadorPosition;
      while (oldPosition === position) {
        position = getRandom(8);
      }
      return position;
    };

    useEffect(() => {
      const moveMatador = (e: IExtendsEvent) => {
        const bullPosition = e.detail.position;
        if (bullPosition === matadorPosition) {
          const newPosition = getNewPosition(matadorPosition);
          console.log(
            `Matador is moving from ${matadorPosition} to ${newPosition}`
          );
          setMatarodPosition(newPosition);
        }
      };

      document.addEventListener("bullRun", moveMatador as EventListener);
      return (): void =>
        document.removeEventListener("bullRun", moveMatador as EventListener);
    }, []);

    return <div>i am matador</div>;
  },
  (prevProps, nextProps) => {
    console.log(nextProps.applause);
    return !(nextProps.applause === 3 && prevProps.applause !== 3);
  }
);
