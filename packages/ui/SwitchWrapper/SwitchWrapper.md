Basic usage

```
const [state, setState] = React.useState('')

;<>
  <div onClick={() => setState(true)}>show switch wrapper</div>
  {
    state &&
    <SwitchWrapper onClick={() => setState(false)} />
  }
</>
```
