Basic usage

```
const [state, setState] = React.useState('')
;<>
  <div onClick={() => setState(true)}>show notifications global</div>
  {
    state &&
    <NotificationsGlobal />
  }
</>
```
