Basic usage

```
const [state, setState] = React.useState('')

;<>
  <div style={{ cursor: 'pointer' }} onClick={() => setState(true)}>open GroupCard</div>
  {
    state &&
    <GroupCard image="https://placekitten.com/408/287" />
  }
</>
```
