Basic usage

```
const [state, setState] = React.useState('')
;<>
  <div onClick={() => setState(true)}>show notification single</div>
  {
    state &&
    <NotificationSingle />
  }
</>
```
