import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import ReactDOM from "react-dom";

export const Portal = ({ children, className = 'root-portal', el = 'div' }: any) => {
  const [container] = useState(() => {
    return document.createElement(el);
  });

  React.useEffect(() => {
    container.classList.add(className)
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return ReactDOM.createPortal(children, container)
}

const PortalContext = createContext<PortalContext>({ open: () => {}, hide: () => {} })


export interface PortalComponent<Props = void, Res = void> {
  (props: { props: Props, open: boolean, onClose: (props: Res) => void }): JSX.Element
}


interface PortalContext {
  open: (component: JSX.Element) => void
  hide: (key: string) => void
}

export const usePortal = <Props, Res>(Component: PortalComponent<Props, Res>) => {
  const ctx = useContext(PortalContext)
  return (props: Props) => {
    return new Promise<Res>(resolve => {
      const key = Math.random().toString().replace('.', '')
      ctx.open(<Component key={key} props={props} open={true} onClose={res => {
        ctx.hide(key)
        resolve(res)
      }}/>)
    })
  }
}

export const PortalProvider = ({ children }: PropsWithChildren) => {
  const [components, setComponents] = useState<JSX.Element[]>([])

  const value = useMemo<PortalContext>(() => ({ 
    open: (component) => {
      setComponents([...components, component])
    },
    hide: (key) => {
      setComponents(components.filter(c => c.key !== key))
    }
  }), [])

  return (
    <PortalContext.Provider value={value}>
      {children}
      <Portal>
        {components}
      </Portal>
    </PortalContext.Provider>
  )
}
