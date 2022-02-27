import React from 'react';
import './style.css';
import Rows from './rows';
export default function App() {
  let [tab, setTab] = React.useState(0);

  let [gObj, setGObj] = React.useState({
    admin: {
      video: {
        'create:any': ['*', '!views'],
        'read:any': ['*'],
        'update:any': ['*', '!views'],
        'delete:any': ['*'],
      },
    },
    user: {
      video: {
        'read:own': ['*'],
        'update:own': ['*', '!rating', '!views'],
        'delete:own': ['*'],
      },
    },
  });

  let roles = ['admin', 'user', 'dev', '</>'];
  let models = ['video', 'project'];

  return (
    <>
      <div class="d-flex flex-colum p-4 justify-content-between">
        {roles.map((r, i) => {
          return (
            <div
              class={
                (tab == i ? 'bg-primary text-light' : '') + ' py-1 px-4 rounded'
              }
              onClick={() => setTab(i)}
            >
              {r}
            </div>
          );
        })}
      </div>
      <div class="table-responsive">
        {roles.map((r, i) => {
          if (r == '</>' && tab == i) {
            return <pre>{JSON.stringify(gObj, null, 2)}</pre>;
          }
          return tab == i ? (
            <table class="table  table-bordered">
              <thead class="table-dark">
                <tr>
                  <td></td>
                  <td colspan="3">Create</td>
                  <td colspan="3">Read</td>
                  <td colspan="3">Update</td>
                  <td colspan="3">Delete</td>
                </tr>
                <tr>
                  <td>Model</td>
                  <td>Own</td>
                  <td>Any</td>
                  <td>None</td>

                  <td>Own</td>
                  <td>Any</td>
                  <td>None</td>

                  <td>Own</td>
                  <td>Any</td>
                  <td>None</td>

                  <td>Own</td>
                  <td>Any</td>
                  <td>None</td>
                </tr>
              </thead>
              <tbody>
                {models.map((e) => {
                  return (
                    <Rows
                      role={r}
                      model={e}
                      get={gObj}
                      setters={[gObj, setGObj]}
                    />
                  );
                })}
              </tbody>

              <tbody></tbody>
            </table>
          ) : (
            ''
          );
        })}
      </div>
    </>
  );
}
