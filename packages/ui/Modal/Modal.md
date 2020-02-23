Basic usage

```
const [state, setState] = React.useState('')

;<>
  <div onClick={() => setState(true)}>open modal</div>
  {
    state &&
    <Modal onClose={() => setState(false)}>Children</Modal>
  }
</>
```
