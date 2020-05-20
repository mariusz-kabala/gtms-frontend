Basic usage

```
const [state, setState] = React.useState('')
;<>
  <div onClick={() => setState(true)}>show notification single</div>
  {
    state &&
    <NotificationSingle
      text="3 new users in your group"
      icon={{ png: '/images/temp_images/questionMark.png' }}
    />
  }
</>
```
