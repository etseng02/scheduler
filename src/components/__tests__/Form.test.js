import React from "react";

import { render, cleanup} from "@testing-library/react";

import Form from "components/Appointment/Form";

/* with the rest of the imports */
import { fireEvent } from "@testing-library/react";


/* within a test */
// fireEvent.click(getByText("Save"));



afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
    
    it("renders without student name if not provided", () => {
      const { getByPlaceholderText } = render(
        <Form interviewers={interviewers} />
        );
        expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
      });
      
      it("renders with initial student name", () => {
        const { getByTestId } = render(
          <Form interviewers={interviewers} name="Lydia Miller-Jones" />
          );
        expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
    });

  
});