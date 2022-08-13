import React, { PropsWithChildren } from "react";
export declare const Portal: ({ children, className, el }: any) => React.ReactPortal;
export interface PortalComponent<Props = void, Res = void> {
    (props: {
        props: Props;
        open: boolean;
        onClose: (props: Res) => void;
    }): JSX.Element;
}
export declare const usePortal: <Props, Res>(Component: PortalComponent<Props, Res>) => (props: Props) => Promise<Res>;
export declare const PortalProvider: ({ children }: PropsWithChildren) => JSX.Element;
