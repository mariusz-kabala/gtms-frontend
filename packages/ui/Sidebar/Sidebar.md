Basic usage (implicity on left side)

```
const [state, setState] = React.useState('')
;<>
  <div onClick={() => setState(true)}>show sidebar</div>
  {
    state &&
    <Sidebar isActive={state} onClose={() => setState(false)}>
      <p>sidebar content</p>
    </Sidebar>
  }
</>
```

Sidebar with explicity left side

```
const [state, setState] = React.useState('')
;<>
  <div onClick={() => setState(true)}>show sidebar</div>
  {
    state &&
    <Sidebar leftSide={true} isActive={state} onClose={() => setState(false)}>
      <p>sidebar content</p>
    </Sidebar>
  }
</>
```

Sidebar with explicity right side

```
const [state, setState] = React.useState('')
;<>
  <div onClick={() => setState(true)}>show sidebar</div>
  {
    state &&
    <Sidebar rightSide={true} isActive={state} onClose={() => setState(false)}>
      <p>sidebar content</p>
    </Sidebar>
  }
</>
```
