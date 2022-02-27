import React from 'react';

export default function ({ role, model, setters }) {
  let [init, setter] = setters;
  let ops = ['create', 'read', 'update', 'delete'];
  let perm = ['own', 'any', ''];

  React.useEffect((_) => {
    let newObj = {};
    Object.assign(newObj, init);

    if (newObj[role] == undefined) {
      newObj[role] = {};
    }

    setter(newObj);
  }, []);

  function handleChange(e) {
    let val = e.target.value;
    let newObj = {};
    Object.assign(newObj, init);

    if (newObj[role][model] == undefined) {
      newObj[role][model] = {};
    }
    let op = Object.keys(newObj[role][model]).find((e) =>
      e.match(val.split(':')[0])
    );
    console.log('op', op, val);
    delete newObj[role][model][op];

    if (val.split(':')[1]) {
      newObj[role][model][val] = ['*'];
    }

    setter(newObj);
    console.log(newObj);
  }

  return (
    <tr>
      <td>{model}</td>

      {ops.map((op) => {
        return perm.map((per) => {
          let found =
            init[role] != undefined
              ? init[role][model] != undefined
                ? Object.keys(init[role][model]).find(
                    (e) => e == op + ':' + per
                  )
                : false
              : false;
          return (
            <td>
              <input
                type="radio"
                name={role + '.' + model + '.' + op}
                value={op + ':' + per}
                checked={found}
                onChange={handleChange}
              />
            </td>
          );
        });
      })}
    </tr>
  );
}
