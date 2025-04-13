import { useEffect, useState } from "react";

interface TimerProps {
  initialTime: number; // Time in seconds
  onTimeUp: () => void; // Callback function when time is up
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">{timeLeft} seconds left</h2>
    </div>
  );
};

export default Timer;
