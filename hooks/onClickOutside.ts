import { useEffect, RefObject } from 'react'

// Usage
// function App() {
//   // Create a ref that we add to the element for which we want to detect outside clicks
//   const ref = useRef();
//   // State for our modal
//   const [isModalOpen, setModalOpen] = useState(false);
//   // Call hook passing in the ref and a function to call on outside click
//   useOnClickOutside(ref, () => setModalOpen(false));

//   return (
//     <div>
//       {isModalOpen ? (
//         <div ref={ref}>
//           👋 Hey, I'm a modal. Click anywhere outside of me to close.
//         </div>
//       ) : (
//         <button onClick={() => setModalOpen(true)}>Open Modal</button>
//       )}
//     </div>
//   );
// }

// Hook
export function useOnClickOutside(
  ref: RefObject<HTMLDivElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !ref.current ||
        !event.target ||
        ref.current.contains(event.target as Node)
      ) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, // ... function on every render that will cause this effect ... // It's worth noting that because passed in handler is a new ... Add ref and handler to effect dependencies
  // ... callback/cleanup to run every render. It's not a big deal ...
  // ... but to optimize you can wrap handler in useCallback before ...
  // ... passing it into this hook.
  [ref, handler])
}
