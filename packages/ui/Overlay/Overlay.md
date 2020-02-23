Basic usage

```
const [state, setState] = React.useState('')

;<>
  <div onClick={() => setState(true)}>show overlay</div>
  {
    state &&
    <Overlay />
  }
</>
```
