import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { Quantity } from "../components/Quantity";

afterEach(cleanup);

describe("Quantity component testing", () => {
  test("Increatment when plus button is pressed", () => {
    const onQuantityChangeMock = jest.fn();
    const { getByText } = render(
      <Quantity onQuantityChange={onQuantityChangeMock} />
    );
    const plusButton = getByText("+");

    fireEvent.press(plusButton);

    expect(onQuantityChangeMock).toHaveBeenCalledTimes(1);
    expect(onQuantityChangeMock).toHaveBeenCalledWith(0);
  });

  test("Decrement when minus button is pressed", () => {
    const onQuantityChangeMock = jest.fn();
    const { getByText } = render(
      <Quantity onQuantityChange={onQuantityChangeMock} />
    );
    const plusButton = getByText("+");
    fireEvent.press(plusButton);

    const minusButton = getByText("-");

    fireEvent.press(minusButton);

    expect(onQuantityChangeMock).toHaveBeenCalledTimes(2);
    expect(onQuantityChangeMock).toHaveBeenCalledWith(0);
  });

  test("When 0 do not decrement", () => {
    const onQuantityChangeMock = jest.fn();
    const { getByText } = render(
      <Quantity onQuantityChange={onQuantityChangeMock} />
    );
    const minusButton = getByText("-");

    fireEvent.press(minusButton);

    //expect(onQuantityChangeMock).toHaveBeenCalledTimes(1);
    expect(onQuantityChangeMock).not.toHaveBeenCalled();
  });
});
