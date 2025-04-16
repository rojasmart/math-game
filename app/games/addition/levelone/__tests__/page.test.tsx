import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdditionGameLevelOne from "../page";

const mockUserContext = {
  userSettings: {
    difficulty: "easy",
  },
  addPoints: jest.fn(),
};

jest.mock("../../../../../contexts/UserContext", () => ({
  useUser: () => mockUserContext,
}));

describe("AdditionGameLevelOne", () => {
  beforeEach(() => {
    act(() => {
      jest.useFakeTimers();
    });
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
    jest.clearAllMocks();
  });

  // ... other tests remain the same ...

  test("handles incorrect answer submission", () => {
    act(() => {
      render(<AdditionGameLevelOne />);
    });

    // Wait for component to mount
    act(() => {
      jest.advanceTimersByTime(0);
    });

    const input = screen.getByPlaceholderText("Your answer");
    const submitButton = screen.getByText("Check");

    // Use a more specific selector for the timer
    const initialTime = screen.getByRole("timer", { name: /time/i });
    const initialTimeValue = parseInt(initialTime.textContent || "13");

    act(() => {
      fireEvent.change(input, { target: { value: "999" } });
      fireEvent.click(submitButton);
    });

    // Allow time for state updates
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    const newTime = screen.getByRole("timer", { name: /time/i });
    expect(parseInt(newTime.textContent || "0")).toBeLessThan(initialTimeValue);
  });

  test("game over state is handled correctly", () => {
    act(() => {
      render(<AdditionGameLevelOne />);
    });

    const input = screen.getByPlaceholderText("Your answer");

    // Verify initial state
    expect(input).toBeEnabled();

    // Trigger game over by advancing time
    act(() => {
      // Advance time past the default time (13 seconds for easy mode)
      jest.advanceTimersByTime(15000);
    });

    // Verify game over state
    expect(input).toHaveAttribute("disabled");
    expect(mockUserContext.addPoints).toHaveBeenCalled();
  });

  test("numpad buttons work correctly", () => {
    act(() => {
      render(<AdditionGameLevelOne />);
    });

    const input = screen.getByPlaceholderText("Your answer");

    act(() => {
      fireEvent.click(screen.getByText("1"));
      fireEvent.click(screen.getByText("2"));
    });

    expect(input).toHaveValue(12);

    act(() => {
      fireEvent.click(screen.getByText("C"));
    });

    expect(input).toHaveValue(null);
  });
});
