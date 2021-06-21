import React from "react";
import { OptionsList } from "../components/OptionsList";
import { Checkbox } from "../components/Checkbox";
import { Radio } from "../components/Radio";

export const PollActive: React.FC<{
  pollOptions: any;
  meta: any;
  onChange: any;
  radioSelected: any;
}> = ({ pollOptions, meta, onChange, radioSelected }) => (
  <>
    <form action="">
      <OptionsList
        options={pollOptions}
        render={(id) =>
          meta.multipleAnswers ? (
            <Checkbox onChange={onChange(id)} />
          ) : (
            <Radio
              onChange={onChange(id)}
              checked={Object.keys(radioSelected)[0] === id}
            />
          )
        }
      />
    </form>
  </>
);
