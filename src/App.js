import './App.css';
import FormRenderer from "./components/FormRenderer";
import styled from "styled-components/macro";

// comopnents
import StepForm from "./components/form-examples/StepForm";
import CustomTextField from "./components/form/CustomTextField";

// utils
import { delay } from "./utils";
import { loginFields, moreDetailFields } from "./resources/fields";
import { renderers } from "./components/renderers/bootstrap";

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
          <FormRenderer renderers={renderers} id="login" fields={loginFields} onSubmit={onSubmit} />
        </Wrapper>
        <Wrapper>
          <h2>More Details</h2>
          <FormRenderer
            renderers={renderers}
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

      </header>
    </div>
  );
}

export default App;
