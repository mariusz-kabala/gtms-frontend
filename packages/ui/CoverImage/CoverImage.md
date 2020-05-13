Basic usage

```
const [state, setState] = React.useState('')

;<>
  <div style={{ cursor: 'pointer' }} onClick={() => setState(true)}>open CoverImage</div>
  {
    state &&
    <CoverImage image='/images/temp_images/cover-image-girls.jpg' />
  }
</>
```
