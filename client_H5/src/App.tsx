import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { FIND, UPDATE } from "./graphql/demo";

import "./App.css";

const App: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const { loading, data } = useQuery(FIND, {
    variables: {
      id: "4fc75020-25bb-4d68-9111-018b0f9426e1",
    },
  });

  const [update] = useMutation(UPDATE);

  const onChangeNameHandler = (v: React.ChangeEvent<HTMLInputElement>) => setName(v.target.value);
  const onChangeDescHandler = (v: React.ChangeEvent<HTMLInputElement>) => setDesc(v.target.value);

  const handleClick = () => {
    update({
      variables: {
        id: "73d0dce3-40c9-4ad1-92ad-f5734f1db9ca",
        params: {
          name,
          desc,
          account: "ooo",
        },
      },
    });
  };

  return (
    <div>
      data: {JSON.stringify(data)}
      <p>loading:{`${loading}`}</p>
      <p>
        name:
        <input onChange={onChangeNameHandler} />
      </p>
      <p>
        desc:
        <input onChange={onChangeDescHandler} />
      </p>
      <button type="button" onClick={handleClick}>
        Click
      </button>
    </div>
  );
};

export default App;
