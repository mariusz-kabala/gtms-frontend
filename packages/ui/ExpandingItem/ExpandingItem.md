Basic usage

```
const [state, setState] = React.useState('')

;<>
  <div onClick={() => setState(true)}>expand item</div>
  {
    state &&
    <ExpandingItem
      label={<div>label</div>}
      isActive={state}
      onClose={() => setState(false)}
    >
      Expanded content
    </ExpandingItem>
  }
</>
```
