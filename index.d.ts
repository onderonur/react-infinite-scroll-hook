declare module "react-router-modal-gallery" {
  import { RouteProps, RouteComponentProps, SwitchProps } from "react-router";
  import { LinkProps } from "react-router-dom";
  import H from "history";

  type VoidFunction = () => void;

  export interface ModalLinkProps extends LinkProps {}
  export function ModalLink(props: ModalLinkProps): React.FC<ModalLinkProps>;

  export interface ModalRouteProps extends RouteProps {
    defaultParentPath: string;
  }
  export function ModalRoute(props: ModalRouteProps): React.FC<ModalRouteProps>;

  interface ModalRouteContentProps extends RouteComponentProps<any> {
    defaultParentPath: string;
  }
  export function ModalRouteContent(
    props: ModalRouteContentProps
  ): React.FC<ModalRouteContentProps>;

  interface ModalSwitchRenderProps {
    open: boolean;
    redirectToBack: VoidFunction;
  }
  interface ModalSwitchProps extends SwitchProps {
    renderModal: (props: ModalSwitchRenderProps) => React.ReactNode;
  }
  export function ModalSwitch(
    props: ModalSwitchProps
  ): React.FC<ModalSwitchProps>;

  interface ModalRouteContextValues {
    redirectToBack: VoidFunction;
    previousParentLocation: H.Location;
    isModal: boolean;
  }
  export const ModalRouteContext: React.Context<ModalRouteContextValues>;
}
