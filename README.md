# Use Portal Hook
![build](https://github.com/PavlMais/use-portal-hook/actions/workflows/test.yml/badge.svg)
[![npm version](https://badgen.net/npm/v/use-portal-hook)](https://www.npmjs.com/package/use-portal-hook)
![](https://badgen.net/bundlephobia/minzip/use-portal-hook)
### Features
- Type safe
- Small size
- Zero dependencies
- Simple API

## Quick Start
### Install 

```
npm i use-portal-hook
```

### Add a provider
```tsx
import { PortalProvider } from "use-portal-hook";
...
root.render(
  <PortalProvider>
    <App />
  </PortalProvider>
)
```

### Create a modal
```tsx
import { PortalComponent } from "use-portal-hook";

interface DeleteModalProps {
  title: string
}

export const DeleteModal: PortalComponent<DeleteModalProps, boolean> = ({ onClose, props }) => {
  return (
    <div>
      {props.title}
      <button onClick={() => onClose(false)}>Cancel</button>
      <button onClick={() => onClose(true)}>Delete</button>
    </div>
  )
}
```

### Use the modal

```tsx
import { usePortal } from "use-portal-hook";
import { DeleteModal } from "./delete-modal";


const App = () => {
  const showDeleteModal = usePortal(DeleteModal);

  const handleDelete = async () => {
    const confirmed = await showDeleteModal({ title: 'Delete' })
    console.log('Confirmed: ', confirmed)
  }

  return (
    <button onClick={handleDelete}>Delete Item</button>
  );
}
```


### Examples
- [See code](https://github.com/PavlMais/react-portal-hook/tree/main/example)
- CodeSandBox TODO

### License
MIT
