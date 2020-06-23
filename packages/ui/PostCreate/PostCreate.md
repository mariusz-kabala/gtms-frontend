Basic usage

```
  const [isLoading, setIsLoading] = React.useState(false)
  const [suggestions, setSuggestions] = React.useState([])
  const [tags, setTags] = React.useState(['test']);
  const suggestionsTimeout = React.useRef();

  <PostCreate user={{
    name: 'John',
    surname: 'Smith',
    avatar: {
      status: 'not-exists',
    }
    }}
    noImage={{
    '35x35': {
      jpg: '//via.placeholder.com/35x35'
    }}}
    suggestions={suggestions}
    onLoadSuggestion={(text) => {
        clearTimeout(suggestionsTimeout.current)
        setIsLoading(true)
        suggestionsTimeout.current = setTimeout(() => {
            setSuggestions(['lorem', 'ipsum', 'dolor', 'sit', 'amet'])
            setIsLoading(false)
        }, 2000)
    }}
    onLoadSuggestionCancel={() => {
        clearTimeout(suggestionsTimeout.current)
        setIsLoading(false)
    }}
  />
```
