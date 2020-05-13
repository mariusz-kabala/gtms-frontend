Basic usage

```
const [state, setState] = React.useState('')
;<>
  <div onClick={() => setState(true)}>show notifications</div>
  {
    state &&
    <Notifications />
  }
</>
```
