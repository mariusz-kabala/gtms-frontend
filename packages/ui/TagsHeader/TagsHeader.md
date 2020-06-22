working example

```
const [isLoading, setIsLoading] = React.useState(false)
const [suggestions, setSuggestions] = React.useState([])
const [tags, setTags] = React.useState(['test']);
const suggestionsTimeout = React.useRef();

<div style={{backgroundColor: 'black', padding: '5%'}}>
    <TagsHeader
        isLoading={isLoading}
        tags={tags}
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
        onTagAdd={(tag) => {
            if (!tags.includes(tag)) {
                setTags([
                    ...tags,
                    tag
                ])
            }
            setSuggestions([])
        }}
        onTagRemove={(tag) => null}
    />
</div>
```
