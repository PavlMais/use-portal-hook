import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PortalProvider, usePortal } from "..";
import userEvent from "@testing-library/user-event";

describe("some tests", () => {
  test("modal should be not visible", async () => {
    const App = () => {
      const showModal = usePortal<void, void>(() => (
        <div role="content">content</div>
      ));

      return (
        <div role="test">
          <div role="e"></div>
          <button onClick={() => showModal()}>show modal</button>
        </div>
      );
    };

    render(
      <PortalProvider>
        <App />
      </PortalProvider>
    );

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("content")).toBeInTheDocument();
  });
});
