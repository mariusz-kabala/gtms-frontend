Basic usage

```
const [state, setState] = React.useState('')

;<>
  <div onClick={() => setState(true)}>open PolAndRock</div>
  {
    state &&
    <PolAndRock />
  }
</>
```
