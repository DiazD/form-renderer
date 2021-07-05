import './App.css';
import FormRenderer from "./components/FormRenderer";
import styled from "styled-components/macro";
import "semantic-ui-css/semantic.min.css";
import { Grid } from "semantic-ui-react";

// comopnents
import StepForm from "./components/form-examples/StepForm";
import CustomTextField from "./components/form/CustomTextField";

// utils
import { delay } from "./utils";
import { loginFields, moreDetailFields } from "./resources/fields";

// renderers

import { renderers } from "./components/renderers/semantic";

const Wrapper = styled.div`
  width: 50%;
  border: 1px solid gray;
  margin-top: 15px;
  padding: 10px;
`;


function App() {
  const onSubmit = ({ data, setSubmittingState }) => {
    alert(JSON.stringify(data));
    delay(() => setSubmittingState(false), 2000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Wrapper>
          <h2>Login Form</h2>
          <FormRenderer id="login" fields={loginFields} onSubmit={onSubmit} />
        </Wrapper>
        <Wrapper>
          <h2>More Details</h2>
          <FormRenderer
            id="more-details"
            fields={moreDetailFields}
            onSubmit={onSubmit}
            overrides={{
              textarea: {
                OverrideFieldControl: CustomTextField,
              }
            }}
          />
        </Wrapper>
        <Wrapper>
          <h2>Steps form</h2>
          <StepForm />
        </Wrapper>

        <Wrapper>
          <h2>semantic</h2>
          <FormRenderer
            id="semantic-ui"
            fields={[
              [
                {
                  name: "carname",
                  label: <span style={{ fontWeight: "bolder" }}>Car Name</span>,
                  component: "input",
                  inputProps: { placeholder: "name" },
                  rules: { required: "Required" }
                },
                {
                  name: "make",
                  label: <span style={{ fontWeight: "bolder" }}>Make</span>,
                  component: "input",
                  inputProps: { placeholder: "make" },
                  rules: {}
                },
              ]
            ]}
            onSubmit={onSubmit}
            renderers={renderers}
            formWrapper={Grid}
          />
        </Wrapper>
      </header>
    </div>
  );
}

export default App;
